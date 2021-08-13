import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { LanguageType } from "../Enums";
import {
  ITranslationResponse,
  IWorkArea,
  IWorkAreaCreate,
  IWorkBuilding,
  IWorkBuildingCreate,
  IWorkBuildingUpdate,
  IWorker,
  IWorkStation,
  IWorkStationCreate,
  IWorkStationsByWorkArea,
  IWorkStationUpdate,
  IWorkStationWorkers,
} from "../Interfaces";
import {
  MockTranslationFrenchResponse,
  MockTranslationPortugueseResponse,
  MockTranslationSpanishResponse,
} from "../Mocks/MockTranslationResponse";

const baseUrl = "https://localhost:5001";

async function handleBasicResponse<T>(axiosPromise: Promise<AxiosResponse<T>>) {
  try {
    const response = await axiosPromise;
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Gets the translation from the translation service
export const getTextTranslations = async (
  text: string[],
  languageIsoString: string
): Promise<ITranslationResponse | undefined> => {
  try {
    const translations = (
      await axios.post<ITranslationResponse>(
        "http://flip3.engr.oregonstate.edu:9183/",
        {
          text,
          target: languageIsoString,
        }
      )
    ).data;

    if (!translations) {
      toast.error("Unable to fetch translations");
      return Promise.resolve(undefined);
    }
    return translations;
  } catch (error) {
    toast.error("Unable to fetch translations");
    return Promise.resolve(undefined);
  }
};

//Building CRUD
export const getWorkBuildings = async (): Promise<IWorkBuilding[]> => {
  return handleBasicResponse(
    axios.get<IWorkBuilding[]>(`${baseUrl}/buildings`)
  );
};

export const getWorkBuildingById = async (
  id: string
): Promise<IWorkBuilding> => {
  return handleBasicResponse(
    axios.get<IWorkBuilding>(`${baseUrl}/buildings/${id}`)
  );
};

export const getWorkBuildingWorkAreas = async (
  id: string
): Promise<IWorkArea[]> => {
  return handleBasicResponse(
    axios.get<IWorkArea[]>(`${baseUrl}/buildings/workAreas/${id}`)
  );
};

export const createWorkBuilding = async (newBuilding: IWorkBuildingCreate) => {
  return axios
    .post(`${baseUrl}/buildings`, newBuilding)
    .then((response) => {
      console.log("Create building response: ", response.data); //Find out what this actually returns
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateWorkBuilding = async (
  buildingId: string,
  updateBuildingInfo: IWorkBuildingUpdate
) => {
  return handleBasicResponse(
    axios.put(`${baseUrl}/buildings/${buildingId}`, updateBuildingInfo)
  );
};

export const deleteWorkBuilding = async (buildingId: string): Promise<void> => {
  return handleBasicResponse(
    axios.delete(`${baseUrl}/buildings/${buildingId}`)
  );
};

export const getWorkAreas = async (): Promise<IWorkArea[]> => {
  return handleBasicResponse(axios.get<IWorkArea[]>(`${baseUrl}/workAreas`));
};

export const getWorkAreaById = async (id: string): Promise<IWorkArea> => {
  return handleBasicResponse(
    axios.get<IWorkArea>(`${baseUrl}/workAreas/${id}}`)
  );
};

export const createWorkArea = async (newWorkArea: IWorkAreaCreate) => {
  return handleBasicResponse(axios.post(`${baseUrl}/workAreas`, newWorkArea));
};

export const updateWorkArea = async (
  id: string,
  updateWorkAreInfo: IWorkBuildingUpdate
) => {
  return handleBasicResponse(
    axios.put(`${baseUrl}/workAreas/${id}`, updateWorkAreInfo)
  );
};

export const deleteWorkArea = async (id: string) => {
  return handleBasicResponse(axios.delete(`${baseUrl}/workAreas/${id}`));
};

export const getWorkStationsByWorkAreas = async (workAreaIds: string[]) => {
  return handleBasicResponse(
    axios.post<IWorkStationsByWorkArea[]>(
      `${baseUrl}/workStation/workStationsByWorkAreas`,
      workAreaIds
    )
  );
};

export const getWorkStationByWorkStationId = async (id: string) => {
  return handleBasicResponse(
    axios.get<IWorkStation>(`${baseUrl}/workStations/${id}`)
  );
};

export const createWorkStation = async (newWorkStation: IWorkStationCreate) => {
  return handleBasicResponse(
    axios.post(`${baseUrl}/workStations/`, newWorkStation)
  );
};

export const getAllWorkStations = async () => {
  return handleBasicResponse(
    axios.get<IWorkStation[]>(`${baseUrl}/workStations`)
  );
};

export const updateWorkStation = async (
  workStationId: string,
  updateWorkStationInfo: IWorkStationUpdate
) => {
  return handleBasicResponse(
    axios.put(`${baseUrl}/workStations/${workStationId}`, updateWorkStationInfo)
  );
};

export const deleteWorkStation = async (id: string) => {
  return handleBasicResponse(axios.delete(`${baseUrl}/workStations/${id}`));
};

export const getAllUsers = async () => {
  return handleBasicResponse(axios.get(`${baseUrl}/FactorySchedulerUsers/`));
};

// export const updateWorkStationWorkers = async (
//   workStationId: string,
//   stationWorkers: IWorker[]
// ) => {
//   return handleBasicResponse(
//     axios.put(`${baseUrl}/stationWorkers/${workStationId}`, stationWorkers)
//   );
// };

// export const getWorkAreaStationsByWorkAreaId = async (
//   id: string
// ): Promise<IWorkStation[]> => {
//   return handleBasicResponse(
//     axios.get<IWorkStation[]>(`${baseUrl}/stations/${id}`)
//   );
// };

// export const getWorkersByWorkStationId = async (
//   id: string
// ): Promise<IWorker[]> => {
//   return handleBasicResponse(
//     axios.get<IWorker[]>(`${baseUrl}/workerStations/${id}`)
//   );
// };

// export const getAllWorkers = async (): Promise<IWorker[]> => {
//   return handleBasicResponse(axios.get<IWorker[]>(`${baseUrl}/workers`));
// };

// export const getAllWorkStationWorkers = async (): Promise<
//   IWorkStationWorkers[]
// > => {
//   return handleBasicResponse(
//     axios.get<IWorkStationWorkers[]>(`${baseUrl}/workStationWorkers`)
//   );
// };
