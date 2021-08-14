import {
  CacheKey,
  LanguageType,
  TextTranslationType,
  UserRoleType,
} from "../Enums";
import { ITextLanguageTranslation } from "../Interfaces";
import { AuthContextPropsExtended } from "../Interfaces/AuthContextPropsExtended";
import { ExtendedProfile } from "../Interfaces/IExtendedUserSettings";

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
  initialHardCodedTextConfigMap: Map<string, ITextLanguageTranslation[]>
): string[] => {
  return Array.from(initialHardCodedTextConfigMap.values())
    .flat()
    .filter((p) => p.languageType === LanguageType.English)
    .map((p) => p.translation);
};

export const SetStorage = (cacheKey: CacheKey, data: any) => {
  window.localStorage.setItem(cacheKey, data);
};

export const GetFromStorage = <T>(cacheKey: CacheKey): T | undefined => {
  const storedValue = window.localStorage.getItem(cacheKey);
  console.log("Stored value", storedValue);
  return storedValue && storedValue.length > 0
    ? (storedValue as unknown as T)
    : undefined;
};
