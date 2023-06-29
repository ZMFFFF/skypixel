import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";
import "./Home.scss";

function Home() {
    var [banners, setBanners] = useState([]); // 轮播图
    var [weights, setWeights] = useState([]);
    var [works, setWorks] = useState([]);

    async function getBanners() {
        let res = await axios.get(
            "/api/page-contents/skypixel_root_banner_top/banners?lang=zh-Hans&platform=web&device=desktop"
        );
        setBanners(res.data.data.items);
    }

    async function getWeights() {
        let res = await axios.get(
            "/api/geo-tags/weight?lang=zh-Hans&platform=web&device=desktop"
        );
        setWeights(res.data.data.items.slice(0, 6));
    }

    async function getWorks() {
        let res = await axios.get(
            "/api/topics/nature/works?lang=zh-Hans&platform=web&device=desktop&filter=featured:true&sort=hot&limit=16&offset=0"
        );
        console.log(res);
        setWorks(res.data.data.items);
    }

    useEffect(() => {
        getBanners();
        getWeights();
        getWorks();
    }, []);

    return (
        <>
            <div className="content">
                <Carousel
                    bool={true}
                    draggable
                    autoplay
                    style={{ margin: "40px auto" }}
                >
                    {banners.map((b, i) => (
                        <div key={i}>
                            <img
                                style={{ width: "100%", height: 345 }}
                                src={b.cover}
                                alt=""
                            />
                        </div>
                    ))}
                </Carousel>
                <div className="weights">
                    <div className="title">热门航拍点</div>
                    <div className="items">
                        {weights.map((w, i) => (
                            <div className="item" key={i}>
                                <div className="cover">
                                    <img src={w.image?.medium} alt="" />
                                </div>
                                <div>{w.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="swiper">
                <div className="head">
                    <div>精选</div>
                </div>
                <div className="modu">
                    <Carousel style={{}}>
                        {works.map((b, i) => (
                            <div key={i}>
                                <img
                                    style={{ width: "20%" }}
                                    src={b.image.medium}
                                    alt=""
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
}

export default Home;
