import React, { useEffect, useRef, useState } from 'react'
import HeaderPage from './components/HeaderPage'
import Tab1 from './components/Tab1'
import Tab3 from './components/Tab3'
import Tab2 from './components/Tab2'
import Tab4 from './components/Tab4'
import Tab5 from './components/Tab5'
import FooterPage from './components/FooterPage'
import PrintModal from './PrintModal'
import { getAnomalyData, getDescriptiveData, getDiagnosticData } from '../../../lib/initialApis/dashboardApi'

const ExportPdfTemp = ({mainDivRef, loader, setLoader}) => {
  const [anomaliesData, setAnomaliesData] = useState([])
  const [descriptiveData, setDescriptiveData] = useState({
    data:[],
    plotConfigs:[],
    cardData:{}
  })
  const [diagnosticData, setDiagnosticData] = useState([])
  const [prescriptiveData, setPrescriptiveData] = useState([])
  const [tab5Data, setTab5Data] = useState({
    plots:[], 
    data:[]
  })

  const fetchData = async ()=>{
    setLoader(true)
    const anomalyData = await getAnomalyData()
    const descriptiveData = await getDescriptiveData()
    const diagnosticData = await getDiagnosticData()
    try{
      setAnomaliesData(anomalyData.Anomalies)

      const recommendations = descriptiveData.plot_recommendation.plot;
      const configs = recommendations.map((plot) => ({
        title: `${plot.type[1]} by ${plot.type[0]}`,
        xKey: plot.type[0],
        yKey: plot.type[1],
        chartTypes: plot.kind,
      }));
      setDescriptiveData({
        data:descriptiveData.data,
        plotConfigs:configs,
        cardData:descriptiveData.final_clean_card
      })
      setDiagnosticData(diagnosticData.our_data)

    }catch(err){
      console.log("Error calling Api:   "+ JSON.stringify(err))
    }finally{
      setLoader(false)

    }
   
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <div>
      <div ref={mainDivRef} className='flex flex-col justify-center items-center'>
        <HeaderPage />
        <Tab1 anomaliesData={anomaliesData} />
        <Tab2 {...descriptiveData} />
        <Tab3 diagnosticData={diagnosticData} />
        <Tab4 prescriptiveData={prescriptiveData} />
        <Tab5 {...tab5Data} />
        <FooterPage />
      </div>
    </div>
  )
}

export default ExportPdfTemp