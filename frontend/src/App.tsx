import ListBooks from "./components/ListBooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";
import CompleteYourProfile from "./components/CompleteProfile";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="complete-profile" element={<CompleteYourProfile />} />
          <Route path="listBooks" element={<ListBooks />} />
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="logout" element={<ProtectedRoute><LogoutButton /></ProtectedRoute>} />
          {/* <Route path="suggested-books" element={<SuggestedBooks />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
