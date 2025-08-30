const Main = ({ svg, heading, text }) => {
  return (
    <>
      <div
        className="rounded-lg flex bg-white p-3 md:w-1/2 lg:w-1/3 transition-transform duration-300 hover:scale-105 my-auto"
        style={{ boxShadow: "1px 1px 10px -2px black " }}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="36"
            viewBox="0 0 32 36"
            fill="none"
          >
            <path d={svg} fill="#015F64" />
          </svg>
        </div>
        <div className="ml-5">
          <div className=" font-bold">{heading}</div>
          <div className="text-[10px] xl:text-xs ">{text}</div>
        </div>
      </div>
    </>
  );
};

export default Main;
