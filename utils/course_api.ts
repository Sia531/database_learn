// utils/api.ts
const URL_BASE = "http://localhost:5000";

import { Course } from "@/models/model";
export const fetchCourses = async () => {
  const response = await fetch(URL_BASE + "/api/db/query_course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return response.json();
};

export const addCourse = async (course: Course) => {
  const response = await fetch(URL_BASE + "/api/db/add_course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  return response.json();
};

export const deleteCourse = async (cno: string) => {
  console.log(cno);
  const response = await fetch(URL_BASE + "/api/db/delete_course", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Cno: cno }),
  });
  return response.json();
};

export const modifyCourse = async (course: Course) => {
  const response = await fetch(URL_BASE + "/api/db/modify_course", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  return response.json();
};
