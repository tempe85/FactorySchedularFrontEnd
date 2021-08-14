import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { getAllWorkStations } from "../../API/Api";
import { Layout } from "../../Containers/Layout";
import { TextTranslationType } from "../../Enums";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { IWorkStation } from "../../Interfaces";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";
import { WorkStationCard } from "./WorkStationCard";

function WorkAreas({ translationStore }: ITranslationStoreProps) {
  const [workStations, setWorkStations] = useState<IWorkStation[]>([]);
  useEffect(() => {
    handleGetAllWorkStations();
  }, []);

  const handleGetAllWorkStations = async () => {
    try {
      const workStations = await getAllWorkStations();
      setWorkStations(workStations);
    } catch (e) {
      toast.error(`Unable to fetch work stations!`);
    }
  };
  return (
    <Layout>
      <>
        <legend style={{ textAlign: "center" }}>
          {translationStore.getHardCodedTextTranslation(
            TextTranslationType.CurrentWorkAreaSchedules
          )}
        </legend>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {workStations.map((workStation) => (
            <WorkStationCard
              key={workStation.id}
              workStationName={workStation.name}
              workAreaName={workStation.workAreaName}
              workStationUsers={workStation.workStationUsers}
            />
          ))}
        </div>
        {/* <Card style={{ width: "300px", margin: "20px" }}>
          <CardBody>
            <CardTitle tag="h5">Unassigned Workers</CardTitle>

            <CardText>
              <div>
                <div>Sally McSallerson </div>
                <div>Alex Woodward </div>
              </div>
            </CardText>
          </CardBody>
        </Card> */}
      </>
    </Layout>
  );
}

export default withTranslationStore(WorkAreas);
