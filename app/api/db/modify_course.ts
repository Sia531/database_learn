// pages/api/db/modify_course.ts

import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { isError } from "@/utils/isError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { Cno, Cname, Cpno, Ccredit } = req.body;
      await sql`
        UPDATE "Course"
        SET "Cname" = ${Cname}, "Cpno" = ${Cpno}, "Ccredit" = ${Ccredit}
        WHERE "Cno" = ${Cno}
      `;
      res.status(200).json({ message: "Course modified successfully" });
    } catch (error) {
      if (isError(error)) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
