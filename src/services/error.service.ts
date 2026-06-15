import apiClient from "./api/client";

const BASE_PATH = "/api/errors";

export async function fetchErrors(params: Record<string, string> = {}) {
  const { data } = await apiClient.get(BASE_PATH, { params });
  return data;
}

export async function fetchErrorById(id: string) {
  const { data } = await apiClient.get(`${BASE_PATH}/${encodeURIComponent(id)}`);
  return data;
}

export async function closeError(id: string, payload: Record<string, unknown> = {}) {
  const { data } = await apiClient.post(
    `/api/error/${encodeURIComponent(id)}/close`,
    payload,
  );
  return data;
}

export async function archiveError(id: string, payload: Record<string, unknown> = {}) {
  const { data } = await apiClient.post(
    `/api/error/${encodeURIComponent(id)}/archive`,
    payload,
  );
  return data;
}

export function devMock() {
  return {
    id: "err-0000-1111-2222-3333",
    timestamp: "2023-10-27 14:22:10 UTC",
    state: "CRITICAL",
    title: "Recurrent Connection Timeout",
    stack: {
      runtime: "Node.js v18.x",
      database: "MongoDB 6.0",
    },
    errorLog: `MongooseServerSelectionError: connection timed out`,
    aiReasoning:
      "The connection pool is exhausted due to high concurrent requests during peak hours.",
  };
}
