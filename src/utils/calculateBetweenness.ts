function calculateBetweenness(
  nodes: string[],
  edges: { source: string; target: string }[]
) {
  const adjacency: Record<string, string[]> = {};
  const CB: Record<string, number> = {};

  nodes.forEach((v) => {
    adjacency[v] = [];
    CB[v] = 0;
  });

  edges.forEach(({ source, target }) => {
    adjacency[source].push(target);
    adjacency[target].push(source);
  });

  for (const s of nodes) {
    const stack: string[] = [];
    const predecessors: Record<string, string[]> = {};
    const sigma: Record<string, number> = {};
    const distance: Record<string, number> = {};

    nodes.forEach((v) => {
      predecessors[v] = [];
      sigma[v] = 0;
      distance[v] = -1;
    });

    sigma[s] = 1;
    distance[s] = 0;

    const queue: string[] = [s];

    while (queue.length) {
      const v = queue.shift()!;
      stack.push(v);

      for (const w of adjacency[v]) {
        if (distance[w] < 0) {
          queue.push(w);
          distance[w] = distance[v] + 1;
        }
        if (distance[w] === distance[v] + 1) {
          sigma[w] += sigma[v];
          predecessors[w].push(v);
        }
      }
    }

    const delta: Record<string, number> = {};
    nodes.forEach((v) => (delta[v] = 0));

    while (stack.length) {
      const w = stack.pop()!;
      for (const v of predecessors[w]) {
        delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
      }
      if (w !== s) {
        CB[w] += delta[w];
      }
    }
  }

  return CB;
}

export default calculateBetweenness;