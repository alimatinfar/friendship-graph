import {type Edge, type Node} from "@xyflow/react";
import type {PersonNodeType} from "../components/Sections/PersonNode/PersonNode.types.ts";

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


  const nodes: Node<PersonNodeType>[] = Array.from({ length: 400 }, () => ({
    id: crypto.randomUUID(),
    position: {
      x: Math.random() * 2000,
      y: Math.random() * 2000,
    },
    data: {
      firstName: randomItem(firstNames),
      lastName: randomItem(lastNames),
      phone: generatePhone(),
    },
    type: "person",
  }));

  const edges: Edge[] = Array.from({ length: 600 }, () => {
    const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
    const targetNode = nodes[Math.floor(Math.random() * nodes.length)];

    return {
      id: crypto.randomUUID(),
      source: sourceNode.id,
      target: targetNode.id,
    };
  });

  return {
    nodes, edges
  }
}

export default createFakeNodesAndEdges;