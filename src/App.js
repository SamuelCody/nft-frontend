import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import store from "./redux/store";
import UserShop from "./pages/UserShop";

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<UserShop />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
