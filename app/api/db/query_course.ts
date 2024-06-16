// pages/api/db/query_course.ts

import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { isError } from "@/utils/isError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const result = await sql`SELECT * FROM "Course"`;
      res.status(200).json(result.rows);
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
