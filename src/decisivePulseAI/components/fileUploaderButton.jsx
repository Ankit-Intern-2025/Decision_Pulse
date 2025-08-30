import React, { useRef } from "react";
import axios from "axios";

const FileUpload = (prop) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; 


    if (file) {
      // Create a new FormData instance and append the file
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("https://file.io", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

     
        alert(`File uploaded successfully. Download URL: ${response.data.link}`);
        localStorage.setItem('downloadLink', response.data.link); 

      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleDownload = () => {
    const downloadLink = localStorage.getItem('downloadLink'); 
    if (downloadLink) {
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = 'downloaded_file';
      document.body.appendChild(link); 
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No file available to download. Please upload a file first.");
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="bg-[#00ACC1] hover:bg-[#0497a9] text-white py-1 px-4 rounded-2xl flex items-center mx-2 mt-1"
        style={{ boxShadow: "2px 2px 2px  #191A23" }}
      >
        {prop.prop === "Upload" && <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.79232 9.33325V3.56034L3.95065 5.402L2.95898 4.37492L6.50065 0.833252L10.0423 4.37492L9.05065 5.402L7.20898 3.56034V9.33325H5.79232ZM2.25065 12.1666C1.86107 12.1666 1.52768 12.028 1.25048 11.7508C0.97329 11.4736 0.834457 11.14 0.833984 10.7499V8.62492H2.25065V10.7499H10.7507V8.62492H12.1673V10.7499C12.1673 11.1395 12.0287 11.4731 11.7515 11.7508C11.4743 12.0285 11.1407 12.1671 10.7507 12.1666H2.25065Z"
            fill="white"
          />
        </svg>}
        {prop.prop === "Download" && <svg
          width="9"
          height="12"
          viewBox="0 0 9 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.36875 4.625H6.375V1.5C6.375 1.15625 6.09375 0.875 5.75 0.875H3.25C2.90625 0.875 2.625 1.15625 2.625 1.5V4.625H1.63125C1.075 4.625 0.79375 5.3 1.1875 5.69375L4.05625 8.5625C4.3 8.80625 4.69375 8.80625 4.9375 8.5625L7.80625 5.69375C8.2 5.3 7.925 4.625 7.36875 4.625ZM0.125 10.875C0.125 11.2188 0.40625 11.5 0.75 11.5H8.25C8.59375 11.5 8.875 11.2188 8.875 10.875C8.875 10.5312 8.59375 10.25 8.25 10.25H0.75C0.40625 10.25 0.125 10.5312 0.125 10.875Z"
            fill="white"
          />
        </svg>}
        <span className="ml-2">{prop.prop}</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx"
        style={{ display: "none" }} // Hides the file input
      />
      {prop.prop === "Download" && (
        <button
          onClick={handleDownload}
          className="bg-[#00ACC1] hover:bg-[#0497a9] text-white py-1 px-4 rounded-2xl flex items-center mx-2 mt-1"
          style={{ boxShadow: "2px 2px 2px  #191A23" }}
        >
          <span className="ml-2">Download</span>
        </button>
      )}
    </div>
  );
};

export default FileUpload;



// import React, { useRef } from "react";
// import axios from "axios";
// const FileUpload = (prop) => {
//   const fileInputRef = useRef(null);

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0]; // Get the selected file


//     if (file) {
//       // Create a new FormData instance and append the file
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await axios.post("https://file.io", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         alert(`File uploaded successfully. Download URL: ${response.data.link}`);
//         alert(`Successfully stored in localstorage.`);

//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     }
//   };


//   return (
//     <div>
//       <button
//         onClick={handleButtonClick}
//         className="bg-[#00ACC1] hover:bg-[#0497a9] text-white py-1 px-4 rounded-2xl flex items-center mx-2 mt-1"
//         style={{ boxShadow: "2px 2px 2px  #191A23" }}
//       >
//         {prop.prop=="Upload" && <svg
//           width="13"
//           height="13"
//           viewBox="0 0 13 13"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M5.79232 9.33325V3.56034L3.95065 5.402L2.95898 4.37492L6.50065 0.833252L10.0423 4.37492L9.05065 5.402L7.20898 3.56034V9.33325H5.79232ZM2.25065 12.1666C1.86107 12.1666 1.52768 12.028 1.25048 11.7508C0.97329 11.4736 0.834457 11.14 0.833984 10.7499V8.62492H2.25065V10.7499H10.7507V8.62492H12.1673V10.7499C12.1673 11.1395 12.0287 11.4731 11.7515 11.7508C11.4743 12.0285 11.1407 12.1671 10.7507 12.1666H2.25065Z"
//             fill="white"
//           />
//         </svg>}
//         {prop.prop=="Download" &&<svg
//           width="9"
//           height="12"
//           viewBox="0 0 9 12"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M7.36875 4.625H6.375V1.5C6.375 1.15625 6.09375 0.875 5.75 0.875H3.25C2.90625 0.875 2.625 1.15625 2.625 1.5V4.625H1.63125C1.075 4.625 0.79375 5.3 1.1875 5.69375L4.05625 8.5625C4.3 8.80625 4.69375 8.80625 4.9375 8.5625L7.80625 5.69375C8.2 5.3 7.925 4.625 7.36875 4.625ZM0.125 10.875C0.125 11.2188 0.40625 11.5 0.75 11.5H8.25C8.59375 11.5 8.875 11.2188 8.875 10.875C8.875 10.5312 8.59375 10.25 8.25 10.25H0.75C0.40625 10.25 0.125 10.5312 0.125 10.875Z"
//             fill="white"
//           />
//         </svg>}

//         <span className="ml-2">{prop.prop}</span>
//       </button>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept=".xlsx" 
//         style={{ display: "none" }} // Hides the file input
//       />
//     </div>
//   );
// };

// export default FileUpload;
