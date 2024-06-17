import { sql } from "@vercel/postgres";
import { SC } from "@/models/model";

// 获取所有SC记录
export const fetchSCs = async () => {
  const result = await sql`SELECT * FROM "SC"`;
  return result.rows.map((row) => ({
    Sno: row.Sno,
    Cno: row.Cno,
    Grade: row.Grade,
  }));
};

// 添加新的SC记录
export const addSC = async (sc: SC) => {
  const { Sno, Cno, Grade } = sc;
  await sql`
    INSERT INTO "SC" ("Sno", "Cno", "Grade")
    VALUES (${Sno}, ${Cno}, ${Grade})
  `;
  return { message: "SC added successfully" };
};

// 删除指定Sno的SC记录
export const deleteSC = async (sno: string) => {
  await sql`
    DELETE FROM "SC" WHERE "Sno" = ${sno}
  `;
  return { message: "SC deleted successfully" };
};

// 修改SC记录
export const modifySC = async (sc: SC) => {
  const { Sno, Cno, Grade } = sc;
  await sql`
    UPDATE "SC"
    SET "Cno" = ${Cno}, "Grade" = ${Grade}
    WHERE "Sno" = ${Sno}
  `;
  return { message: "SC modified successfully" };
};
