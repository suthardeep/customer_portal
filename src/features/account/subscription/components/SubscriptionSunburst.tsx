// Sunburst rays with origin behind the badge center.
// Uses a radial gradient mask to fade rays outward — no sharp edge.
// CY is set to match the vertical center of the badge on the page.

const SECTOR_COUNT = 24;
// SVG coordinate space: 1600 wide, 1000 tall (slice fills full screen)
// Origin sits behind the badge center — roughly 1/4 down the canvas
const CX = 800;
const CY = 180;
const RADIUS = 1400;

function polarToCartesian(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + RADIUS * Math.cos(rad),
    y: CY + RADIUS * Math.sin(rad),
  };
}

const sectors = Array.from({ length: SECTOR_COUNT }, (_, i) => {
  const startAngle = (360 / SECTOR_COUNT) * i;
  const endAngle = (360 / SECTOR_COUNT) * (i + 1);
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  return {
    d: `M ${CX} ${CY} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y} Z`,
    isLight: i % 2 === 0,
  };
});

export function SubscriptionSunburst() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient mask in userSpaceOnUse so radius is uniform in all directions */}
          <radialGradient id="sunburst-fade" cx={CX} cy={CY} r="1100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="45%" stopColor="white" stopOpacity="0.8" />
            <stop offset="75%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="sunburst-mask">
            <rect x="0" y="0" width="1600" height="1000" fill="url(#sunburst-fade)" />
          </mask>
        </defs>

        <g mask="url(#sunburst-mask)">
          {sectors.map((sector, i) => (
            <path
              key={i}
              d={sector.d}
              fill={sector.isLight ? "var(--s-975)" : "var(--s-1000)"}
              opacity={sector.isLight ? "1" : "0.6"}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
