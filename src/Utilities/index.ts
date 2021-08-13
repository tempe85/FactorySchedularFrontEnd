import { LanguageType, TextTranslationType } from "../Enums";
import { ITextLanguageTranslation } from "../Interfaces";

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

export const GetHardCodedLangaugeDicationaryEnglishStrings = (
  initialHardCodedTextConfigMap: Map<
    TextTranslationType,
    ITextLanguageTranslation[]
  >
): string[] => {
  return Array.from(initialHardCodedTextConfigMap.values())
    .flat()
    .filter((p) => p.languageType === LanguageType.English)
    .map((p) => p.translation);
};
