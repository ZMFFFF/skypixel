import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import style from "./Photographers.module.scss";

function Photographers() {

    return (
        <div className={style.photographers}>
            <div className="head">
                <div className="nav">
                    <NavLink to="/photographers/recommended">
                        推荐摄影师
                    </NavLink>
                    <NavLink to="/photographers/hot">热门摄影师</NavLink>
                    <NavLink to="/photographers/new">新晋摄影师</NavLink>
                    <NavLink to="/photographers/creator">签约摄影师</NavLink>
                </div>
            </div>
            <div className="content">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default Photographers;
