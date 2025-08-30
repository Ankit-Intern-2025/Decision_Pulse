import Nav from "../components/detailedNav";
import Card from "../components/about/card";
import Bg from "../resources/about/Home17.png";
import Clock from "../resources/about/image50.png";
import AnimatedImage1 from "../resources/about/animationImage_1.png";
import AnimatedImage2 from "../resources/about/animationImage_2.png";
import AnimatedImage3 from "../resources/about/animationImage_3.png";
import Features1 from "../resources/about/features1.png";
import WhyChooseImg from "../resources/about/whyChooseImg.png";
import KeyAdvantageImg from "../resources/about/keyAdvantagesImg.jpg";
import Logo from "../resources/login/Logo.png";
import Accordion from "../components/about/accordion";
import Footer from "../components/detailedFooter";
import Carousel from '../components/about/carousel'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import FeaturesImage1 from '../resources/about/1.png'
import FeaturesImage2 from '../resources/about/2.png'
import FeaturesImage3 from '../resources/about/3.png'
import FeaturesImage4 from '../resources/about/4.png'
import FeaturesImage5 from '../resources/about/5.png'
import FeaturesImage6 from '../resources/about/6.png'
import FeaturesImage7 from '../resources/about/7.png'

const Main = () => {
  const salientFeaturesData = [
    {
      heading: "Dual Data Upload",
      text: "Upload your business data and competitor data separately to enable accurate analysis and comparison.",
      isOpen: "true",
      image: FeaturesImage1,
    },
    {
      heading: "Data Harmonization",
      text: "Automatically harmonize datasets, even when competitor data includes multiple clients, for seamless analysis.",
      isOpen: "false",
      image: FeaturesImage2,
    },
    {
      heading: "Comprehensive Analysis",
      text: "Generate four key types of analysis—Descriptive, Diagnostic, Predictive, and Prescriptive—based on your uploaded data.",
      isOpen: "false",
      image: FeaturesImage5,
    },
    {
      heading: "Visual Insights with Charts",
      text: "Descriptive, Diagnostic, and Predictive analytics are displayed through interactive and easy-to-understand charts.",
      isOpen: "false",
      image: FeaturesImage6,
    },
    {
      heading: "Actionable Prescriptive Analysis",
      text: "Receive clear recommendations and action items based on the analysis to improve your business strategy.",
      isOpen: "false",
      image: FeaturesImage3,
    },
    {
      heading: "Export to PPT or PDF",
      text: "Export your full analysis or individual reports in PowerPoint or PDF format for easy sharing and presentation.",
      isOpen: "false",
      image: FeaturesImage4,
    },
    {
      heading: "Competitor-Specific Data Segmentation",
      text: "Handle competitor data with multiple clients through dedicated competitor columns, ensuring tailored comparisons.",
      isOpen: "false",

      image: FeaturesImage7,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0); // Track the index of the currently open accordion

  const toggleAccordion = (index) => {
    // If the clicked accordion is already open, close it; otherwise, open the clicked one
    setActiveIndex(index);
  };

  const slides = [
    AnimatedImage3,
    AnimatedImage2,
    AnimatedImage1
  ]

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
  }, []);
  return (
    <>
      {/* <h1>about</h1> */}
      <div className="bg-gray-200 max-w-[1500px] mx-auto">
        <Nav prop="About Decision Pulse AI" />
        <section className="mt-10">
          <div className="italic text-center">Gen-AI-Powered</div>
          <h1 className="text-center font-extrabold text-xl md:text-3xl w-[85%] md:w-2/3 mx-auto mt-3">
            Unlock Actionable Insights From Your Data And Outpace The
            Competition
          </h1>
          <div className="text-center mt-3">
            Easily Analyze and Compare Your Data for Smarter Decisions
          </div>
          <div className="">


            <Carousel images={slides} />

          </div>
        </section>

        <section className="w-[85%] mx-auto py-10">
          <div className="md:flex justify-between">
            <Card
              svg="M31.9769 25.4634C31.9839 25.276 31.9605 25.0886 31.9076 24.9085L28.352 14.3719C28.2341 14.0224 28.008 13.7183 27.7055 13.5027C27.4031 13.2872 27.0396 13.171 26.6667 13.1707H19.5556V16.6829H25.3849L28.3484 25.4634H3.65156L6.61511 16.6829H12.4444V13.1707H5.33333C4.96037 13.171 4.59694 13.2872 4.29448 13.5027C3.99202 13.7183 3.76586 14.0224 3.648 14.3719L0.0924445 24.9085C0.039479 25.0886 0.0160712 25.276 0.0231111 25.4634C1.98682e-08 25.4634 0 34.2439 0 34.2439C0 34.7096 0.187301 35.1563 0.520699 35.4857C0.854097 35.815 1.30628 36 1.77778 36H30.2222C30.6937 36 31.1459 35.815 31.4793 35.4857C31.8127 35.1563 32 34.7096 32 34.2439C32 34.2439 32 25.4634 31.9769 25.4634ZM23.1111 11.246C23.5716 11.246 24.032 11.0792 24.368 10.7491C24.7013 10.4198 24.8885 9.97317 24.8885 9.50751C24.8885 9.04186 24.7013 8.59527 24.368 8.26595L16 0L7.632 8.26595C7.29872 8.59527 7.11149 9.04186 7.11149 9.50751C7.11149 9.97317 7.29872 10.4198 7.632 10.7491C7.968 11.081 8.42844 11.246 8.88889 11.246C9.34933 11.246 9.80978 11.081 10.1458 10.7491L14.2222 6.72234V18.439C14.2222 18.9048 14.4095 19.3514 14.7429 19.6808C15.0763 20.0101 15.5285 20.1951 16 20.1951C16.4715 20.1951 16.9237 20.0101 17.2571 19.6808C17.5905 19.3514 17.7778 18.9048 17.7778 18.439V6.72234L21.8542 10.7491C22.1904 11.072 22.6422 11.2506 23.1111 11.246Z"
              heading="Effortless Data Upload"
              text="Easily upload and harmonize your business and competitor data for seamless analysis."
            />
            <div
              className="rounded-lg flex bg-white p-3 md:w-1/2 lg:w-1/3 transition-transform duration-300 hover:scale-105 max-md:mt-5 md:ml-5 my-auto"
              style={{ boxShadow: "1px 1px 10px -2px black " }}
            >
              <div className="flex items-center">
                <svg
                  width="32"
                  height="36"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6167 10.64C10.148 11.1088 9.8847 11.7446 9.8847 12.4075C9.8847 13.0704 10.148 13.7062 10.6167 14.175L10.7283 14.2867C10.9605 14.519 11.2362 14.7033 11.5396 14.829C11.843 14.9547 12.1682 15.0195 12.4967 15.0195C12.8251 15.0195 13.1503 14.9547 13.4537 14.829C13.7572 14.7033 14.0328 14.519 14.265 14.2867L19.4567 9.095C19.6967 8.855 19.8783 8.57833 20 8.28167V21.6667C20 22.5507 19.6488 23.3986 19.0237 24.0237C18.3986 24.6488 17.5507 25 16.6667 25H3.33333C2.44928 25 1.60143 24.6488 0.976311 24.0237C0.351189 23.3986 0 22.5507 0 21.6667V8.33333C0 7.44928 0.351189 6.60143 0.976311 5.97631C1.60143 5.35119 2.44928 5 3.33333 5H16.4183C16.1934 5.11761 15.9877 5.26879 15.8083 5.44833L10.6167 10.64Z"
                    fill="#015F64"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.6965 1.30356C23.7741 1.38097 23.8357 1.47293 23.8777 1.57417C23.9197 1.67541 23.9413 1.78395 23.9413 1.89356C23.9413 2.00317 23.9197 2.11171 23.8777 2.21295C23.8357 2.31419 23.7741 2.40615 23.6965 2.48356L13.0898 13.0902C12.9336 13.2467 12.7215 13.3347 12.5004 13.3349C12.2793 13.335 12.0671 13.2473 11.9106 13.0911C11.7542 12.9348 11.6662 12.7228 11.666 12.5016C11.6659 12.2805 11.7536 12.0684 11.9098 11.9119L22.5165 1.30356C22.6728 1.14733 22.8847 1.05957 23.1056 1.05957C23.3266 1.05957 23.5385 1.14733 23.6948 1.30356"
                    fill="#015F64"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 0.833333C15 0.61232 15.0878 0.400358 15.2441 0.244078C15.4004 0.0877975 15.6123 0 15.8333 0H24.1667C24.3877 0 24.5996 0.0877975 24.7559 0.244078C24.9122 0.400358 25 0.61232 25 0.833333V9.16667C25 9.38768 24.9122 9.59964 24.7559 9.75592C24.5996 9.9122 24.3877 10 24.1667 10C23.9457 10 23.7337 9.9122 23.5774 9.75592C23.4211 9.59964 23.3333 9.38768 23.3333 9.16667V1.66667H15.8333C15.6123 1.66667 15.4004 1.57887 15.2441 1.42259C15.0878 1.26631 15 1.05435 15 0.833333Z"
                    fill="#015F64"
                  />
                </svg>
              </div>
              <div className="ml-5">
                <div className=" font-bold">Powerful Visual Analytics</div>
                <div className="text-[10px] xl:text-xs ">
                  Get descriptive,diagnostic insights through
                  interactive,easy-to-read charts.
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-center font-extrabold text-xl md:text-3xl  md:w-2/3 mx-auto mt-8">
            <span className="text-[#7c7c86]">
              Unlock Actionable Insights From
            </span>{" "}
            Your Data And Outpace The Competition
          </h1>
          <div className="w-full mx-auto mt-8 md:flex md:justify-center">
            <Card
              svg="M23.1111 0H2.88889C1.3 0 0 1.3 0 2.88889V23.1111C0 24.7 1.3 26 2.88889 26H23.1111C24.7 26 26 24.7 26 23.1111V2.88889C26 1.3 24.7 0 23.1111 0ZM7.22222 20.2222C6.42778 20.2222 5.77778 19.5722 5.77778 18.7778V14.4444C5.77778 13.65 6.42778 13 7.22222 13C8.01667 13 8.66667 13.65 8.66667 14.4444V18.7778C8.66667 19.5722 8.01667 20.2222 7.22222 20.2222ZM13 20.2222C12.2056 20.2222 11.5556 19.5722 11.5556 18.7778V17.3333C11.5556 16.5389 12.2056 15.8889 13 15.8889C13.7944 15.8889 14.4444 16.5389 14.4444 17.3333V18.7778C14.4444 19.5722 13.7944 20.2222 13 20.2222ZM13 13C12.2056 13 11.5556 12.35 11.5556 11.5556C11.5556 10.7611 12.2056 10.1111 13 10.1111C13.7944 10.1111 14.4444 10.7611 14.4444 11.5556C14.4444 12.35 13.7944 13 13 13ZM18.7778 20.2222C17.9833 20.2222 17.3333 19.5722 17.3333 18.7778V7.22222C17.3333 6.42778 17.9833 5.77778 18.7778 5.77778C19.5722 5.77778 20.2222 6.42778 20.2222 7.22222V18.7778C20.2222 19.5722 19.5722 20.2222 18.7778 20.2222Z"
              heading="Exportable Reports"
              text="Quickly export your analysis as PPT or PDF for easy sharing and presentation."
            />
          </div>
        </section>

        <section className="w-[85%] mx-auto pt-10 pb-5">
          <div
            className="flex flex-col-reverse lg:flex-row bg-[#f4f3ef] rounded-lg"
            style={{ boxShadow: "1px 1px 10px -3px black " }}
          >
            {/* div1 */}
            <div className="lg:w-[55%] p-5 sm:p-10 my-auto">
              <div className="text-sm text-[#7c7c86] font-bold">
                Watch How It Works In Action
              </div>
              <div className="text-2xl font-bold w-2/3 mt-1 text-[#373737]">
                <span>See the power of data </span>
                <span>driven insights unfold.</span>
              </div>
              <p className="text-sm mt-1 text-[#7c7c86] ">
                Watch how easy it is to upload your data, generate powerful
                insights, and export detailed reports. See how our platform
                transforms your business and competitor data into actionable
                analytics, helping you make smarter decisions quickly.
              </p>
            </div>
            {/* div2 */}
            <div className="lg:w-[45%] bg-black h-[350px] rounded-lg">.</div>
          </div>
        </section>

        <section className="w-[85%] mx-auto md:flex justify-between pb-10">
          <div
            className="md:w-[68%] h-auto rounded-lg flex items-end"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="p-7 lg:w-2/3">
              <h2 className="text-2xl font-bold text-white">
                <div>Get Started With Powerful</div>{" "}
                <div>Data Insights Today </div>
              </h2>
              <p className="text-white ">
                Upload your data and get instant insights to make smarter
                decisions. Start analyzing now!
              </p>
            </div>
          </div>
          <div
            className="md:w-[30%] bg-white rounded-lg p-5"
            style={{ boxShadow: "1px 1px 6px -3px black " }}
          >
            <img src={Clock} alt="" className="h-[67px] w-[67px]" />
            <div className="mt-3 max-lg:text-sm">
              Unlock the power of your data today! Upload, analyze, and compare
              your business and competitor data to gain actionable insights and
              make smarter decisions.
            </div>
            <Link to="/home">
              <button className="bg-[#e1e1e2] text-[#656565] px-4 py-2  rounded-3xl text-sm mt-5 hover:bg-[#095458] hover:text-white">
                Start Now
              </button>
            </Link>
          </div>
        </section>

        <section className=" w-[85%] mx-auto  py-10">
          <div>
            <h2 className="text-3xl font-bold text-center">
              <span className="text-[#7c7c68]">Salient</span> Features
            </h2>
            <p className="mx-auto text-center sm:w-2/3 lg:w-1/2 mt-2">
              Upload your data and get instant insights to make smarter
              decisions. Start analyzing now!
            </p>
          </div>
          <div className="flex flex-col-reverse lg:flex-row mt-10 ">
            {/* div1 */}
            <div className="lg:w-1/2 flex flex-col max-lg:mt-5">
              {salientFeaturesData.map((data, ind) => {
                return (
                  <Accordion
                    key={ind}
                    question={data.heading}
                    answer={data.text}
                    isOpen={activeIndex === ind} // Only open if the index matches the activeIndex
                    toggleAccordion={() => toggleAccordion(ind)} // Toggle accordion on click
                  />
                );
              })}
            </div>

            {/* div2 */}
            <div
              className="lg:w-1/2 py-10 bg-gray-200 rounded-lg flex items-center justify-center "
              style={{ boxShadow: "1px 1px 10px -5px black " }}
            >
              <img
                src={salientFeaturesData[activeIndex].image}
                alt=""
                className="h-[380px] object-contain w-[385px]"
              />
            </div>
          </div>
        </section>

        <section className="w-[85%] mx-auto  py-10">
          <div>
            <h2 className="text-3xl font-bold text-center">
              <span className="text-[#7c7c68]">Key Advantages</span> & why
              Choose Us?
            </h2>
            <p className="mx-auto text-center sm:w-2/3 lg:w-[38%] mt-2">
              Get actionable insights fast. See why our platform is your best
              choice for smarter decisions.
            </p>
          </div>
          <div className="lg:flex mt-10">
            <div
              className="bg-zinc-200 lg:w-[47%] rounded-lg"
              style={{ boxShadow: "1px 1px 10px -5px black " }}
            >
              <img
                src={KeyAdvantageImg}
                alt=""
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="p-5">
                <h3 className="font-bold">Key Advantages</h3>
                <p className="mt-3 text-sm">
                  Seamless Data Upload: Effortlessly upload both business and
                  competitor data for comprehensive analysis.
                </p>
                <p className="mt-3 text-sm">
                  Advanced Analytics: Access Descriptive, Diagnostic,
                  Predictive, and Prescriptive insights all in one platform.
                </p>
                <p className="mt-3 text-sm">
                  Interactive Visuals: Understand data trends with easy-to-read,
                  interactive charts for better decision-making.
                </p>
                <p className="mt-3 text-sm">
                  Exportable Reports: Share insights instantly by exporting
                  detailed reports in PPT or PDF format.
                </p>
                <p className="mt-3 text-sm">
                  Tailored Recommendations: Get actionable, data-driven
                  recommendations to optimize your business strategy.
                </p>
              </div>
            </div>
            <div className="w-[6%] flex items-center max-lg:hidden">
              <div
                className="w-full font-bold text-center bg-white px-2 py-2 rounded-3xl"
                style={{ boxShadow: "1px 1px 10px -3px black " }}
              >
                AND
              </div>
            </div>
            <div className="bg-[#016064] lg:w-[47%] rounded-lg max-lg:mt-5">
              <img
                src={WhyChooseImg}
                alt=""
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="p-5">
                <h3 className="font-bold text-white">Why Choose Us:</h3>
                <p className="mt-3 text-sm text-white">
                  User-Friendly Interface: Our platform is designed for
                  simplicity, making it easy for any user to upload data and
                  generate insights without hassle.
                </p>
                <p className="mt-3 text-sm text-white">
                  All-in-One Solution: From data harmonization to in-depth
                  analytics and report generation, we cover every step of the
                  analysis process.
                </p>
                <p className="mt-3 text-sm text-white">
                  Actionable Insights: Beyond the numbers, we provide
                  prescriptive analysis, giving you clear recommendations to
                  improve your business performance.
                </p>
                <p className="mt-3 text-sm text-white">
                  Flexible Export Options: Export your analysis in the format
                  that suits you best, making it easy to present and share your
                  findings with stakeholders.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-[85%] mx-auto pt-10 pb-20 ">
          <div
            style={{ boxShadow: "1px 1px 10px -5px black " }}
            className="bg-white rounded-2xl px-5 py-10 lg:flex justify-between"
          >
            {/* div1 */}
            <div className="w-[35%] sm:w-[50%] lg:w-[10%] flex items-center max-lg:mx-auto">
              <img src={Logo} alt="" className="" />
            </div>
            {/* div2 */}
            <div className="lg:w-[50%] lg:pl-6">
              <div className="text-xl sm:text-2xl font-extrabold text-[#373737] max-lg:text-center max-lg:mt-5">
                Take Control of Your Data and Make Smarter Decisions Today!
              </div>
              <p className="text-sm max-lg:text-center max-lg:mt-5">
                Turn your data into actionable insights. Analyze and compare
                easily to drive smarter decisions.
              </p>
            </div>
            {/* div3 */}
            <div className="lg:w-[30%] flex justify-center items-center">
              <Link to="/home">
                <button className="bg-[#e1e1e2] text-[#656565] px-4 py-2  rounded-3xl text-sm mt-5 hover:bg-[#095458] hover:text-white ">
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};
export default Main;
