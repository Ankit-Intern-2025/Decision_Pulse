// // import React, { useRef } from 'react';

// // const FileUploadComponent = ({ onFileUpload }) => {
// //   const fileInputRef = useRef(null);

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       onFileUpload(file);
// //     }
// //   };

// //   return (
// //     <div >
// //       {/* <label className="text-lg font-semibold">{label}</label> */}
// //       <label className='block '>
// //       <input
// //         type="file"
// //         ref={fileInputRef}
// //         onChange={handleFileChange}
// //         accept=".xlsx, .xls"
      
// //       />
// //       </label>
// //     </div>
// //   );
// // };

// // export default FileUploadComponent;

// import React, { useRef, useState } from 'react';

// const FileUploadComponent = ({ onFileUpload }) => {
//   const fileInputRef = useRef(null);
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileName(file.name);  // Display selected file name
//       onFileUpload(file);  // Trigger the onFileUpload callback with the selected file
//     }
//   };

//   const clearFileInput = () => {
//     fileInputRef.current.value = null;
//     setFileName("");
//   };

//   return (
//     <div>
//       <label className="block">
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           accept=".xlsx, .xls"
//         />
//       </label>
//       {fileName && (
//         <div>
//           <p>Selected file: {fileName}</p>
//           <button onClick={clearFileInput} className="mt-2 text-blue-500 underline">
//             Clear file
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploadComponent;
