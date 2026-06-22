import ListBooks from "./components/ListBooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="listBooks" element={<ListBooks />} />
          {/* <Route path="profile/:id" element={<ProfilePage />} /> */}
          <Route path="logout" element={<LogoutButton />} />
          {/* <Route path="suggested-books" element={<SuggestedBooks />} /> */}
          {/* <Route path="book-details/:id" element={<BookDetails />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
