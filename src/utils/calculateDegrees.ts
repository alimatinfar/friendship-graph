function calculateDegrees(nodes: string[], edges: { source: string; target: string }[]) {
  const degreeMap: Record<string, number> = {};

  nodes.forEach((id) => {
    degreeMap[id] = 0;
  });

  edges.forEach((edge) => {
    degreeMap[edge.source]++;
    degreeMap[edge.target]++;
  });

  return degreeMap;
}

export default calculateDegrees;