import axios, { AxiosResponse } from "axios";
import {
  IWorkArea,
  IWorkAreaCreate,
  IWorkBuilding,
  IWorkBuildingCreate,
  IWorkBuildingUpdate,
} from "../Interfaces";

const baseUrl = "https://localhost:5001";

async function handleBasicResponse<T>(axiosPromise: Promise<AxiosResponse<T>>) {
  try {
    const response = await axiosPromise;
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getWorkBuildings = async (): Promise<IWorkBuilding[]> => {
  return handleBasicResponse(
    axios.get<IWorkBuilding[]>(`${baseUrl}/buildings`)
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
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateWorkBuilding = async (
  buildingId: string,
  updatedBuilding: IWorkBuildingUpdate
) => {
  return axios
    .put(`${baseUrl}/buildings/${buildingId}`, updatedBuilding)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteWorkBuilding = async (buildingId: number) => {
  return axios
    .delete(`${baseUrl}/buildings/${buildingId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getWorkAreas = async (): Promise<IWorkArea[]> => {
  return handleBasicResponse(axios.get<IWorkArea[]>(`${baseUrl}/workAreas`));
};

export const createWorkArea = async (newWorkArea: IWorkAreaCreate) => {
  return axios
    .post(`${baseUrl}/workAreas`, newWorkArea)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateWorkArea = async (
  id: string,
  updatedWorkArea: IWorkBuildingUpdate
) => {
  return axios
    .put(`${baseUrl}/workAreas/${id}`, updatedWorkArea)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteWorkArea = async (id: number) => {
  return axios
    .delete(`${baseUrl}/workAreas/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
