import dayjs from "dayjs"
import Swal from "sweetalert2"

const getFullscreenTarget = () => {
  return document.fullscreenElement || null;
};

export const errCodeAlert = (text, errCode)=>{
    return `${text} <span class="absolute py-4 px-4 bg-blue text-gray-400" style="top:0%; right:0%">${errCode||""}</span>`
}
export const FireAlert = (title, text, icon, errCode) => {
    Swal.fire({
        title: title,
        html: errCodeAlert(text, errCode),
        icon: icon,
        confirmButtonColor:"#00acc1",
        iconColor:"#00acc1",
        target: getFullscreenTarget()
    })
}
export const FireAlertWithCallback = (title, text, icon, errCode, callback) => {
    Swal.fire({
        title: title,
        html: errCodeAlert(text, errCode),
        icon: icon,
        confirmButtonColor:"#00acc1",
        iconColor:"#00acc1",
        target: getFullscreenTarget()
    }).then((result)=>{
      if(result.isConfirmed){
        callback();
      }
    })
}
export const FireAlertWithCallbackAndCancel = (title, text, icon, errCode, callback, successMessage, errorMessage) => {
  Swal.fire({
      title: title,
      html: errCodeAlert(text, errCode),
      icon: icon,
      confirmButtonColor:"#00acc1",
      iconColor:"#00acc1",
      showCancelButton:true,
      showLoaderOnConfirm:true,
      target: getFullscreenTarget(),
      preConfirm: async () =>{
        try {
          const response = await callback();
          if (!response?.status) {
            return Swal.showValidationMessage(`
              ${JSON.stringify(errorMessage)}
            `);
          }
          return response;
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
  }).then((result)=>{
    if(result.isConfirmed){
      Swal.fire({
        title: "Success",
        text:successMessage||"Action Completed",
        icon:"success",
        target: getFullscreenTarget()
      });
    }
  })
}

export const chartDataFormatter = function(value) {
    if (value.length > 10){ 
      if(value.length>20){
        return value.split(" ").join("\n").slice(0,20) + ".."
      }
      return value.split(" ").join("\n")
    }; 
    return value;
  }

export function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true; // Strict equality check

    if (obj1 === null || obj2 === null) return false; // If one is null, return false

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false; // Arrays must be the same length
        return obj1.every((item, index) => deepEqual(item, obj2[index])); // Recursively compare each element
    }

    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false; // If one is not an object, return false

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false; // Objects must have the same number of keys

    return keys1.every(key => keys2.includes(key) && deepEqual(obj1[key], obj2[key])); // Recursively compare key-value pairs
}

export const isDate = (value) =>
  dayjs(
    value,
    ["YYYY-MM-DD", "MM/DD/YYYY", "DD-MM-YYYY", "YYYY/MM/DD", "MMM D, YYYY"],
    true
  ).isValid();