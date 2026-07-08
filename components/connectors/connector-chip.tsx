import Image from "next/image";
import type { CSSProperties } from "react";

import type { Connector } from "./connector-data";

type ConnectorChipStyle = CSSProperties & {
  "--chip-delay"?: string;
  "--chip-x"?: string;
  "--chip-y"?: string;
  "--chip-rotate"?: string;
};

export function ConnectorChip({
  connector,
  className = "",
  delay = "0ms",
  x = "0px",
  y = "0px",
  rotate = "0deg",
  label = true,
  style: customStyle,
}: {
  connector: Connector;
  className?: string;
  delay?: string;
  x?: string;
  y?: string;
  rotate?: string;
  label?: boolean;
  style?: CSSProperties;
}) {
  const chipStyle: ConnectorChipStyle = {
    ...customStyle,
    "--chip-delay": delay,
    "--chip-x": x,
    "--chip-y": y,
    "--chip-rotate": rotate,
  };

  return (
    <span className={`connector-chip ${className}`} style={chipStyle}>
      <span className="connector-chip-icon">
        <Image src={connector.src} alt="" width={20} height={20} />
      </span>
      {label ? <span>{connector.name}</span> : null}
    </span>
  );
}
