import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routers />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
