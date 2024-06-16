"use client";
import React, { useEffect, useState, MouseEventHandler } from "react";
import { fetchSCs, addSC, deleteSC, modifySC } from "@/utils/sc_api";
import { SC } from "@/models/model";

const Home: React.FC = () => {
  const [scs, setSCs] = useState<SC[]>([]);
  const [filteredSCs, setFilteredSCs] = useState<SC[]>([]);
  const [newSC, setNewSC] = useState({
    Sno: "",
    Cno: "",
    Grade: 0,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // 新增状态来保存搜索类型
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [scToDelete, setSCToDelete] = useState<string | null>(null);
  const [scToModify, setSCToModify] = useState<SC | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data: SC[] = await fetchSCs();
      setSCs(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredSCs(
      scs.filter((sc) =>
        searchType === "name"
          ? sc.Sno.toLowerCase().includes(searchTerm.toLowerCase())
          : sc.Cno.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, scs, searchType]);

  const handleAddSC = async () => {
    if (newSC.Grade < 0 || newSC.Grade > 100) {
      setErrorMessage("Grade must be between 0 and 100");
      return;
    }

    await addSC(newSC);
    const data = await fetchSCs();
    setSCs(data);
    setNewSC({
      Sno: "",
      Cno: "",
      Grade: 0,
    });
    setShowAddModal(false); // 关闭添加窗口
    setErrorMessage(""); // 清除错误消息
  };

  const handleDeleteSC = async () => {
    if (scToDelete) {
      await deleteSC(scToDelete);
      const data = await fetchSCs();
      setSCs(data);
      setShowDeleteModal(false); // 关闭删除确认窗口
      setSCToDelete(null);
    }
  };

  const handleModifySC: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (scToModify) {
      if (scToModify.Grade < 0 || scToModify.Grade > 100) {
        setErrorMessage("Grade must be between 0 and 100");
        return;
      }

      await modifySC(scToModify);
      const data = await fetchSCs();
      setSCs(data);
      setShowModifyModal(false);
      setSCToModify(null);
      setErrorMessage(""); // 清除错误消息
    }
  };

  const openModifyModal = (sc: SC) => {
    setSCToModify(sc);
    setShowModifyModal(true);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">SCs</h1>
      <div className="flex justify-center mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded-l"
        >
          <option value="sno">Search by Sno</option>
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
        Add SC
      </button>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4 text-center">Add SC</h2>
            {errorMessage && (
              <p className="text-red-500 mb-2 text-center">{errorMessage}</p>
            )}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sno:
              <input
                type="text"
                placeholder=""
                value={newSC.Sno}
                onChange={(e) => setNewSC({ ...newSC, Sno: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cno:
              <input
                type="text"
                placeholder=""
                value={newSC.Cno}
                onChange={(e) => setNewSC({ ...newSC, Cno: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Grade:
              <input
                type="number"
                placeholder=""
                // value={newSC.Grade}
                onChange={(e) =>
                  setNewSC({ ...newSC, Grade: Number(e.target.value) })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <button
              onClick={handleAddSC}
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
            <h2 className="text-lg mb-4 text-center">Delete SC</h2>
            <p className="text-center">
              Are you sure you want to delete this SC?
            </p>
            <button
              onClick={handleDeleteSC}
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
      {showModifyModal && scToModify && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4 text-center">Modify SC</h2>
            {errorMessage && (
              <p className="text-red-500 mb-2 text-center">{errorMessage}</p>
            )}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sno:
              <input
                type="text"
                placeholder=""
                value={scToModify.Sno}
                onChange={(e) =>
                  setSCToModify({ ...scToModify, Sno: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cno:
              <input
                type="text"
                placeholder=""
                value={scToModify.Cno}
                onChange={(e) =>
                  setSCToModify({ ...scToModify, Cno: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Grade:
              <input
                type="number"
                placeholder=""
                value={scToModify.Grade}
                onChange={(e) =>
                  setSCToModify({
                    ...scToModify,
                    Grade: Number(e.target.value),
                  })
                }
                className="border p-2 mb-2 w-full"
              />
            </label>

            <button
              onClick={handleModifySC}
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
            <th className="border-b-2 p-2">Cno</th>
            <th className="border-b-2 p-2">Grade</th>
            <th className="border-b-2 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSCs.map((sc) => (
            <tr key={`${sc.Sno}-${sc.Cno}`}>
              <td className="border-b p-2">{sc.Sno}</td>
              <td className="border-b p-2">{sc.Cno}</td>
              <td className="border-b p-2">{sc.Grade}</td>
              <td className="border-b p-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSCToDelete(sc.Sno);
                  }}
                  className="bg-red-500 text-white p-2 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => openModifyModal(sc)}
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
