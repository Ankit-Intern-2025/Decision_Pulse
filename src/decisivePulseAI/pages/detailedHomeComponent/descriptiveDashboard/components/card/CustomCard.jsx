import React from 'react'

const CustomCard = ({img, imgStyle, card, layout, textWrapper, labelName, labelValue}) => {
  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center react-grid-drag-handle" 
        style={{...layout, ...card}}
    >
        <div className='flex flex-col gap-2' style={textWrapper}>
          <div style={labelName}>Label</div>
          <div style={labelValue}>Label Value</div>
        </div>
        {img && 
            <img style={imgStyle} src={img} />
        }
    </div>
  )
}

export default CustomCard