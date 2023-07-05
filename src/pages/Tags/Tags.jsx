import { useState } from "react";
import style from "./Tags.module.scss";
import { useEffect } from "react";
import { Spin } from "antd";
import axios from "axios";

import { useParams, useSearchParams, Link, Outlet } from "react-router-dom";

function Tags() {
    let [searchParams, setSearchParams] = useSearchParams();

  let key = searchParams.get('group');
  // console.log(searchParams.get('group'));

  return (
    <div className={style.Label}>
        <div className="head">
            <div className='nav'>
        <Link className={key == 'theme' || !key ? 'active' : ''} to="/tags?group=theme">题材</Link>
        <Link className={key == 'style' ? 'active' : ''} to="/tags?group=style">风格</Link>
        <Link className={key == 'equipment' ? 'active' : ''} to="/tags?group=equipment">设备</Link>
        <Link className={key == 'region' ? 'active' : ''} to="/tags?group=region">地区</Link>
      </div>
      </div>
      
      <div className='content'>
        <Outlet>
        </Outlet>
      </div>
    </div>
  )
}

export default Tags;
