import React, { useEffect, useState } from "react";
import { Layout } from "../../Containers/Layout";
import BootstrapTable from "react-bootstrap-table-next";
import {
  getAllUsers,
  getAllWorkStations,
  getWorkAreas,
  getWorkBuildings,
} from "../../API/Api";
import {
  IUserProps,
  IWorkArea,
  IWorkBuilding,
  IWorker,
  IWorkStation,
} from "../../Interfaces";
import { toast } from "react-toastify";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";
import { TextTranslationType, UserRoleType } from "../../Enums";
import { CircularProgress } from "@material-ui/core";
import { Authorization } from "../../Components/Authorization";
import { withUser } from "../../HOC/withUser";

function AdminPage({
  translationStore,
  isUserAnAdmin,
}: ITranslationStoreProps & IUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuilding] = useState<IWorkBuilding[]>([]);
  const [workAreas, setWorkAreas] = useState<IWorkArea[]>([]);
  const [workStations, setWorkStations] = useState<IWorkStation[]>([]);
  const [allWorkers, setAllWorkers] = useState<IWorker[]>([]);

  useEffect(() => {
    getBuildingsWorkAreasAndWorkStations();
  }, []);

  const getBuildingsWorkAreasAndWorkStations = async () => {
    setIsLoading(true);
    await fetchBuildings();
    await fetchWorkAreas();
    await fetchWorkStations();
    await fetchWorkers();
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

  const fetchWorkers = async () => {
    try {
      const workers = await getAllUsers();
      const unassignedWorkers = workers.filter(
        (p) => p.assignedWorkStationId == null
      );
      setAllWorkers(workers);
    } catch (e) {
      toast.error(`Could not fetch workers! ${e}`);
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

  const usersColumns = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "firstName",
      text: "First Name",
    },
    {
      dataField: "lastName",
      text: "Last Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "assignedWorkStationId",
      text: "Assigned Work Station Id",
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
      <Authorization
        isAuthorized={isUserAnAdmin}
        userRoleType={UserRoleType.Admin}
      >
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
                    TextTranslationType.workersString
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
                    data={allWorkers}
                    columns={usersColumns}
                    bordered
                    striped
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Authorization>
    </Layout>
  );
}

export default withTranslationStore(withUser(AdminPage));
