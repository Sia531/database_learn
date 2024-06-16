// pages/api/db/add_course.ts

import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { isError } from "@/utils/isError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { Cno, Cname, Cpno, Ccredit } = req.body;
      await sql`
        INSERT INTO "Course" ("Cno", "Cname", "Cpno", "Ccredit")
        VALUES (${Cno}, ${Cname}, ${Cpno}, ${Ccredit})
      `;
      res.status(200).json({ message: "Course added successfully" });
    } catch (error) {
      if (isError(error)) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
