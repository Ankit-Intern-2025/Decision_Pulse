import React from "react";

const DescriptiveFiltersLoading = () => {
  return (
    <div className="animate-pulse justify-between flex flex-col w-96 p-5 h-[100dvh] overflow-y-auto overflow-x-hidden">
        <div className="space-y-10">
                <div className="h-6 bg-gray-300 rounded w-1/3" />

            <div className="space-y-6">
                {[...Array(8)].map((_, index) => (
                <div key={index} className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div> {/* Label */}
                    <div className="h-4 bg-gray-300 rounded w-full"></div>{" "}
                    {/* Input 1 */}
                    <div className="h-4 bg-gray-200 rounded w-11/12"></div>{" "}
                    {/* Input 2 */}
                </div>
                ))}
            </div>
        </div>

      <div className="flex justify-between pt-4">
        <div className="h-10 w-24 bg-gray-300 rounded-md"></div>{" "}
        {/* Reset Button */}
        <div className="h-10 w-24 bg-gray-300 rounded-md"></div>{" "}
        {/* Apply Button */}
      </div>
    </div>
  );
};

export default DescriptiveFiltersLoading;
