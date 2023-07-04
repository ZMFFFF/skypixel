import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Button, Modal } from "antd";
import style from "./Explore.module.scss";
import { useNavigate, Outlet } from "react-router-dom";

function Explore() {
    var [navs, setNavs] = useState([]);
    var [content, setContent] = useState([]);
    var [active, setActive] = useState(0);
    var [offset, setOffset] = useState(0);
    var [popoverData, setPopoverData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    var flag = true;

    var navigate = useNavigate();

    async function getNav() {
        let res = await axios.get("/public/data/navs.json");
        // console.log(res.data.data.items);
        setNavs(res.data.data.items);
    }

    async function getContent(url, page = 0) {
        let res = await axios.get(`${url}offset=${page}`);
        console.log(res.data.data.items);
        flag = true;
        if (res.data.data.items) {
            setContent((prev) => {
                return [...prev, ...res.data.data.items];
                // return prev.concat(res.data.data.items);
            });
            // setFlag(true);
        }
    }

    function scrollHandler() {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight + 5 >= scrollHeight) {
            if (flag) {
                // setFlag(false);
                flag = false;
                setOffset((prev) => {
                    let newprev = prev + 20;
                    getContent(arr[active], newprev);
                    return newprev;
                });
            }
        }
    }

    var arr = [
        "/api/works?lang=zh-Hans&platform=web&device=desktop&sort=hot&filter=featured:true&limit=20&",
        "/api/topics/nature/works?lang=zh-Hans&platform=web&device=desktop&sort=hot&filter=featured:true&limit=20&",
        "/api/topics/city/works?lang=zh-Hans&platform=web&device=desktop&sort=hot&filter=featured:true&limit=20&",
        "/api/topics/sport/works?lang=zh-Hans&platform=web&device=desktop&sort=hot&filter=featured:true&limit=20&",
        "/api/topics/people/works?lang=zh-Hans&platform=web&device=desktop&sort=hot&filter=featured:true&limit=20&",
        "/api/photographers/contract-works?lang=zh-Hans&platform=web&device=desktop&sort=hot&slug=creator_works&filter=featured:true&limit=20&",
    ];

    function tabnav(i) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        flag = true;
        setActive(i);
        setOffset(() => {
            getContent(arr[i]);
            return 0;
        });
        setContent([]);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setPopoverData([]);
    };

    async function xq(type, slug) {
        setIsModalOpen(true);
        console.log(type, slug);
        let url = `/api/photos/${slug}?lang=zh-Hans&platform=web&device=desktop&compatible=true`;
        if (type == "video") {
            url = `/api/videos/${slug}?lang=zh-Hans&platform=web&device=desktop`;
        }

        let res = await axios.get(url);
        console.log(res.data.data.item);
        setPopoverData(res.data.data.item);
    }

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        getNav();
        getContent(arr[0]);
        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <div className={style.explore}>
            <div className="head">
                <div className="navs">
                    {navs.map((a, i) => (
                        <div
                            onClick={() => tabnav(i)}
                            className={i == active ? "nav active" : "nav"}
                            key={i}
                        >
                            {a.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="content">
                <div className="items">
                    {content.length > 0 ? (
                        content.map((a, i) => (
                            <div
                                className="item"
                                onClick={() => xq(a.type, a.slug)}
                                key={i}
                            >
                                <img src={a.image?.medium} alt="" />
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: "center", width: 1400 }}>
                            <Spin></Spin> 加载中...
                        </div>
                    )}
                </div>
                <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    width={1200}
                    style={{ minWidth: 1000, minHeight: 700 }}
                >
                    <div className="cover" style={{textAlign: 'center'}}>
                        {popoverData.image ? (
                            <img
                                src={popoverData.image?.medium}
                                style={{
                                    maxWidth: "100%",
                                    height: 773,
                                    objectFit: "cover",
                                }}
                                alt=""
                            />
                        ) : (
                            <div style={{ height: 700 }}>
                                <Spin /> 加载中...
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Explore;
