// pages/api/db/delete_course.ts

import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { isError } from "@/utils/isError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { Cno } = req.body;
      await sql`
        DELETE FROM "Course" WHERE "Cno" = ${Cno}
      `;
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      if (isError(error)) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
