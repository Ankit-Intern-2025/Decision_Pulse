import { CircularProgress } from '@mui/material'
import React from 'react'

const DashboardLoading = () => {
  return (
    <span className="text-white flex flex-col gap-3 items-center justify-center">
            <span>Loading Please wait...</span>
            <CircularProgress color="#fff" size={20} />
        </span>
  )
}

export default DashboardLoading