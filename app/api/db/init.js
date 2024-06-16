import { sql } from "@vercel/postgres";

const initData = async () => {
  // Insert sample students
  await sql`
    INSERT INTO "Student" ("Sno", "Sname", "Sgender", "Sage", "Sdept") VALUES
    ('001', 'John Doe', 'M', 20, 'CS'),
    ('002', 'Jane Smith', 'F', 22, 'EE'),
    ('003', 'Alice Johnson', 'F', 19, 'ME')
    ON CONFLICT ("Sno") DO NOTHING;
  `;

  // Insert sample courses
  await sql`
    INSERT INTO "Course" ("Cno", "Cname", "Cpno", "Ccredit") VALUES
    ('C001', 'Database Systems', NULL, 4),
    ('C002', 'Operating Systems', 'C001', 3),
    ('C003', 'Data Structures', NULL, 3)
    ON CONFLICT ("Cno") DO NOTHING;
  `;

  // Insert sample enrollments
  await sql`
    INSERT INTO "SC" ("Sno", "Cno", "Grade") VALUES
    ('001', 'C001', 85),
    ('002', 'C002', 90),
    ('003', 'C003', 95)
    ON CONFLICT ("Sno", "Cno") DO NOTHING;
  `;
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await initData();
      res
        .status(200)
        .json({ message: "Database initialized with sample data" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
