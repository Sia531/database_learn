import { sql } from "@vercel/postgres";

const destroyData = async () => {
  await sql`DROP TABLE IF EXISTS "SC";`;
  await sql`DROP TABLE IF EXISTS "Student";`;
  await sql`DROP TABLE IF EXISTS "Course";`;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await destroyData();
      res.status(200).json({ message: "Database tables dropped successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
