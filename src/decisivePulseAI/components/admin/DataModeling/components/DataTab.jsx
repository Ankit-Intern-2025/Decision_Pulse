import { Collapse, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react'
import { BsDash } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa'
import { FaAnglesDown, FaAnglesLeft, FaAnglesRight, FaCaretDown, FaCaretRight, FaCaretUp, FaCircle, FaFile, FaFolder } from 'react-icons/fa6';
const data = [
    {
      name: 'Semantic model',
      isDirectory: true,
      children: [
        {
          name: 'Calculation groups',
          isDirectory: true,
          children: [
            { name: 'Header', isDirectory: false },
            { name: 'Footer', isDirectory: false },
          ],
        },
        {
          name: 'Cultures',
          isDirectory: true,
          children: [
            { name: 'Header', isDirectory: false },
            { name: 'Footer', isDirectory: false },
          ],
        },
        {
          name: 'Measures',
          isDirectory: true,
          children: [
            { name: 'Header', isDirectory: false },
            { name: 'Footer', isDirectory: false },
          ],
        },
        {
          name: 'Perspectives',
          isDirectory: true,
          children: [
            { name: 'Header', isDirectory: false },
            { name: 'Footer', isDirectory: false },
          ],
        },
        {
          name: 'Relationships',
          isDirectory: true,
          children: [
            { name: 'Header', isDirectory: false },
            { name: 'Footer', isDirectory: false },
          ],
        },
        {
          name: 'Roles',
          isDirectory: true,
          children: [
            { name: 'Header', isDirectory: false },
            { name: 'Footer', isDirectory: false },
          ],
        },
        {
          name: 'Tables',
          isDirectory: true,
          children: [
            { name: 'FMCG Dataset', isDirectory: false },
            { name: 'Sales', isDirectory: false },
          ],
        },
       
      ],
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
          <div className='px-3 ps-4 py-1 flex items-center justify-start' button onClick={() => node.isDirectory && handleToggle(node.name)}>
            <span className="mr-2">
              {node.isDirectory ? (
                openDirs[node.name] ? <FaCaretDown /> : <FaCaretRight />
              ) : (
                <BsDash/>
              )}
            </span>
            <span className='text-xs cursor-pointer'>{node.name} {node.isDirectory && `(${node.children.length})`}</span>
          </div>
          {node.isDirectory && (
            <Collapse in={openDirs[node.name]} timeout="auto" unmountOnExit>
              <div className='pl-3'>
                {renderTree(node.children)}
              </div>
            </Collapse>
          )}
        </div>
      ));
  
    return <div className='mt-3 custom-scrollbar max-h-[620px] pb-4 overflow-y-auto'>{renderTree(treeData)}</div>;
  };
const DataTab = ({isOpen, toggleTab}) => {
    const [selectedTab, setSelectedTab] = useState("Models")

  return (
    <div 
        className='h-full border border-[#A9A9A9] bg-[#F3F2F1] rounded-tr-lg rounded-br-lg'
    >
        {isOpen? (
            <div className='flex flex-col w-52'>
                <div className='flex justify-between items-center py-3 px-4 border-b border-[#A9A9A9] ' onClick={toggleTab}>
                    <span className='text-sm font-bold cursor-pointer'>Data</span>
                    <FaAnglesRight className='cursor-pointer h-4 w-4' />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col border-b border-[#A9A9A9] pb-4 p-4'>
                        <div className='flex gap-4 mb-3'>
                            {["Tables", "Models"].map((tab)=>{
                                return(
                                    <div 
                                        className={` ${selectedTab===tab?"border-[#007A7F] ":""} cursor-pointer border-b-4 text-xs font-bold`} 
                                        key={tab}
                                        onClick={()=>setSelectedTab(tab)}
                                    >
                                        {tab}
                                    </div>
                                )
                            })}

                        </div>
                        <div className='bg-[#E1DFDD] px-3 py-2 flex items-center justify-start gap-3'>
                            <FaSearch className='h-4 w-4' />
                            <input 
                                type='text' 
                                className='bg-transparent outline-none w-[80%] text-xs'
                                placeholder='Search'
                            />
                        </div>

                    </div>
                    <DirectoryTree treeData={data} />
                </div>
            </div>
        ):(
            <div className='flex flex-col w-10 cursor-pointer' onClick={toggleTab}>
                <div className='flex justify-center w-full h-full items-center gap-6 flex-col py-3 '>
                    <FaAnglesLeft className='h-4 w-4' />
                    <span className='text-sm font-bold rotate-90 w-full'>Data</span>
                </div>
            </div>
        )}
    </div>
  )
}

export default DataTab