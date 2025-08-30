// config.js

const config = {
  // local server
  // BASE_URL: "http://localhost:8000", //local
  // CHAT_URL: "ws://localhost:8000/ws",//local
  // ETL_URL: "http://localhost:3001", // local
  
  //demo server
  // BASE_URL: "http://4.186.63.133/decision", // demo
  // CHAT_URL: "ws://4.186.63.133/decision/ws/", // demo
  // ETL_URL: "http://etl.innovationalofficesolution.com/", // demo

  //prod server
  // BASE_URL: "http://20.244.12.168", // prod
  // CHAT_URL: "ws://20.244.12.168/ws", // prod
  // ETL_URL: "http://etl-prod.innovationalofficesolution.com/", // prod

  //new server
  // BASE_URL: "http://4.213.225.66", // prod
  // CHAT_URL: "ws://4.213.225.66/ws", // prod
  // ETL_URL: "http://etl-prod.innovationalofficesolution.com/", // prod

  // secure server
  BASE_URL: "https://api-decisionpulse.innovationalofficesolution.com/", // prod
  CHAT_URL: "wss://api-decisionpulse.innovationalofficesolution.com/ws", // prod
  ETL_URL: "https://etl-prod.innovationalofficesolution.com/", // prod

  FRONTEND_URL: "http://localhost:3000",
}; 
export default config;
