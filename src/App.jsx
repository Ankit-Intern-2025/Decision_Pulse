import Home from "./decisivePulseAI/pages/home";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Login from "./decisivePulseAI/pages/login";
import "./index.css";
import About from "./decisivePulseAI/pages/about";
import Signup from "./decisivePulseAI/pages/signup";
import ChatWindow from "./decisivePulseAI/components/ChatWindow";
import { useState, useEffect } from "react";
import ChatbotIcon from "./decisivePulseAI/components/ChatbotIcon";
import ProtectedRoute from "./decisivePulseAI/components/ProtectedRoute";
import Overview from "./decisivePulseAI/pages/developer/component/overview";
import NewTileCreator from "./decisivePulseAI/pages/developer/component/newTileCreator";
import DetailedHomeCard from "./decisivePulseAI/pages/detailedHomeCard";
import { UseContext } from "./context/ContextProvider";
import Research from "./decisivePulseAI/pages/research/research";
import Reserachdetail from "./decisivePulseAI/pages/research/Reserachdetail";
import Healthcare from "./decisivePulseAI/pages/research/helathcare/Healthcare";

import RealState  from "./decisivePulseAI/pages/research/Realstate/Realstate";
import Pharma from "./decisivePulseAI/pages/research/Pharma/Pharma"

import Oilandgas from "./decisivePulseAI/pages/research/OIlgas/Oilgas";
import ActivateUser from "./decisivePulseAI/pages/authentication/ActivateUser";

import FMCG from "./decisivePulseAI/pages/research/Fmcg/Fmcg";
import Retail  from "./decisivePulseAI/pages/research/Retail/Retail";
import Agriculture  from "./decisivePulseAI/pages/research/Agriculture/Agriculture";
import Bfsi from "./decisivePulseAI/pages/research/Bfsi/Bfsi";

import Admin from './decisivePulseAI/pages/admin/Admin'
import ResearchDashboard from "./decisivePulseAI/pages/research/ResearchDashboard";
import DescriptiveProvider from "./context/DescriptiveProvider";
import ResearchHome from "./decisivePulseAI/pages/research/ResearchHome";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };


  // useEffect(() => {
  //   // getSchema()
  //   const handleMessage = (event) => {
  //     // Optionally check event.origin for security
  //     if (event.data.type === "DATA_FROM_IFRAME") {
  //       setIframeData(event.data.data);
  //       sessionStorage.setItem("etlData", JSON.stringify(event.data.data))
  //       console.log("Data received from iframe:", event.data.data); //one more thing comes here
  //       navigate(
  //         `/home/${module_id}/new-tile-create/new/modelling`
  //       );
  //     }
  //   };

  //   // window.addEventListener("message", handleMessage);

  //   return () => {
  //     // window.removeEventListener("message", handleMessage);
  //   };
  // }, []);

  let globalSchemaData = null;
  const getSchema = () => {
    const datasourceId = '29a0b4a3-f32a-45d8-953c-647beb03c770'; // Your datasourceId
    const url = `http://127.0.0.1:8000/etl/get-schema/${datasourceId}`; // Endpoint URL with datasourceId as a URL parameter

    fetch(url, {
      method: 'GET', // HTTP method
      headers: {
        'Accept': 'application/json', // Expected response type is JSON
      },
    })
      .then(response => {
        if (!response.ok) {
          // If the response is not OK, throw an error
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Response Data:', data); // Log the complete response
    
        // Extract and parse the schema field from the response
        const schemaString = data.schema; // 'schema' is a string containing JSON data
    
        try {
          // Convert the schema string into a JSON object
          globalSchemaData = JSON.parse(schemaString);
    
          console.log('Parsed Schema Data:', globalSchemaData); // Log the parsed schema
        } catch (error) {
          console.error('Error parsing schema data:', error);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error); // Handle any errors
      });

  }

  return (
    <>
      {/* Chatbot Icon and Window */}
      <ChatbotIcon toggleChat={toggleChat} />
      {isChatOpen && <ChatWindow closeChat={toggleChat} />}
      {/* App Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate-user/:token" element={<ActivateUser />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

            <Route
          path="/secondary-research"
          element={
            <ProtectedRoute>
              <Research />
            </ProtectedRoute>
          }
        />
           <Route
          path="/auto-mobile"
          element={
            <ProtectedRoute>
              <Reserachdetail  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/research"
          element={
            <ProtectedRoute>
              <ResearchHome  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/research/:domain"
          element={
            <ProtectedRoute>
              <ResearchDashboard  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/real-estate"
          element={
            <ProtectedRoute>
              <RealState  />
            </ProtectedRoute>
          }
        />

<Route
          path="/pharma"
          element={
            <ProtectedRoute>
              <Pharma  />
            </ProtectedRoute>
          }
        />

<Route
          path="/fmcg"
          element={
            <ProtectedRoute>
              <FMCG  />
            </ProtectedRoute>
          }
        />

<Route
          path="/oilandgas"
          element={
            <ProtectedRoute>
              <Oilandgas />
            </ProtectedRoute>
          }
        />

<Route
          path="retail-ecommerce"
          element={
            <ProtectedRoute>
              <Retail  />
            </ProtectedRoute>
          }
        />


         <Route
          path="/healhcare-industry"
          element={
            <ProtectedRoute>
             <Healthcare />
            </ProtectedRoute>
          }
        />

       <Route
          path="/agriculter-and-food-processing"
          element={
            <ProtectedRoute>
              <Agriculture />
            </ProtectedRoute>
          }
        />

        <Route
        path="/bfsi"
          element={
            <ProtectedRoute>
              <Bfsi />
            </ProtectedRoute>
          }
        />

        <Route
          path="overview/:module_id/:id"
          element={
            <ProtectedRoute>
              {/* <MyDetails /> */}
              <DescriptiveProvider>
                <DetailedHomeCard />
              </DescriptiveProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview/:module_id"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="home/:module_id/new-tile-create/*"
          element={
            <ProtectedRoute>
              <NewTileCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-decision-pulse-ai"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />


      </Routes>
    </>
  );
};

export default App;
