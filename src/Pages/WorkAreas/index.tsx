import React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Layout } from "../../Containers/Layout";
import { TextTranslationType } from "../../Enums";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";

function WorkAreas({ translationStore }: ITranslationStoreProps) {
  return (
    <Layout>
      <>
        <legend style={{ textAlign: "center" }}>
          {translationStore.getHardCodedTextTranslation(
            TextTranslationType.CurrentWorkAreaSchedules
          )}
        </legend>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "300px", margin: "20px" }}>
            <CardBody>
              <CardTitle tag="h5">Work Area 1</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Station Schedule
              </CardSubtitle>
              <CardText>
                <div>
                  <div>Station 1: Zach Smith</div>
                  <div>Station 2: Don Nelson</div>
                  <div>Station 3:</div>
                </div>
              </CardText>
            </CardBody>
          </Card>
          <Card style={{ width: "300px", margin: "20px" }}>
            <CardBody>
              <CardTitle tag="h5">Work Area 2</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Station Schedule
              </CardSubtitle>
              <CardText>
                <div>
                  <div>Station 1:</div>
                  <div>Station 2: </div>
                  <div>Station 3:</div>
                </div>
              </CardText>
            </CardBody>
          </Card>
          <Card style={{ width: "300px", margin: "20px" }}>
            <CardBody>
              <CardTitle tag="h5">Work Area 3</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Station Schedule
              </CardSubtitle>
              <CardText>
                <div>
                  <div>Station 1: </div>
                  <div>Station 2: </div>
                  <div>Station 3:</div>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </div>
        <Card style={{ width: "300px", margin: "20px" }}>
          <CardBody>
            <CardTitle tag="h5">Unassigned Workers</CardTitle>

            <CardText>
              <div>
                <div>Sally McSallerson </div>
                <div>Alex Woodward </div>
              </div>
            </CardText>
          </CardBody>
        </Card>
      </>
    </Layout>
  );
}

export default withTranslationStore(WorkAreas);
