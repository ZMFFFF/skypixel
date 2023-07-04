import { NavLink, Routes, Route } from "react-router-dom";
import routes from "./router/index";
import "./App.scss";
import logo from "./assets/logo-cn.00c32c62.svg";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <header>
                <img className="logo" src={logo} alt="" />
                <nav>
                    <NavLink to="/">首页</NavLink>
                    <NavLink to="/explore">探索</NavLink>
                    <NavLink to="/label">标签</NavLink>
                    <NavLink to="/cameraman">摄影师</NavLink>
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
                        {r.child &&
                            r.child.map((a, j) => (
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
