import {
  ReactFlow,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PersonNode from "./components/Sections/PersonNode/PersonNode.tsx";
import type {PersonNodeType} from "./components/Sections/PersonNode/PersonNode.types.ts";
import createFakeNodesAndEdges from "./utils/createFakeNodesAndEdges.ts";

const {nodes, edges} = createFakeNodesAndEdges()

const nodeTypes = {
  person: PersonNode,
};

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow<PersonNodeType>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}