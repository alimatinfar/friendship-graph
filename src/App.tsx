import {
  ReactFlow,
  Background,
  Controls, useNodesState, useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PersonNode from "./components/Sections/PersonNode/PersonNode.tsx";
import type {PersonNodeType} from "./components/Sections/PersonNode/PersonNode.types.ts";
import createFakeNodesAndEdges from "./utils/createFakeNodesAndEdges.ts";

const {nodes: initialNodes, edges: initialEdges} = createFakeNodesAndEdges()

const nodeTypes = {
  person: PersonNode,
};

export default function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // useEffect(() => {
  //   getLayoutElements(nodes, edges).then(({ nodes: layoutNodes }) => {
  //     setNodes(layoutNodes);
  //   });
  // }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow<PersonNodeType>
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}