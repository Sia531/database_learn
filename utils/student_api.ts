import { sql } from "@vercel/postgres";
import { Student } from "@/models/model";

// 获取所有Student记录
export const fetchStudents = async () => {
  const result = await sql`SELECT * FROM "Student"`;
  return result.rows.map((row) => ({
    Sno: row.Sno,
    Sname: row.Sname,
    Sgender: row.Sgender,
    Sage: row.Sage,
    Sdept: row.Sdept,
  }));
};

// 添加新的Student记录
export const addStudent = async (student: Student) => {
  const { Sno, Sname, Sgender, Sage, Sdept } = student;
  await sql`
    INSERT INTO "Student" ("Sno", "Sname", "Sgender", "Sage", "Sdept")
    VALUES (${Sno}, ${Sname}, ${Sgender}, ${Sage}, ${Sdept})
  `;
  return { message: "Student added successfully" };
};

// 删除指定Sno的Student记录
export const deleteStudent = async (sno: string) => {
  await sql`
    DELETE FROM "Student" WHERE "Sno" = ${sno}
  `;
  return { message: "Student deleted successfully" };
};

// 修改Student记录
export const modifyStudent = async (student: Student) => {
  const { Sno, Sname, Sgender, Sage, Sdept } = student;
  await sql`
    UPDATE "Student"
    SET "Sname" = ${Sname}, "Sgender" = ${Sgender}, "Sage" = ${Sage}, "Sdept" = ${Sdept}
    WHERE "Sno" = ${Sno}
  `;
  return { message: "Student modified successfully" };
};
