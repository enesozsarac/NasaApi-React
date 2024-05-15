import "./App.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Details" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
