import axios from "axios";
import { useEffect, useState } from "react";
import "./Explore.scss";
import loading from "../../assets/22.gif";

function Explore() {
    var [navs, setNavs] = useState([]);
    var [content, setContent] = useState([]);
    var [active, setActive] = useState(0);
    var [offset, setOffset] = useState(0);
    // var [flag, setFlag] = useState(true);
    var flag = true;

    async function getNav() {
        let res = await axios.get("/public/data/navs.json");
        // console.log(res.data.data.items);
        setNavs(res.data.data.items);
    }

    async function getContent(url, page = 0) {
        let res = await axios.get(`${url}offset=${page}`);
        console.log(res.data.data.items);
        if (res.data.data.items) {
            setContent((prev) => {
                return [...prev, ...res.data.data.items];
            });
            // setFlag(true);
            flag = true;
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
                console.log("123");
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
        flag = true;
        setActive(i);
        setOffset(() => {
            getContent(arr[i]);
            return 0;
        });
        setContent([]);
    }

    useEffect(() => {
        getNav();
        getContent(arr[0]);
        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <div className="explore">
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
                            <div className="item" key={i}>
                                <img src={a.image?.medium} alt="" />
                            </div>
                        ))
                    ) : (
                        <div style={{ width: 1600, textAlign: "center" }}>
                            <img style={{ width: 1000 }} src={loading} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Explore;
