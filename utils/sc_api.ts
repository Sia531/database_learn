// utils/api.ts
const URL_BASE = "http://localhost:5000";

import { SC } from "@/models/model";
export const fetchSCs = async () => {
  const response = await fetch(URL_BASE + "/api/db/query_sc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return response.json();
};

export const addSC = async (sc: SC) => {
  const response = await fetch(URL_BASE + "/api/db/add_sc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sc),
  });
  console.log(response);
  return response.json();
};

export const deleteSC = async (sno: string) => {
  const response = await fetch(URL_BASE + "/api/db/delete_sc", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Sno: sno }),
  });
  return response.json();
};

export const modifySC = async (sc: SC) => {
  const response = await fetch(URL_BASE + "/api/db/modify_sc", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sc),
  });
  console.log(response.json);
  return response.json();
};
