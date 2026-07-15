import type {CSSProperties} from "react";

export interface AssetSlotProps {
  filename: string;
  label: string;
  className?: string;
  aspect?: CSSProperties["aspectRatio"];
}

/**
 * Intentionally empty container reserved for an approved asset. Blank slots
 * stay out of the accessibility tree until real media and alt text exist.
 */
export function AssetSlot({filename,label,className,aspect}:AssetSlotProps) {
  const classes=["asset-slot","asset-slot--blank",className].filter(Boolean).join(" ");

  return <div
    className={classes}
    aria-hidden="true"
    data-asset-slot="blank"
    data-asset-filename={filename}
    data-asset-label={label}
    data-asset-aspect={aspect}
    style={aspect?{aspectRatio:aspect}:undefined}
  />;
}

export default AssetSlot;
