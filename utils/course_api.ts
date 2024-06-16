import { sql } from "@vercel/postgres";
import { Course } from "@/models/model";

export const initializeDatabase = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS "Course" (
      "Cno" VARCHAR(10) PRIMARY KEY,
      "Cname" VARCHAR(100),
      "Cpno" VARCHAR(10),
      "Ccredit" INTEGER
    )
  `;
};

export const fetchCourses = async () => {
  const result = await sql`SELECT * FROM "Course"`;
  return result.rows;
};

export const addCourse = async (course: Course) => {
  const { Cno, Cname, Cpno, Ccredit } = course;
  await sql`
    INSERT INTO "Course" ("Cno", "Cname", "Cpno", "Ccredit")
    VALUES (${Cno}, ${Cname}, ${Cpno}, ${Ccredit})
  `;
  return { message: "Course added successfully" };
};

export const deleteCourse = async (cno: string) => {
  await sql`
    DELETE FROM "Course" WHERE "Cno" = ${cno}
  `;
  return { message: "Course deleted successfully" };
};

export const modifyCourse = async (course: Course) => {
  const { Cno, Cname, Cpno, Ccredit } = course;
  await sql`
    UPDATE "Course"
    SET "Cname" = ${Cname}, "Cpno" = ${Cpno}, "Ccredit" = ${Ccredit}
    WHERE "Cno" = ${Cno}
  `;
  return { message: "Course modified successfully" };
};
