import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedPage from "./pages/feed/FeedPage";
import AuthPage from "./pages/auth/AuthPage";
import PostPage from "./pages/post/PostPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Header from "./widgets/header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/post" element={<PostPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
