import { Collapse, Slider, styled} from "@mui/material";
import React, { useState } from "react";
import { BsDash } from "react-icons/bs";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FaAnglesDown, FaCaretDown, FaCaretRight } from 'react-icons/fa6';
const cardComp = ()=>{
  return(
    <div className="flex flex-col py-3">
      <div className="flex flex-col gap-2 pe-3">
        <p className="text-xs text-[#1F1F1F]">Show the database in the header when applicable</p>
        <div className="flex gap-4 items-center">
          <span className="font-bold text-xs">Yes</span>  
          <CustomSlider className="w-[70%!important]"  />
        </div>
      </div>
      <div className="flex flex-col gap-2 pe-3">
        <p className="text-xs text-[#1F1F1F]">Show related field when Card is collapsed</p>
        <div className="flex gap-4 items-center">
          <span className="font-bold text-xs">Yes</span>  
          <CustomSlider defaultValue={50} className="w-[70%!important]"  />
        </div>
      </div>
      <div className="flex flex-col gap-2 pe-3">
        <p className="text-xs text-[#1F1F1F]">Pin Related fields to top of cards</p>
        <div className="flex gap-4 items-center">
          <span className="font-bold text-xs">Yes</span>  
          <CustomSlider className="w-[70%!important]"  />
        </div>
      </div>
    </div>
  )
}
const data = [
    {
      name: 'Cards',
      component:cardComp
    },
  ];


const DirectoryTree = ({ treeData }) => {
  const [openDirs, setOpenDirs] = useState({});

  const handleToggle = (dirName) => {
    setOpenDirs((prev) => ({
      ...prev,
      [dirName]: !prev[dirName],
    }));
  };

  const renderTree = (nodes) =>
    nodes.map((node) => (
      <div key={node.name}>
        <div className='flex items-center px-4 gap-2 justify-start border-b py-3 cursor-pointer border-[#A9A9A9]' button onClick={() => handleToggle(node.name)}>
          <span className="">
             {openDirs[node.name] ? <FaCaretDown /> : <FaCaretRight />}
          </span>
          <span className='text-sm font-bold'>{node.name}</span>
        </div>
        <Collapse in={openDirs[node.name]} timeout="auto" unmountOnExit>
          <div className='pl-3 border-b border-[#A9A9A9]'>
            {<node.component />}
          </div>
        </Collapse>

      </div>
    ));

  return <div className='custom-scrollbar max-h-[620px] pb-4 overflow-y-auto'>{renderTree(treeData)}</div>;
};

const PropertiesTab = ({ toggleTab, isOpen }) => {
  return (
    <div className="h-full border border-[#A9A9A9] bg-[#F3F2F1]">
      {isOpen ? (
        <div className="flex flex-col w-52">
          <div className="flex justify-between items-center py-3 px-4 border-b border-[#A9A9A9] " onClick={toggleTab}>
            <span className="text-sm font-bold cursor-pointer">Properties</span>
            <FaAnglesRight
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col">
          <DirectoryTree treeData={data} />
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col w-10 cursor-pointer"
          onClick={toggleTab}
        >
          <div className="flex justify-center w-full h-full items-center gap-6 flex-col py-3 ">
            <FaAnglesLeft />
            <span className="text-sm font-bold rotate-90 w-full">
              Properties
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesTab;


const CustomSlider = styled(Slider)`
  color: #00acc1;
  height: 4px;

  & .MuiSlider-thumb {
    height: 15px;
    width: 15px;
    background-color: #00acc1;
    border: 2px solid currentColor;
    margin-top: 0px;
    margin-left: 0;

    &[data-index="1"] {
      margin-left: 0px; /* Specific adjustment for the right thumb */
    }

    &:focus,
    &:hover,
    &.Mui-active {
      box-shadow: inherit;
    }
  }

  & .MuiSlider-track {
    height: 4px;
    border-radius: 4px;
  }

  & .MuiSlider-rail {
    height: 4px;
    border-radius: 4px;
  }

  // & .MuiSlider-valueLabel {
  //   left: calc(-50% + 4px);
  // }
`;