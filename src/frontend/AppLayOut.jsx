import { useEffect, useState } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
} from "react-router-dom";

import login from "./login";
import NewPost from "./NewPost";
import Post from "./Post";
import PostList from "./PostList";
import ProtectedRoute from "./ProtectedRoutes";
import Stat from "./Stat";
import Home from "./Home";


function AppLayout() {
    const [user, setUser] = useState(null);
    const logOut = () => {
        setUser(null);
        alert("bạn đã đăng xuất thành công");
    }

    function NoMatch() {
        return (
            <div style={{ padding: 20 }}>
                <h2>404: Page Not Found</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
            </div>
        );
    }
    return (
        <>
            <nav style={{ margin: 10 }}>
                <Link to="/" style={{ padding: 5 }}> Home </Link>
                <Link to="/posts" style={{ padding: 5 }}> Posts </Link>
                <Link to="/about" style={{ padding: 5 }}> About </Link>
                <span> | </span>

                {user && (
                    <>
                        <Link to="/stats" style={{ padding: 5 }}> Stats </Link>
                        <Link to="/newpost" style={{ padding: 5 }}> New Post </Link>
                        <span
                            onClick={logOut}
                            style={{ padding: 5, cursor: 'pointer' }}
                        >
                            Logout
                        </span>
                    </>
                )}

                {!user && <Link to="/login" style={{ padding: 5 }}> Login </Link>}
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />}>
                    <Route index element={<PostLists />} />
                    <Route path=":slug" element={<Post />} />
                </Route> <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/stats" element={<ProtectedRoute
                    user={user}><Stats /></ProtectedRoute>} />
                <Route path="/newpost" element={<ProtectedRoute
                    user={user}><NewPost /></ProtectedRoute>} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
}

export default AppLayout;