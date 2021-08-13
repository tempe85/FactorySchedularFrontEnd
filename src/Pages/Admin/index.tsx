import React, { useEffect, useState } from "react";
import { Layout } from "../../Containers/Layout";
import BootstrapTable from "react-bootstrap-table-next";
import { HighlightOff } from "@material-ui/icons/";
import {
  getWorkBuildings,
  getWorkBuildingWorkAreas,
  getWorkStationsByWorkAreas,
} from "../../API/Api";
import {
  IWorkArea,
  IWorkBuilding,
  IWorkStation,
  IWorkStationsByWorkArea,
} from "../../Interfaces";
import { toast } from "react-toastify";

export function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuilding] = useState<IWorkBuilding[]>([]);
  const [workAreas, setWorkAreas] = useState<IWorkArea[]>([]);
  const [workStation, setWorkStation] = useState<IWorkStationsByWorkArea[]>([]);


  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const workBuildings = await getWorkBuildings();
      if(true){
        
      }
      setBuilding(workBuildings);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch buildings. ${error}`);
      setIsLoading(false);
    }
  };

  const fetchWorkAreas = async (workBuildingId: string) => {
    try {
      const workAreas = await getWorkBuildingWorkAreas(workBuildingId);
      setWorkAreas(workAreas);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch work area. ${error}`);
      setIsLoading(false);
    }
  };

  const fetchWorkStations = async (workAreaId: string) => {
    try {
      const workStations = await getWorkStationsByWorkAreas([workAreaId]);
      setWorkStation(workStations);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch work stations. ${error}`);
      setIsLoading(false);
    }
  };
  const columns = [
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
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      // formatter: (cellContent: any, row: IRestaurantChain) => (
      //   <FontAwesomeIcon
      //     style={{ cursor: "pointer" }}
      //     color="red"
      //     icon={faMinusCircle}
      //     onClick={() => deleteChain(row)}
      //   />
      // ),
    },
  ];
  return (
    <Layout>
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
          columns={columns}
          bordered
          striped
        />
      </div>
    </Layout>
  );
}
