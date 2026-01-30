


// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import App from "./App.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
// import Home from "./components/Home.jsx";
// import Login from "./components/Login.jsx";
// import Signup from "./components/SignUp.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<App page={<Home />} />} />
//         <Route path="/login" element={<App  pageType="login" />} />
//         <Route path="/signup" element={<App page={<Signup />} />} />
//         <Route path="/profile" element={<App page={<ProfilePage />} />} />
//       </Routes>
//     </Router>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/SignUp.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App page={<Home />} />} />
          <Route path="/login" element={<App pageType="login" />} />
          <Route path="/signup" element={<App page={<Signup />} />} />
          <Route path="/profile" element={<App page={<ProfilePage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);

