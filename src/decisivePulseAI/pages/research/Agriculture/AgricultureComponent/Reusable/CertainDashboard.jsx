import React from 'react'


const CertainDashboard = ({title, children}) => {
    return (
      <div className="bg-[#006064] w-[99%] p-8 border-5 rounded-md border-[#FFB400]">
        <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {React.Children.map(children, (child, index) =>
          index === children.length - 1 ? (
            <div className="md:col-span-2 flex justify-center">
              <div className="w-1/2">{child}</div> {/* ✅ Wider width */}
            </div>
          ) : (
            child
          )
        )}
        </div>
      </div>
    );
}

export default CertainDashboard