import React from "react";
import { Layout } from "../../Containers/Layout";
import { TextTranslationType } from "../../Enums";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";

function HomePage({ translationStore }: ITranslationStoreProps) {
  return (
    <Layout>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "200px",
        }}
      >
        {translationStore.getHardCodedTextTranslation(
          TextTranslationType.WelcomeToFactorySchedular
        )}
        {" 🏭"}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {translationStore.getHardCodedTextTranslation(
          TextTranslationType.WelcomeSubTitle
        )}
      </div>
    </Layout>
  );
}

export default withTranslationStore(HomePage);
