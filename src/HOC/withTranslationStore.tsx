import React from "react";
import { Subscribe } from "unstated";
import { TranslationStore } from "../Store/LanguageStore";

interface TranslationProps {
  translationStore: TranslationStore;
}
export function withTranslationStore<T>(Component: React.ComponentType<T>) {
  const displayName = Component.displayName || Component.name || "Component";

  const Element = (props: Omit<T, keyof TranslationProps>) => {
    return (
      <Subscribe to={[TranslationStore]}>
        {(translationStore: TranslationStore) => (
          <Component translationStore={translationStore} {...(props as T)} />
        )}
      </Subscribe>
    );
  };

  if (Element) {
    (Element as any).displayName = `withTranslationStore(${displayName})`;
  }

  return Element;
}
