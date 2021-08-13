export const ConcatMaps = <T, J>(
  map1: Map<T, J> | undefined,
  map2: Map<T, J> | undefined
): Map<T, J> | undefined => {
  if (!map1 && !map2) return;
  if (!map1) return map2;
  if (!map2) return map1;

  return new Map([
    ...Array.from(map1.entries()),
    ...Array.from(map2.entries()),
  ]);
};

export const CloneArrayOfObjects = <T>(objectArray: T[]): T[] => {
  const arrayCopy = [...objectArray];
  return arrayCopy.map((p) => ({ ...p }));
};
