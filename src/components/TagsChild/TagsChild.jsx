import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import style from "./TagsChild.module.scss";

function TagsChild() {
    let [searchParams, setSearchParams] = useSearchParams();
    let group = searchParams.get("group");

    let Params = useParams();

    var [content, setContents] = useState([]);
    let [page, setPage] = useState(0);
    var [loadbot, setLoadbot] = useState(true);
    var flag = true;

    async function getContents(key = "theme", page = 0) {
        try {
            let url = `/api/tag-groups/${key}?lang=zh-Hans&platform=web&device=desktop&limit=9&offset=${page}`;
            let res = await axios.get(url);
            console.log(res);
            if (res.data.data.items.length == 0) {
                setLoadbot(false);
                // return (flag = false);
            } else {
                flag = true;
                setContents((prev) => {
                    return [...prev, ...res.data.data.items];
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    function scrollhanlder() {
        let scrollTop = document.documentElement.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            if (flag) {
                flag = false;
                setPage((prev) => {
                    let nextPage = prev + 9;
                    getContents(group ? group : "theme", nextPage);
                    return nextPage;
                });
            }
        }
    }

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setLoadbot(true);
        setPage(0);
        if (group) {
            Promise.all([setContents([]), getContents(group)]);
        } else {
            Promise.all([setContents([]), getContents()]);
        }
        window.addEventListener("scroll", scrollhanlder);
        return () => {
            window.removeEventListener("scroll", scrollhanlder);
        };
    }, [group]);

    return (
        <div className={style.tagschild}>
            <div className="content">
                {content.length > 0 ? (
                    content.map((a, i) => (
                        <div className="item" key={i}>
                            {a.resources?.map((b, j) => (
                                <img key={j} src={b.image.medium} alt="" />
                            ))}
                            <div className="name">{a.name}</div>
                        </div>
                    ))
                ) : (
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Spin /> 加载中...
                    </div>
                )}
            </div>
            {loadbot && content.length > 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        width: "100%",
                        height: 40,
                    }}
                >
                    <Spin></Spin> 加载更多中...
                </div>
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        width: "100%",
                        height: 40,
                    }}
                >
                    没有更多了
                </div>
            )}
        </div>
    );
}

export default TagsChild;
