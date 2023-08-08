import { NavLink, Routes, Route } from "react-router-dom";
import routes from "./router/index";
import "./App.scss";
import logo from "./assets/logo-cn.00c32c62.svg";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";

function App() {
    var location = useLocation();
    console.log(location.pathname.split("/")[1]);

    return (
        <>
            <header>
                <img className="logo" src={logo} alt="" />
                <nav>
                    <NavLink to="/">首页</NavLink>
                    <NavLink to="/explore">探索</NavLink>
                    <NavLink to="/tags">标签</NavLink>
                    <NavLink
                        className={
                            location.pathname.split("/")[1] ==
                                "photographers" && "active"
                        }
                        to="/photographers/recommended"
                    >
                        摄影师
                    </NavLink>
                    <NavLink to="/hotevent">热门活动</NavLink>
                </nav>
                <div className="login">
                    <div>登录</div>
                    <div>注册</div>
                </div>
            </header>

            <Routes>
                {routes.map((r, i) => (
                    <Route path={r.path} element={r.element} key={i}>
                        {r.children &&
                            r.children.map((a, j) => (
                                <Route
                                    path={a.path}
                                    element={a.element}
                                    key={j}
                                ></Route>
                            ))}
                    </Route>
                ))}
            </Routes>
            <Footer />
        </>
    );
}

export default App;
