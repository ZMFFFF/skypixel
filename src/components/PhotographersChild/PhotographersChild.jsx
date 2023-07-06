import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Button, Pagination } from "antd";
import axios from "axios";
import style from "./PhotographersChild.module.scss";

function PhotographersChild() {
    var params = useParams();
    // console.log(params);

    var [content, setContent] = useState([]);
    var [offset, setOffset] = useState(0);
    var [totalitems, setTotalitems] = useState(0);
    var [ye, setYe] = useState(1);

    async function getContent(key, offset = 0) {
        try {
            let url = `/api/photographers/${key}?user_type=&lang=zh-Hans&platform=web&device=desktop&limit=20&offset=${offset}`;
            let res = await axios.get(url);
            // console.log(res.data.data);
            setContent(res.data.data.items);
            setTotalitems(res.data.data.total_items);
        } catch (err) {
            getContent(params.key, offset);
        }
    }

    function Changepage(page) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setContent([]);
        console.log(page);
        setYe(page);
        setOffset(params.key, page == 1 ? "0" : (page - 1) * 20);
        getContent(params.key, page == 1 ? "0" : (page - 1) * 20);
    }

    useEffect(() => {
        setYe(1);
        setContent([]);
        getContent(params.key);
    }, [params.key]);

    return (
        <div className={style.photographersChild}>
            <div className="items">
                {content.length > 0 ? (
                    content.map((a, i) => (
                        <div className="item" key={i}>
                            <div className="left">
                                <img
                                    className="avatar"
                                    src={a.avatar.medium}
                                    alt=""
                                />
                                <div className="xinxi">
                                    <div className="name">{a.name}</div>
                                    <div className="country">
                                        {a.country_name}
                                    </div>
                                    <div className="credit">
                                        <span>{a.credit_score} 声望 </span>
                                        <span>{a.follower_count} 粉丝 </span>
                                        <span>{a.work_count} 作品 </span>
                                    </div>
                                    <div className="like">
                                        <Button
                                            style={{
                                                width: 64,
                                                height: 32,
                                                marginTop: 10,
                                                backgroundColor: "#1088f2",
                                            }}
                                            type="primary"
                                        >
                                            关注
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                {a.works.map((b, j) => (
                                    <div className="works" key={j}>
                                        <img src={b.image.medium} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Spin /> 加载中...
                    </div>
                )}
            </div>
            {content.length > 0 && (
                <div style={{ textAlign: "center", margin: "40px 0 20px" }}>
                    <Pagination
                        showSizeChanger={false}
                        onChange={Changepage}
                        defaultCurrent={ye}
                        current={ye}
                        pageSize={20}
                        total={totalitems}
                    />
                </div>
            )}
        </div>
    );
}

export default PhotographersChild;
