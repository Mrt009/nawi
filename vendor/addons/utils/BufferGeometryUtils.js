import { TrianglesDrawMode } from 'three';

// Minimal local dependency used by GLTFLoader for non-triangle primitive modes.
// Most GLB files use TrianglesDrawMode and return unchanged here.
export function toTrianglesDrawMode(geometry, drawMode) {
  if (drawMode === TrianglesDrawMode) return geometry;

  const index = geometry.getIndex();
  const vertexCount = index ? index.count : geometry.attributes.position.count;
  const indices = [];

  if (drawMode === 5) {
    for (let i = 0; i < vertexCount - 2; i += 1) {
      if (i % 2 === 0) indices.push(i, i + 1, i + 2);
      else indices.push(i + 1, i, i + 2);
    }
  } else if (drawMode === 6) {
    for (let i = 1; i < vertexCount - 1; i += 1) indices.push(0, i, i + 1);
  } else {
    return geometry;
  }

  const source = index ? index.array : null;
  const mapped = source ? indices.map((i) => source[i]) : indices;
  geometry.setIndex(mapped);
  return geometry;
}
