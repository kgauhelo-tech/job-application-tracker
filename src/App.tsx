import "./App.css";
import Navbar from "./Navbar/Navbar";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <div className="content-container">
        {/* <Routes>
          <Route></Route>
        </Routes> */}
        <Navbar />
      </div>
    </>
  );
}

export default App;
