-- schema.sql

CREATE TABLE IF NOT EXISTS "Student" (
    "Sno" VARCHAR(10) PRIMARY KEY,
    "Sname" VARCHAR(100),
    "Sgender" VARCHAR(10),
    "Sage" INTEGER,
    "Sdept" VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS "Course" (
    "Cno" VARCHAR(10) PRIMARY KEY,
    "Cname" VARCHAR(100),
    "Cpno" VARCHAR(10),
    "Ccredit" INTEGER
);

CREATE TABLE IF NOT EXISTS "SC" (
    "Sno" VARCHAR(10),
    "Cno" VARCHAR(10),
    "Grade" INTEGER,
    PRIMARY KEY ("Sno", "Cno"),
    FOREIGN KEY ("Sno") REFERENCES "Student"("Sno"),
    FOREIGN KEY ("Cno") REFERENCES "Course"("Cno")
);
