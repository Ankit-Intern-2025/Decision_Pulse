import React, { useState } from "react";

const Parameter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name, setName] = useState("");
  const fileList = ["File1.txt", "File2.txt", "File3.txt"]; 

  const handleSelect = (option) => {
    if (option === "New Parameter" || option === "Edit Parameter") {
      setIsModalOpen(true);
    }
    setShowDropdown(false);
  };

  const toggleFileSelection = (file) => {
    setSelectedFiles((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    );
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 bg-[#006064] text-white rounded-md"
      >
        Manage Parameter
      </button>
      {showDropdown && (
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
          <button
            onClick={() => handleSelect("New Parameter")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
          >
            New Parameter
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-2/3">
           
            <h2 className="text-lg font-bold mb-4">New Parameter</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4">New</button>
            <div className="flex">
              {/* Sidebar */}
              <div className="w-1/4 bg-gray-100 p-4 rounded-md flex flex-col">
              
                <p className="mt-2 text-gray-700">{name || ""}</p>
              </div>

              {/* Form Section */}
              <div className="w-3/4 p-6">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="border w-full p-2 rounded-md mb-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                />

                <label className="block text-sm font-medium ">List</label>
                <div className="relative mb-6">
                  <button
                    onClick={() => setShowCheckboxes(!showCheckboxes)}
                    className="border w-full p-2 rounded-md text-left"
                  >
                    {selectedFiles.length > 0 ? selectedFiles.join(", ") : "Select Value"}
                  </button>
                  {showCheckboxes && (
                    <div className="absolute w-full bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto ">
                      {fileList.map((file) => (
                        <div key={file} className="flex items-center space-x-2 p-2 hover:bg-gray-100">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file)}
                            onChange={() => toggleFileSelection(file)}
                          />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <label className="block text-sm font-medium">Current Value</label>
                <select className="border w-full p-2 rounded-md mb-6">
                  <option>Select Value</option>
                </select>

                <label className="block text-sm font-medium">Default Value</label>
                <select className="border w-full p-2 rounded-md mb-6">
                  <option>Select Value</option>
                </select>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parameter;
