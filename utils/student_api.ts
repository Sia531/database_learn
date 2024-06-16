// utils/api.ts
const URL_BASE = "http://localhost:5000";

import { Student } from "@/models/model";
export const fetchStudents = async () => {
  const response = await fetch(URL_BASE + "/api/db/query_student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return response.json();
};

export const addStudent = async (student: Student) => {
  const response = await fetch(URL_BASE + "/api/db/add_student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
};

export const deleteStudent = async (sno: string) => {
  const response = await fetch(URL_BASE + "/api/db/delete_student", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Sno: sno }),
  });
  return response.json();
};

export const modifyStudent = async (student: Student) => {
  const response = await fetch(URL_BASE + "/api/db/modify_student", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
};
