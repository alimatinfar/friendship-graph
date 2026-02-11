import type {PersonNodeType} from "./PersonNode.types.ts";
import {Handle, type NodeProps, Position} from "@xyflow/react";
import {useState} from "react";

export default function PersonNode({ data }: NodeProps<PersonNodeType>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        padding: 10,
        border: "1px solid #444",
        borderRadius: 8,
        background: "#fff",
        minWidth: 160,
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <strong>
        {data.firstName} {data.lastName}
      </strong>

      {open && (
        <div style={{ marginTop: 8, fontSize: 12 }}>
          <div>mobile: {data.phone}</div>
          <div>degree: {data.degree}</div>
          <div>betweenness: {data.betweenness}</div>
        </div>
      )}

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}