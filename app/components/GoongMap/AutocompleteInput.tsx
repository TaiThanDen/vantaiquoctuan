import * as React from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOONG_ROUTE_API!;

export default function AutocompleteInput({
  value,
  onChange,
  onSelect, // Thêm prop này
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  onSelect?: (val: string) => void; // Callback khi chọn từ dropdown
  placeholder?: string;
}) {
  const [suggestions, setSuggestions] = React.useState<any[]>([]);
  const [showDropdown, setShowDropdown] = React.useState(false);

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    onChange(val);
    if (val.length >= 2) {
      const res = await fetch(
        `https://rsapi.goong.io/Place/AutoComplete?api_key=${API_KEY}&input=${encodeURIComponent(
          val
        )}`
      );
      const data = await res.json();
      setSuggestions(data.predictions || []);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  function handleSelectSuggestion(suggestion: any) {
    const address = suggestion.description;
    onChange(address);
    setShowDropdown(false);
    if (onSelect) onSelect(address); // Gọi callback khi chọn
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        className="w-full px-5 py-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-gray-300/60 outline-none text-base"
        autoComplete="off"
      />
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 bg-white border rounded-lg shadow-xl mt-1 w-full max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 flex items-start gap-2"
            >
              {/* Có thể thêm icon nếu muốn */}
              <div>
                <div className="font-medium text-sm">
                  {suggestion.structured_formatting?.main_text}
                </div>
                <div className="text-xs text-gray-500">
                  {suggestion.structured_formatting?.secondary_text}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
