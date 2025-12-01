"use client";

interface MiniHeroBannerProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function MiniHeroBanner({
  title,
  description,
  backgroundImage = "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?cs=srgb&dl=pexels-500photos-com-15338-93398.jpg&fm=jpg",
  buttonText,
  buttonHref,
}: MiniHeroBannerProps) {
  return (
    <div
      className="relative w-auto h-[420px] md:h-[620px] flex items-center justify-center bg-cover bg-center rounded-4xl overflow-hidden mx-2  "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 opacity-90 drop-shadow">
            {description}
          </p>
        )}
        {buttonText && buttonHref && (
          <a
            href={buttonHref}
            className="inline-block bg-[#ff4500] hover:bg-[#e03e00] text-white font-semibold px-6 py-3 rounded-lg text-lg shadow transition"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}
