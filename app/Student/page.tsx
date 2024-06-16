"use client";
import React, { useEffect, useState, MouseEventHandler } from "react";
import {
  fetchStudents,
  addStudent,
  deleteStudent,
  modifyStudent,
} from "@/utils/student_api";
import { Student } from "@/models/model";

const Home: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    Sno: "",
    Sname: "",
    Sage: 0,
    Sgender: "",
    Sdept: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchType, setSearchType] = useState("name"); // 新增状态来保存搜索类型
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [studentToModify, setStudentToModify] = useState<Student | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: Student[] = await fetchStudents();
      setStudents(data);
      setFilteredStudents(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter((student) =>
        searchType === "name"
          ? student.Sname.toLowerCase().includes(searchTerm.toLowerCase())
          : student.Sno.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students, searchType]);

  const handleAddStudent = async () => {
    await addStudent(newStudent);
    const data = await fetchStudents();
    setStudents(data);
    setNewStudent({ Sno: "", Sname: "", Sage: 0, Sgender: "", Sdept: "" });
    setShowAddModal(false); // 关闭添加窗口
  };

  const handleDeleteStudent = async () => {
    if (studentToDelete) {
      await deleteStudent(studentToDelete);
      const data = await fetchStudents();
      setStudents(data);
      setShowDeleteModal(false); // 关闭删除确认窗口
      setStudentToDelete(null);
    }
  };

  const handleModifyStudent: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (studentToModify) {
      await modifyStudent(studentToModify);
      const data = await fetchStudents();
      setStudents(data);
      setShowModifyModal(false);
      setStudentToModify(null);
    }
  };

  const openModifyModal = (student: Student) => {
    setStudentToModify(student);
    setShowModifyModal(true);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Students</h1>
      <div className="flex justify-center mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded-l"
        >
          <option value="name">Search by Name</option>
          <option value="sno">Search by Sno</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r">Search</button>
      </div>
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white p-2 mb-4"
      >
        Add Student
      </button>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4 text-center">Add Student</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sno:
              <input
                type="text"
                placeholder=""
                value={newStudent.Sno}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, Sno: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sname:
              <input
                type="text"
                placeholder=""
                value={newStudent.Sname}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, Sname: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sage:
              <input
                type="number"
                placeholder=""
                onChange={(e) =>
                  setNewStudent({ ...newStudent, Sage: Number(e.target.value) })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sgender:
              <input
                type="text"
                placeholder=""
                value={newStudent.Sgender}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, Sgender: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sdept:
              <input
                type="text"
                placeholder=""
                value={newStudent.Sdept}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, Sdept: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <button
              onClick={handleAddStudent}
              className="bg-blue-500 text-white p-2 mr-2"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-gray-500 text-white p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4 text-center">Delete Student</h2>
            <p className="text-center">
              Are you sure you want to delete this student?
            </p>
            <button
              onClick={handleDeleteStudent}
              className="bg-red-500 text-white p-2 mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-500 text-white p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showModifyModal && studentToModify && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4 text-center">Modify Student</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sno:
              <input
                type="text"
                placeholder=""
                value={studentToModify.Sno}
                onChange={(e) =>
                  setStudentToModify({
                    ...studentToModify,
                    Sno: e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sname:
              <input
                type="text"
                placeholder=""
                value={studentToModify.Sname}
                onChange={(e) =>
                  setStudentToModify({
                    ...studentToModify,
                    Sname: e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sage:
              <input
                type="number"
                placeholder=""
                value={studentToModify.Sage}
                onChange={(e) =>
                  setStudentToModify({
                    ...studentToModify,
                    Sage: Number(e.target.value),
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sgender:
              <input
                type="text"
                placeholder=""
                value={studentToModify.Sgender}
                onChange={(e) =>
                  setStudentToModify({
                    ...studentToModify,
                    Sgender: e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sdept:
              <input
                type="text"
                placeholder=""
                value={studentToModify.Sdept}
                onChange={(e) =>
                  setStudentToModify({
                    ...studentToModify,
                    Sdept: e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <button
              onClick={handleModifyStudent}
              className="bg-yellow-500 text-white p-2 mr-2"
            >
              Modify
            </button>
            <button
              onClick={() => setShowModifyModal(false)}
              className="bg-gray-500 text-white p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <table className="w-full border-collapse text-center">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Sno</th>
            <th className="border-b-2 p-2">Sname</th>
            <th className="border-b-2 p-2">Sage</th>
            <th className="border-b-2 p-2">Sgender</th>
            <th className="border-b-2 p-2">Sdept</th>
            <th className="border-b-2 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.Sno}>
              <td className="border-b p-2">{student.Sno}</td>
              <td className="border-b p-2">{student.Sname}</td>
              <td className="border-b p-2">{student.Sage}</td>
              <td className="border-b p-2">{student.Sgender}</td>
              <td className="border-b p-2">{student.Sdept}</td>
              <td className="border-b p-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setStudentToDelete(student.Sno);
                  }}
                  className="bg-red-500 text-white p-2 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => openModifyModal(student)}
                  className="bg-yellow-500 text-white p-2"
                >
                  Modify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
