import { useState } from "react";
import style from "./Label.module.scss";
import { useEffect } from "react";
import { Spin } from "antd";
import axios from "axios";

function Label() {
    var navsArr = [
        { name: "题材", key: "theme" },
        { name: "风格", key: "style" },
        { name: "设备", key: "equipment" },
        { name: "地区", key: "region" },
    ];
    var flag = true;
    var [active, setActive] = useState(0);
    var [content, setContent] = useState([]);
    var [offset, setOffset] = useState(0);

    function changeNav(i) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setActive(() => {
            setContent([]);
            setOffset(0);
            getContent(navsArr[i].key);
            return i;
        });
    }

    async function getContent(key, page = 0) {
        let res = await axios.get(
            `/api/tag-groups/${key}?lang=zh-Hans&platform=web&device=desktop&limit=9&offset=${page}`
        );
        console.log(res);
        flag = true;
        if (res.data.data.items)
            setContent((prev) => [...prev, ...res.data.data.items]);
    }

    function scrollHandler() {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight + 200 >= scrollHeight) {
            if (flag) {
                // setFlag(false);
                flag = false;
                setOffset((prev) => {
                    let newprev = prev + 9;
                    getContent(navsArr[active].key, newprev);
                    return newprev;
                });
            }
        }
    }

    useEffect(() => {
        getContent(navsArr[0].key);

        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <div className={style.label}>
            <div className="navs">
                {navsArr.map((a, i) => (
                    <div
                        className={i == active ? "nav active" : "nav"}
                        key={i}
                        onClick={() => changeNav(i)}
                    >
                        {a.name}
                    </div>
                ))}
            </div>
            <div className="content">
                {content.length > 0 ? (
                    content.map((a, i) => (
                        <div className="item" key={i}>
                            {a.resources?.map((b, j) => (
                                <img
                                    key={j}
                                    src={b.image.medium}
                                    alt=""
                                    style={{ width: 145, height: 102 }}
                                />
                            ))}
                            <div className="name">{a.name}</div>
                        </div>
                    ))
                ) : (
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Spin />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Label;
