import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { Layout } from "../../Containers/Layout";
import { TextTranslationType } from "../../Enums";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";
import WorkIcon from "@material-ui/icons/Work";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import TranslateIcon from "@material-ui/icons/Translate";

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
          TextTranslationType.WelcomeToFactoryScheduler
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
        <List style={{ width: "100%", maxWidth: 360 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EventAvailableIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={translationStore.getHardCodedTextTranslation(
                TextTranslationType.Schedule
              )}
              secondary={translationStore.getHardCodedTextTranslation(
                TextTranslationType.WelcomeSubTitle
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={translationStore.getHardCodedTextTranslation(
                TextTranslationType.viewWorkAreas
              )}
              secondary={translationStore.getHardCodedTextTranslation(
                TextTranslationType.WelcomeSubTitle2
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TranslateIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={translationStore.getHardCodedTextTranslation(
                TextTranslationType.updateLanguage
              )}
              secondary={translationStore.getHardCodedTextTranslation(
                TextTranslationType.WelcomeSubTitle3
              )}
            />
          </ListItem>
        </List>
      </div>
    </Layout>
  );
}

export default withTranslationStore(HomePage);
