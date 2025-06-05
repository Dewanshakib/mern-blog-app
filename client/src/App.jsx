import Navbar from "./common/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/userContext";
import NotFound from "./common/not-found";
import CreateBlog from "./pages/CreateBlog";
import { useBlog } from "./context/blogContext";
import BlogPage from "./pages/BlogPage";
import EditBlog from "./pages/EditBlog";

const App = () => {
  const { user, setUser } = useAuth();
  const { blogs } = useBlog();

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={user ? <CreateBlog /> : <Login/>} />
        <Route path="/blog/:id" element={user ? <BlogPage /> : <Login/>} />
        <Route path="/blog/edit/:id" element={user ? <EditBlog/> : <Login/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
