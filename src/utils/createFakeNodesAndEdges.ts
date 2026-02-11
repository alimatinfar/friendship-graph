import {type Edge, MarkerType, type Node} from "@xyflow/react";
import type {PersonNodeType} from "../components/Sections/PersonNode/PersonNode.types.ts";
import calculateDegrees from "./calculateDegrees.ts";
import calculateBetweenness from "./calculateBetweenness.ts";

function createFakeNodesAndEdges() {

  const firstNames: string[] = [
    "علی",
    "رضا",
    "محمد",
    "سارا",
    "زهرا",
    "مریم",
    "حسین",
    "نگار",
  ]

  const lastNames: string[] = [
    "محمدی",
    "حسینی",
    "کریمی",
    "احمدی",
    "موسوی",
    "قاسمی",
    "نجفی",
    "کاظمی",
  ]

  const randomItem = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)]

  const generatePhone = (): string =>  "09" + Math.floor(100000000 + Math.random() * 900000000);


  const columns = 20
  const gapX = 200;
  const gapY = 120;

  const nodes: Node<PersonNodeType>[] = Array.from(
    { length: 400 },
    (_, i) => {
      const row = Math.floor(i / columns);
      const col = i % columns;

      return {
        id: crypto.randomUUID(),
        position: {
          x: col * gapX,
          y: row * gapY,
        },
        data: {
          firstName: randomItem(firstNames),
          lastName: randomItem(lastNames),
          phone: generatePhone(),
        },
        type: "person",
      };
    }
  );

  const edges: Edge[] = Array.from({ length: 600 }, () => {
    const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
    const targetNode = nodes[Math.floor(Math.random() * nodes.length)];

    if (sourceNode.id === targetNode.id) return null;

    return {
      id: crypto.randomUUID(),
      source: sourceNode.id,
      target: targetNode.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#999", strokeWidth: 1 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
  }).filter(Boolean) as Edge[]

  const nodeIds = nodes.map((n) => n.id);

  const degreeMap = calculateDegrees(nodeIds, edges);
  const betweennessMap = calculateBetweenness(nodeIds, edges);

  const enrichedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      degree: degreeMap[node.id],
      betweenness: betweennessMap[node.id],
    },
  }));

  return {
    nodes: enrichedNodes, edges
  }
}

export default createFakeNodesAndEdges;