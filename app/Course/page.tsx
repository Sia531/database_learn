"use client";
import React, { useEffect, useState, MouseEventHandler } from "react";
import {
  fetchCourses,
  addCourse,
  deleteCourse,
  modifyCourse,
  initializeDatabase,
} from "@/utils/course_api";
import { Course } from "@/models/model";

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    Cno: "",
    Cname: "",
    Cpno: "",
    Ccredit: 0,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // 新增状态来保存搜索类型
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [courseToModify, setCourseToModify] = useState<Course | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await initializeDatabase();
      const data: Course[] = await fetchCourses();
      setCourses(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) =>
        searchType === "name"
          ? course.Cname.toLowerCase().includes(searchTerm.toLowerCase())
          : course.Cno.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, courses, searchType]);

  const handleAddCourse = async () => {
    console.log("adding..");
    await addCourse(newCourse);
    const data = await fetchCourses();
    setCourses(data);
    setNewCourse({
      Cno: "",
      Cname: "",
      Cpno: "",
      Ccredit: 0,
    });
    setShowAddModal(false); // 关闭添加窗口
  };

  const handleDeleteCourse = async () => {
    if (courseToDelete) {
      await deleteCourse(courseToDelete);
      const data = await fetchCourses();
      setCourses(data);
      setShowDeleteModal(false); // 关闭删除确认窗口
      setCourseToDelete(null);
    }
  };

  const handleModifyCourse: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (courseToModify) {
      await modifyCourse(courseToModify);
      const data = await fetchCourses();
      setCourses(data);
      setShowModifyModal(false);
      setCourseToModify(null);
    }
  };
  const openModifyModal = (course: Course) => {
    setCourseToModify(course);
    setShowModifyModal(true);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Courses</h1>
      <div className="flex justify-center mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded-l"
        >
          <option value="name">Search by Name</option>
          <option value="cno">Search by Cno</option>
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
        Add Course
      </button>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4 text-center">Add Course</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cno:
              <input
                type="text"
                placeholder=""
                value={newCourse.Cno}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, Cno: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cname:
              <input
                type="text"
                placeholder=""
                value={newCourse.Cname}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, Cname: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cpno:
              <input
                type="text"
                placeholder=""
                value={newCourse.Cpno}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, Cpno: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ccredit:
              <input
                type="number"
                placeholder=""
                // value={newCourse.Ccredit}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    Ccredit: Number(e.target.value),
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>

            <button
              onClick={handleAddCourse}
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
            <h2 className="text-lg mb-4 text-center">Delete Course</h2>
            <p className="text-center">
              Are you sure you want to delete this course?
            </p>
            <button
              onClick={handleDeleteCourse}
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
      {showModifyModal && courseToModify && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4 text-center">Modify Course</h2>
            <input
              type="text"
              placeholder="Cno"
              value={courseToModify.Cno}
              onChange={(e) =>
                setCourseToModify({ ...courseToModify, Cno: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Cname"
              value={courseToModify.Cname}
              onChange={(e) =>
                setCourseToModify({
                  ...courseToModify,
                  Cname: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Cpno"
              value={courseToModify.Cpno}
              onChange={(e) =>
                setCourseToModify({
                  ...courseToModify,
                  Cpno: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Ccredit"
              value={courseToModify.Ccredit}
              onChange={(e) =>
                setCourseToModify({
                  ...courseToModify,
                  Ccredit: Number(e.target.value),
                })
              }
              className="border p-2 mb-2 w-full"
            />

            <button
              onClick={handleModifyCourse}
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
            <th className="border-b-2 p-2">Cno</th>
            <th className="border-b-2 p-2">Cname</th>
            <th className="border-b-2 p-2">Cpno</th>
            <th className="border-b-2 p-2">Ccredit</th>
            <th className="border-b-2 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.Cno}>
              <td className="border-b p-2">{course.Cno}</td>
              <td className="border-b p-2">{course.Cname}</td>
              <td className="border-b p-2">{course.Cpno}</td>
              <td className="border-b p-2">{course.Ccredit}</td>
              <td className="border-b p-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setCourseToDelete(course.Cno);
                  }}
                  className="bg-red-500 text-white p-2 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => openModifyModal(course)}
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
