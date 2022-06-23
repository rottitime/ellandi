import ky from "ky";
import useSWR, { useSWRConfig } from "swr";

type PatchedWindow = {
  apiUrl: string;
};
const w = window as unknown as PatchedWindow;
if (!w.apiUrl) {
  try {
    new URL(import.meta.env.VITE_PROXY_ROOT_URL);
    w.apiUrl = `${import.meta.env.VITE_FRONTEND_HOST}/api`;
  } catch {
    w.apiUrl = import.meta.env.VITE_API_ROOT_URL;
  }
}

export type JSONPrimitive = number | boolean | string | null;
export type JSONObject =
  | { [key: string]: JSONObject | JSONPrimitive }
  | Array<JSONObject | JSONPrimitive>;
export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const trimSlashes = (string: string) => {
  let trimmedApiPath = string;
  while (trimmedApiPath.startsWith("/")) trimmedApiPath = trimmedApiPath.slice(1);
  while (trimmedApiPath.endsWith("/")) trimmedApiPath = trimmedApiPath.slice(0, -1);
  return trimmedApiPath;
};

const getFetcher = (apiPath: string): Promise<JSONObject> => {
  return ky.get(`${w.apiUrl}/${apiPath}/`).json();
};
export const useGet = <ResponseJSON extends JSONObject>(
  apiPath: string
): ResponseJSON => {
  const { data } = useSWR(trimSlashes(apiPath), getFetcher, { suspense: true });
  return data as ResponseJSON;
};

export const usePost = <RequestJSON extends JSONObject, ResponseJSON extends JSONObject>(
  apiPath: string
): ((json: RequestJSON) => Promise<ResponseJSON>) => {
  const { mutate } = useSWRConfig();
  const trimmedApiPath = trimSlashes(apiPath);
  return async (json: RequestJSON): Promise<ResponseJSON> => {
    const responseJson = (await ky
      .post(`${w.apiUrl}/${apiPath}/`, { json })
      .json()) as ResponseJSON;
    const parts = trimmedApiPath.split("/");
    for (let i = parts.length; i > 0; i--) {
      mutate(parts.slice(0, i).join("/"));
    }
    return responseJson;
  };
};
export const usePut = <RequestJSON extends JSONObject, ResponseJSON extends JSONObject>(
  apiPath: string
): ((json: RequestJSON) => Promise<ResponseJSON>) => {
  const { mutate } = useSWRConfig();
  const trimmedApiPath = trimSlashes(apiPath);
  return async (json: RequestJSON): Promise<ResponseJSON> => {
    const responseJson = (await ky
      .put(`${w.apiUrl}/${apiPath}/`, { json })
      .json()) as ResponseJSON;
    const parts = trimmedApiPath.split("/");
    for (let i = parts.length; i > 0; i--) {
      mutate(parts.slice(0, i).join("/"));
    }
    return responseJson;
  };
};
export const usePatch = <RequestJSON extends JSONObject, ResponseJSON extends JSONObject>(
  apiPath: string
): ((json: RequestJSON) => Promise<ResponseJSON>) => {
  const { mutate } = useSWRConfig();
  const trimmedApiPath = trimSlashes(apiPath);
  return async (json: RequestJSON): Promise<ResponseJSON> => {
    const responseJson = (await ky
      .patch(`${w.apiUrl}/${apiPath}/`, { json })
      .json()) as ResponseJSON;
    const parts = trimmedApiPath.split("/");
    for (let i = parts.length; i > 0; i--) {
      mutate(parts.slice(0, i).join("/"));
    }
    return responseJson;
  };
};
export const useDelete = <
  RequestJSON extends JSONObject = Record<string, never>,
  ResponseJSON extends JSONObject = Record<string, never>
>(
  apiPath: string
): ((json?: RequestJSON) => Promise<ResponseJSON>) => {
  const { mutate } = useSWRConfig();
  const trimmedApiPath = trimSlashes(apiPath);
  return async (json?: RequestJSON): Promise<ResponseJSON> => {
    const responseBody = await ky.delete(`${w.apiUrl}/${apiPath}/`, { json: json ?? {} });
    let response: ResponseJSON = {} as ResponseJSON;
    try {
      response = (await responseBody.json()) as ResponseJSON;
    } catch {
      //
    }
    const parts = trimmedApiPath.split("/");
    for (let i = parts.length; i > 0; i--) {
      mutate(parts.slice(0, i).join("/"));
    }
    return response;
  };
};
