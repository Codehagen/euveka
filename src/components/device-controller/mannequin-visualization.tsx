"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MannequinVisualizationProps {
  // Original props
  torsoHeightScale?: number;
  bustWidth?: number;
  waistWidth?: number;
  hipsWidth?: number;
  thighsWidth?: number;
  shouldersWidth?: number;
  neckWidth?: number;

  // New props for the Models page
  torsoHeight?: number;
  shoulderWidth?: number;
  hipWidth?: number;
  neckRadius?: number;
  thighWidth?: number;
}

export function MannequinVisualization(props: MannequinVisualizationProps) {
  // Normalize props to handle both original and new format
  const {
    torsoHeightScale = props.torsoHeight
      ? 1 + (props.torsoHeight - 50) / 60
      : 1,
    bustWidth = props.bustWidth || 70,
    waistWidth = props.waistWidth || 60,
    hipsWidth = props.hipWidth || props.hipsWidth || 75,
    thighsWidth = props.thighWidth
      ? props.thighWidth * 2
      : props.thighsWidth || 70,
    shouldersWidth = props.shoulderWidth || props.shouldersWidth || 85,
    neckWidth = props.neckRadius ? props.neckRadius * 2 : props.neckWidth || 20,
  } = props;

  // CSS variable approach for SVG colors
  const svgColors = {
    // Base colors
    background: "var(--mannequin-bg, hsl(var(--background)))",
    surface: "var(--mannequin-surface, hsl(var(--card)))",
    border: "var(--mannequin-border, hsl(var(--border)))",

    // Grid and measurement colors
    gridLine: "var(--mannequin-grid, hsl(var(--muted)))",
    gridText: "var(--mannequin-grid-text, hsl(var(--muted-foreground)))",

    // Mannequin parts
    body: "var(--mannequin-body, hsl(var(--card)))",
    bodyBorder: "var(--mannequin-body-border, hsl(var(--border)))",
    stand: "var(--mannequin-stand, hsl(var(--muted)))",
    standBase: "var(--mannequin-stand-base, hsl(var(--muted-foreground)))",

    // Measurement points
    point: "var(--mannequin-point, hsl(var(--foreground)))",
    pointCircle: "var(--mannequin-point-circle, hsl(var(--muted-foreground)))",
    labelLine: "var(--mannequin-label-line, hsl(var(--muted-foreground)))",
    labelText: "var(--mannequin-label-text, hsl(var(--muted-foreground)))",
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle>Mannequin Visualization</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-full pt-0">
        <div className="relative w-full max-w-[400px] aspect-[2/3] bg-card/50 rounded-md overflow-hidden shadow-inner">
          <svg
            viewBox="0 0 400 600"
            className="w-full h-full transition-all duration-300 ease-in-out"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background Grid */}
            <g className="grid-lines opacity-60">
              {/* Horizontal grid lines */}
              <line
                x1="0"
                y1="150"
                x2="400"
                y2="150"
                stroke={svgColors.gridLine}
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="250"
                x2="400"
                y2="250"
                stroke={svgColors.gridLine}
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="350"
                x2="400"
                y2="350"
                stroke={svgColors.gridLine}
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="450"
                x2="400"
                y2="450"
                stroke={svgColors.gridLine}
                strokeWidth="1"
              />
              <text x="15" y="140" fontSize="14" fill={svgColors.gridText}>
                A
              </text>
              <text x="15" y="240" fontSize="14" fill={svgColors.gridText}>
                B
              </text>
              <text x="15" y="340" fontSize="14" fill={svgColors.gridText}>
                C
              </text>
              <text x="15" y="440" fontSize="14" fill={svgColors.gridText}>
                D
              </text>

              {/* Vertical grid lines */}
              <line
                x1="100"
                y1="0"
                x2="100"
                y2="600"
                stroke={svgColors.gridLine}
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="200"
                y1="0"
                x2="200"
                y2="600"
                stroke={svgColors.gridLine}
                strokeWidth="1"
              />
              <line
                x1="300"
                y1="0"
                x2="300"
                y2="600"
                stroke={svgColors.gridLine}
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="335" y="100" fontSize="14" fill={svgColors.gridText}>
                HEAD
              </text>
              <text x="335" y="200" fontSize="14" fill={svgColors.gridText}>
                ARM
              </text>
              <text x="335" y="450" fontSize="14" fill={svgColors.gridText}>
                =
              </text>
            </g>

            <g
              transform={`scale(1, ${torsoHeightScale})`}
              style={{ transformOrigin: "200px 300px" }}
              className="transition-all duration-300 ease-in-out"
            >
              {/* Head */}
              <g>
                <circle
                  cx="200"
                  cy="70"
                  r="22"
                  fill={svgColors.body}
                  stroke={svgColors.bodyBorder}
                  strokeWidth="1"
                />
                <rect
                  x="190"
                  y="92"
                  width="20"
                  height="10"
                  fill={svgColors.body}
                />
              </g>

              {/* Neck and top of torso */}
              <path
                d={`
                  M ${200 - neckWidth / 2} 102
                  L ${200 - shouldersWidth / 2} 130
                  L ${200 + shouldersWidth / 2} 130
                  L ${200 + neckWidth / 2} 102
                  Z
                `}
                fill={svgColors.body}
                stroke={svgColors.bodyBorder}
                strokeWidth="1"
              />

              {/* Upper torso (bust area) */}
              <path
                d={`
                  M ${200 - shouldersWidth / 2} 130
                  L ${200 - bustWidth / 2} 200
                  L ${200 + bustWidth / 2} 200
                  L ${200 + shouldersWidth / 2} 130
                  Z
                `}
                fill={svgColors.body}
                stroke={svgColors.bodyBorder}
                strokeWidth="1"
              />

              {/* Middle torso (waist area) */}
              <path
                d={`
                  M ${200 - bustWidth / 2} 200
                  C ${200 - bustWidth / 2} 230, ${200 - waistWidth / 2} 280, ${
                  200 - waistWidth / 2
                } 290
                  L ${200 + waistWidth / 2} 290
                  C ${200 + waistWidth / 2} 280, ${200 + bustWidth / 2} 230, ${
                  200 + bustWidth / 2
                } 200
                  Z
                `}
                fill={svgColors.body}
                stroke={svgColors.bodyBorder}
                strokeWidth="1"
              />

              {/* Lower torso (hips area) */}
              <path
                d={`
                  M ${200 - waistWidth / 2} 290
                  C ${200 - waistWidth / 2} 320, ${200 - hipsWidth / 2} 350, ${
                  200 - hipsWidth / 2
                } 370
                  L ${200 + hipsWidth / 2} 370
                  C ${200 + hipsWidth / 2} 350, ${200 + waistWidth / 2} 320, ${
                  200 + waistWidth / 2
                } 290
                  Z
                `}
                fill={svgColors.body}
                stroke={svgColors.bodyBorder}
                strokeWidth="1"
              />

              {/* Thighs */}
              <path
                d={`
                  M ${200 - hipsWidth / 2} 370
                  C ${200 - hipsWidth / 2} 390, ${200 - thighsWidth / 2} 410, ${
                  200 - thighsWidth / 2
                } 460
                  L ${200 + thighsWidth / 2} 460
                  C ${200 + thighsWidth / 2} 410, ${200 + hipsWidth / 2} 390, ${
                  200 + hipsWidth / 2
                } 370
                  Z
                `}
                fill={svgColors.body}
                stroke={svgColors.bodyBorder}
                strokeWidth="1"
              />

              {/* Stands at the bottom */}
              <g>
                <rect
                  x="175"
                  y="460"
                  width="15"
                  height="25"
                  fill={svgColors.stand}
                  rx="2"
                />
                <rect
                  x="210"
                  y="460"
                  width="15"
                  height="25"
                  fill={svgColors.stand}
                  rx="2"
                />
                <rect
                  x="165"
                  y="485"
                  width="35"
                  height="10"
                  fill={svgColors.standBase}
                  rx="2"
                />
                <rect
                  x="200"
                  y="485"
                  width="35"
                  height="10"
                  fill={svgColors.standBase}
                  rx="2"
                />
              </g>

              {/* Measurement points with dashed circles */}
              <MeasurementPoint
                cx={200}
                cy={110}
                label="TORSO HEIGHT"
                right
                colors={svgColors}
              />
              <MeasurementPoint
                cx={160}
                cy={180}
                label="BUST"
                right={false}
                colors={svgColors}
              />
              <MeasurementPoint
                cx={240}
                cy={290}
                label="WAIST"
                right
                colors={svgColors}
              />
              <MeasurementPoint
                cx={160}
                cy={350}
                label="HIPS"
                right={false}
                colors={svgColors}
              />
              <MeasurementPoint
                cx={160}
                cy={420}
                label="THIGHS"
                right={false}
                colors={svgColors}
              />
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

interface MeasurementPointProps {
  cx: number;
  cy: number;
  label: string;
  right: boolean;
  colors: Record<string, string>;
}

function MeasurementPoint({
  cx,
  cy,
  label,
  right,
  colors,
}: MeasurementPointProps) {
  const lineEndX = right ? cx + 70 : cx - 60;
  const textX = right ? lineEndX + 10 : lineEndX - 40;

  return (
    <g className="measurement-point">
      <circle
        cx={cx}
        cy={cy}
        r="12"
        fill="transparent"
        stroke={colors.pointCircle}
        strokeWidth="1"
        strokeDasharray="3,3"
      />
      <circle cx={cx} cy={cy} r="4" fill={colors.point} />
      <line
        x1={cx}
        y1={cy}
        x2={lineEndX}
        y2={cy}
        stroke={colors.labelLine}
        strokeWidth="1"
      />
      <text
        x={textX}
        y={cy + 5}
        fontSize="12"
        fill={colors.labelText}
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  );
}
