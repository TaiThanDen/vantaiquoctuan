"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, MapPin, Clock } from "lucide-react";

declare global {
  interface Window {
    goongjs: any;
  }
}

const MAP_API_KEY = process.env.NEXT_PUBLIC_GOONG_MAP_API_KEY!;
const ROUTE_API_KEY = process.env.NEXT_PUBLIC_GOONG_ROUTE_API_KEY!;

// Hàm decode polyline thủ công
function decodePolyline(encoded: string) {
  const points: [number, number][] = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < encoded.length) {
    let result = 1,
      shift = 0,
      b;
    do {
      b = encoded.charCodeAt(index++) - 63 - 1;
      result += b << shift;
      shift += 5;
    } while (b >= 0x1f);
    lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    result = 1;
    shift = 0;
    do {
      b = encoded.charCodeAt(index++) - 63 - 1;
      result += b << shift;
      shift += 5;
    } while (b >= 0x1f);
    lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    points.push([lng / 1e5, lat / 1e5]);
  }
  return points;
}

export default function GoongMap({
  externalFrom = "",
  externalTo = "",
  externalIsFromSelected = false,
  externalIsToSelected = false,
}: {
  externalFrom?: string;
  externalTo?: string;
  externalIsFromSelected?: boolean;
  externalIsToSelected?: boolean;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [isToSelected, setIsToSelected] = useState(false);

  // Thêm state để quản lý đóng/mở panel
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Hàm lấy gợi ý địa chỉ
  async function getSuggestions(input: string) {
    if (!input || input.length < 2) return [];
    const res = await fetch(
      `https://rsapi.goong.io/Place/AutoComplete?api_key=${ROUTE_API_KEY}&input=${encodeURIComponent(
        input
      )}`
    );
    const data = await res.json();
    return data.predictions || [];
  }

  // Hàm lấy tọa độ từ địa chỉ
  async function getCoordinates(address: string) {
    const res = await fetch(
      `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(
        address
      )}&api_key=${ROUTE_API_KEY}`
    );
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return [lng, lat];
    }
    return null;
  }

  // Hàm vẽ tuyến đường
  async function drawRoute() {
    if (!window.goongjs || !map.current || !from || !to) return;

    setIsLoading(true);
    try {
      const fromCoord = await getCoordinates(from);
      const toCoord = await getCoordinates(to);
      if (!fromCoord || !toCoord) {
        setIsLoading(false);
        return;
      }

      const res = await fetch(
        `https://rsapi.goong.io/Direction?origin=${fromCoord[1]},${fromCoord[0]}&destination=${toCoord[1]},${toCoord[0]}&vehicle=car&api_key=${ROUTE_API_KEY}`
      );
      const data = await res.json();
      if (!data.routes || data.routes.length === 0) {
        setIsLoading(false);
        return;
      }

      const route = data.routes[0];
      const decoded = decodePolyline(route.overview_polyline.points);

      // Lấy thông tin khoảng cách và thời gian
      const distanceInMeters = route.legs[0].distance.value;
      const durationInSeconds = route.legs[0].duration.value;

      setDistance(`${(distanceInMeters / 1000).toFixed(1)} km`);
      setDuration(`${Math.round(durationInSeconds / 60)} phút`);

      // Xóa markers và routes cũ
      if (map.current.getSource("route")) {
        map.current.removeLayer("route");
        map.current.removeSource("route");
      }

      // Thêm markers
      const markers = document.querySelectorAll(".custom-marker");
      markers.forEach((marker) => marker.remove());

      // Marker điểm bắt đầu
      const startMarker = document.createElement("div");
      startMarker.className = "custom-marker";
      startMarker.innerHTML = `
        <div style="background: #34A853; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
        </div>
      `;
      new window.goongjs.Marker(startMarker)
        .setLngLat(fromCoord)
        .addTo(map.current);

      // Marker điểm kết thúc
      const endMarker = document.createElement("div");
      endMarker.className = "custom-marker";
      endMarker.innerHTML = `
        <div style="background: #EA4335; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
        </div>
      `;
      new window.goongjs.Marker(endMarker)
        .setLngLat(toCoord)
        .addTo(map.current);

      // Thêm tuyến đường
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: decoded,
          },
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#4285F4",
          "line-width": 5,
          "line-opacity": 0.8,
        },
      });

      // Zoom vào tuyến đường với padding
      map.current.fitBounds([fromCoord, toCoord], { padding: 80 });
    } catch (error) {
      console.error("Error drawing route:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Chọn gợi ý "From"
  function selectFromSuggestion(suggestion: any) {
    setFrom(suggestion.description);
    setShowFromDropdown(false);
    setIsFromSelected(true); // Đánh dấu đã chọn
  }

  // Chọn gợi ý "To"
  function selectToSuggestion(suggestion: any) {
    setTo(suggestion.description);
    setShowToDropdown(false);
    setIsToSelected(true); // Đánh dấu đã chọn
  }

  // Xử lý thay đổi input "From"
  async function handleFromChange(value: string) {
    setFrom(value);
    setIsFromSelected(false); // Reset trạng thái khi người dùng gõ lại
    if (value.length >= 2) {
      const suggestions = await getSuggestions(value);
      setFromSuggestions(suggestions);
      setShowFromDropdown(true);
    } else {
      setShowFromDropdown(false);
    }
  }

  // Xử lý thay đổi input "To"
  async function handleToChange(value: string) {
    setTo(value);
    setIsToSelected(false); // Reset trạng thái khi người dùng gõ lại
    if (value.length >= 2) {
      const suggestions = await getSuggestions(value);
      setToSuggestions(suggestions);
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }
  }

  // Đồng bộ địa chỉ từ props - KHÔNG tự động set isSelected
  useEffect(() => {
    if (externalFrom) {
      setFrom(externalFrom);
    }
  }, [externalFrom]);

  useEffect(() => {
    if (externalTo) {
      setTo(externalTo);
    }
  }, [externalTo]);

  // Đồng bộ trạng thái "đã chọn" từ props
  useEffect(() => {
    setIsFromSelected(externalIsFromSelected);
  }, [externalIsFromSelected]);

  useEffect(() => {
    setIsToSelected(externalIsToSelected);
  }, [externalIsToSelected]);

  // CHỈ vẽ route khi CẢ HAI địa chỉ đã được chọn
  useEffect(() => {
    if (from && to && map.current && isFromSelected && isToSelected) {
      drawRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, isFromSelected, isToSelected]);

  useEffect(() => {
    if (map.current) return;
    if (mapContainer.current && window.goongjs) {
      map.current = new window.goongjs.Map({
        container: mapContainer.current,
        style: `https://tiles.goong.io/assets/goong_map_web.json?key=${MAP_API_KEY}`,
        center: [106.700981, 10.77653],
        zoom: 12,
        accessToken: MAP_API_KEY,
      });

      // Thêm navigation controls
      map.current.addControl(
        new window.goongjs.NavigationControl(),
        "bottom-right"
      );
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Nút toggle panel - Hiện khi panel đóng */}
      {!isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-white rounded-lg shadow-lg p-2.5 md:p-3 hover:bg-gray-50 transition-colors border border-gray-200"
          aria-label="Mở bảng tìm kiếm"
        >
          <Navigation className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
        </button>
      )}

      {/* Panel điều khiển - Responsive */}
      {isPanelOpen && (
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-white rounded-lg shadow-2xl p-3 md:p-4 w-[calc(100%-1.5rem)] sm:w-80 md:w-96 border border-gray-200 text-gray-800 max-h-[70vh] md:max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Header với nút đóng */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-base md:text-lg flex items-center gap-2 text-gray-900">
              <Navigation className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              Tìm tuyến đường
            </h3>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Đóng bảng tìm kiếm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Input From */}
          <div className="relative mb-3">
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 flex-shrink-0"></div>
              <input
                type="text"
                value={from}
                onChange={(e) => handleFromChange(e.target.value)}
                placeholder="Chọn điểm xuất phát"
                className="flex-1 outline-none bg-transparent text-gray-800 text-sm md:text-base"
              />
            </div>
            {showFromDropdown && fromSuggestions.length > 0 && (
              <div className="absolute z-20 bg-white border rounded-lg shadow-xl mt-1 w-full max-h-40 md:max-h-60 overflow-y-auto">
                {fromSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => selectFromSuggestion(suggestion)}
                    className="px-2 md:px-3 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 flex items-start gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 mt-0.5 md:mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs md:text-sm truncate">
                        {suggestion.structured_formatting?.main_text}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500 truncate">
                        {suggestion.structured_formatting?.secondary_text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input To */}
          <div className="relative mb-3 md:mb-4">
            <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 flex-shrink-0"></div>
              <input
                type="text"
                value={to}
                onChange={(e) => handleToChange(e.target.value)}
                placeholder="Chọn điểm đến"
                className="flex-1 outline-none bg-transparent text-gray-800 text-sm md:text-base"
              />
            </div>
            {showToDropdown && toSuggestions.length > 0 && (
              <div className="absolute z-20 bg-white border rounded-lg shadow-xl mt-1 w-full max-h-40 md:max-h-60 overflow-y-auto">
                {toSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => selectToSuggestion(suggestion)}
                    className="px-2 md:px-3 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 flex items-start gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 mt-0.5 md:mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs md:text-sm truncate">
                        {suggestion.structured_formatting?.main_text}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500 truncate">
                        {suggestion.structured_formatting?.secondary_text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Thông tin khoảng cách và thời gian */}
          {distance && duration && (
            <div className="mb-3 p-2 md:p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Navigation className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                  <span className="font-semibold text-blue-900">
                    {distance}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                  <span className="font-semibold text-blue-900">
                    {duration}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={drawRoute}
            disabled={!from || !to || isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm md:text-base">Đang tìm...</span>
              </>
            ) : (
              <>
                <Navigation className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Tìm tuyến đường 
              </>
            )}
          </button>
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}
