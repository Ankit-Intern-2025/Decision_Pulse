import React, { useState, useRef } from 'react';

const Accordion = ({ question, answer, isOpen, toggleAccordion }) => {
  const contentRef = useRef(null);
  // bg-[#e1e1e2] text-[#656565]
  return (
    <div className="">
      <button
        className={`w-full lg:w-4/5 flex justify-between items-center px-10 py-3 text-left ${isOpen ? 'bg-gray-300' : 'bg-gray-200'} rounded-t-lg `}
        onClick={toggleAccordion}
      >
        <p className="text-base font-medium text-black max-sm:text-sm">
          {question}
        </p>
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : 0 }}
      >
        <div className={`lg:w-4/5 px-10 pb-5 text-sm text-[#7c7c86] ${isOpen ? 'bg-gray-300' : 'bg-gray-200'} rounded-b-lg `}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
