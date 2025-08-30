import React, { useEffect, useState } from 'react'
import html2pdf from 'html2pdf.js';
import { CircularProgress, Modal } from '@mui/material';
const PrintModal = ({isPrint, handleClose, printRef, mainDiv, loading, setLoading}) => {
    useEffect(()=>{
          const timeOut = setTimeout(() => {
              convertToPDF("a4", printRef.current)
          }, 500);
          return ()=>{
            clearTimeout(timeOut)
          }
    },[])

      const customLogger = {
        log: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {}
      };
      const [pdfData, setPdfData] = useState(null);
      const convertToPDF = async (size, html) => {
        setLoading(true)
        const element = await html;
        const opt = {
          margin:       0.1,
          filename:     `myPdf.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, logging: false, logger: customLogger },
          jsPDF:        { unit: 'mm', format: size==="thermal"?[225,610]:size, orientation: 'portrait' }
        };
        const pdf = await html2pdf().from(element).set(opt).outputPdf('datauristring')
        try{
          setPdfData(pdf)
          setLoading(false)
        }catch(err){
          setLoading(false)
          setPdfData(pdf)
        }
      };
  return (
    <Modal
    keepMounted
    open={isPrint}
    onClose={handleClose}
  >
    <div
      style={{
        width:'60%',
        height:'100%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'start',
        alignItems: 'center',
        borderRadius: '10px',
        background:'#f7f7f7',
        outline: 'none'
      }}
      className='mx-auto'
    >
      <div className='p-6 d-flex justify-content-center align-items-center' style={{width:'100%', height:'50px', background:'', position:'sticky', top:'0px', background:'rgb(50, 54, 57)'}}>

        
      </div>
      <div className='d-flex justify-content-center' style={{background:'#fff', width:'100%', height:'100%',overflowY:'scroll'}}>
       <div className='w-100' ref={printRef}> {mainDiv}</div>
      </div>
      <div onClick={handleClose} style={{position:'absolute', bottom:'10px', right:'15px', cursor:'pointer'}} className=''>
        <i className="fa-solid fa-xmark fs-2"></i>
      </div>
      {loading &&
        <div className='d-flex h-100 w-100 align-items-center justify-content-center'>
          <CircularProgress size={50} color="primary" variant="indeterminate" />
        </div>
      }
      {!loading && 
        <embed
          title="PDF Viewer"
          src={pdfData}
          width="100%"
          height="800px"
        />
      }
    </div>
  </Modal>

  )
}

export default PrintModal