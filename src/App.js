import { Routes, Route, useLocation } from "react-router-dom";
import { Error404, Home, Login, Register, SinglePost } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <main className="app">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<SinglePost />} />

          {/* Not found page */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </main>
  );
}

export default App;
