import React, { useEffect, useState } from "react";
import { Layout } from "../../Containers/Layout";
import BootstrapTable from "react-bootstrap-table-next";
import {
  getAllWorkStations,
  getWorkAreas,
  getWorkBuildings,
} from "../../API/Api";
import { IWorkArea, IWorkBuilding, IWorkStation } from "../../Interfaces";
import { toast } from "react-toastify";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";
import { TextTranslationType } from "../../Enums";
import { CircularProgress } from "@material-ui/core";

function AdminPage({ translationStore }: ITranslationStoreProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuilding] = useState<IWorkBuilding[]>([]);
  const [workAreas, setWorkAreas] = useState<IWorkArea[]>([]);
  const [workStations, setWorkStations] = useState<IWorkStation[]>([]);

  useEffect(() => {
    getBuildingsWorkAreasAndWorkStations();
  }, []);

  const getBuildingsWorkAreasAndWorkStations = async () => {
    setIsLoading(true);
    await fetchBuildings();
    await fetchWorkAreas();
    await fetchWorkStations();
    setIsLoading(false);
  };

  const fetchBuildings = async () => {
    try {
      const workBuildings = await getWorkBuildings();
      setBuilding(workBuildings);
    } catch (error) {
      toast.error(`Unable to fetch buildings. ${error}`);
    }
  };

  const fetchWorkAreas = async () => {
    try {
      const workAreas = await getWorkAreas();
      setWorkAreas(workAreas);
    } catch (error) {
      toast.error(`Unable to fetch work area. ${error}`);
    }
  };

  const fetchWorkStations = async () => {
    try {
      const workStationsResponse = await getAllWorkStations();
      setWorkStations(workStationsResponse);
    } catch (error) {
      toast.error(`Unable to fetch work stations. ${error}`);
    }
  };

  const workAreaColumns = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "buildingName",
      text: "Building Name",
    },
  ];

  // id: string;
  // name: string;
  // description: string;
  // workStationType: WorkStationType;
  // workAreaName: string;
  // workAreaPosition: number;
  // workStationUsers: IWorkStationUser[];
  // workerCapacity: number;
  // workAreaDescription: string;
  // createdDate: Date;
  const workStationColumns = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "workStationType",
      text: "Work Station Type",
    },
    {
      dataField: "workAreaName",
      text: "Work Area Name",
    },
    {
      dataField: "workerCapacity",
      text: "Work Area Capacity",
    },
  ];

  const buildingColumns = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "description",
      text: "Description",
    },
    // {
    //   dataField: "df1",
    //   isDummyField: true,
    //   text: "Remove",
    //   editable: false,
    //   // formatter: (cellContent: any, row: IRestaurantChain) => (
    //   //   <FontAwesomeIcon
    //   //     style={{ cursor: "pointer" }}
    //   //     color="red"
    //   //     icon={faMinusCircle}
    //   //     onClick={() => deleteChain(row)}
    //   //   />
    //   // ),
    // },
  ];
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          margin: "auto",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>
                {" "}
                {translationStore.getHardCodedTextTranslation(
                  TextTranslationType.Buildings
                )}
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BootstrapTable
                  remote={{ filter: true }}
                  keyField={"id"}
                  data={buildings}
                  columns={buildingColumns}
                  bordered
                  striped
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>
                {" "}
                {translationStore.getHardCodedTextTranslation(
                  TextTranslationType.WorkAreas
                )}
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BootstrapTable
                  remote={{ filter: true }}
                  keyField={"id"}
                  data={workAreas}
                  columns={workAreaColumns}
                  bordered
                  striped
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>
                {" "}
                {translationStore.getHardCodedTextTranslation(
                  TextTranslationType.WorkStations
                )}
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BootstrapTable
                  remote={{ filter: true }}
                  keyField={"id"}
                  data={workStations}
                  columns={workStationColumns}
                  bordered
                  striped
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default withTranslationStore(AdminPage);
