import React from 'react'
import CustomAccordian from '../CustomAccordian'
import { Switch } from '@mui/material'
import { alpha, styled } from '@mui/material'
import { UseDescriptiveContext } from '../../../../../../context/DescriptiveProvider'


const GeneralVisualTools = () => {

const {plotRecommendation, setPlotRecommendation, selectedPlot} = UseDescriptiveContext()
  return (
    <>
        <CustomAccordian 
            header={"Colors"}
            className="flex flex-col gap-2 px-3 py-2 bg-gray-200"
            containerClass="w-52"
        >
           

        </CustomAccordian>

    </>
  )
}

export default GeneralVisualTools

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "#095458",
    '&:hover': {
      backgroundColor: alpha("#095458", theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#095458",
  },
}));
