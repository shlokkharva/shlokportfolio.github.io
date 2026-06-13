export function SpiderWebBg({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="web-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
          {/* Radial web lines from center */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="150"
                y1="150"
                x2={150 + Math.cos(rad) * 150}
                y2={150 + Math.sin(rad) * 150}
                stroke="rgba(204,31,31,0.8)"
                strokeWidth="0.5"
              />
            );
          })}
          {/* Concentric web rings */}
          {[20, 45, 75, 110, 150].map((r, i) => (
            <circle
              key={i}
              cx="150"
              cy="150"
              r={r}
              fill="none"
              stroke="rgba(204,31,31,0.6)"
              strokeWidth="0.4"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#web-pattern)" />
    </svg>
  );
}
