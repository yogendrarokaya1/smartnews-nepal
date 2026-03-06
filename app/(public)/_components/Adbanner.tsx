interface AdBannerProps {
  size: "leaderboard" | "rectangle" | "sidebar" | "mobile";
  className?: string;
}

export default function AdBanner({ size, className = "" }: AdBannerProps) {
  const sizeConfig = {
    leaderboard: { width: "728px", height: "90px", label: "728x90" },
    rectangle: { width: "300px", height: "250px", label: "300x250" },
    sidebar: { width: "160px", height: "600px", label: "160x600" },
    mobile: { width: "320px", height: "100px", label: "320x100" },
  };

  const config = sizeConfig[size];

  return (
    <div 
      className={`flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg ${className}`}
      style={{ 
        width: size === "leaderboard" || size === "mobile" ? "100%" : config.width,
        maxWidth: config.width,
        height: config.height,
      }}
    >
      <div className="text-center text-gray-400">
        <div className="text-xs font-semibold mb-1">Advertisement</div>
        <div className="text-xs opacity-60">{config.label}</div>
      </div>
    </div>
  );
}