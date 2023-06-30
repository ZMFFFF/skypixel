import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";
import { RightOutlined, EyeFilled, HeartOutlined } from "@ant-design/icons";
import "./Home.scss";
import Modu from "../../components/Modu/Modu";

function Home() {
    var [banners, setBanners] = useState([]); // 轮播图
    var [weights, setWeights] = useState([]);
    var [hotlable, setHotlable] = useState([]);

    var group = (array = [], subGroupLength = 0) => {
        let index = 0;
        const newArray = [];
        while (index < array.length) {
            newArray.push(array.slice(index, (index += subGroupLength)));
        }
        return newArray;
    };

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

    async function getHotlable() {
        let res = await axios.get(
            "/api/tags?lang=zh-Hans&platform=web&device=desktop&limit=24&offset=0"
        );
        setHotlable(group(res.data.data.items, 6));
    }

    useEffect(() => {
        getBanners();
        getWeights();
        getHotlable();
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
                                style={{
                                    width: "100%",
                                    height: 345,
                                    cursor: "pointer",
                                }}
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
                <Modu name="自然" keywrod="nature" />
                <Modu name="城市" keywrod="city" />
                <Modu name="运动" keywrod="sport" />
                <Modu name="人物" keywrod="people" />
                <Modu name="摄影师" />
                <div className="hotlable">
                    <div className="evenmore">
                        <div style={{ fontSize: 20 }}>热门标签</div>
                        <div
                            style={{
                                color: "#1088f2",
                                fontSize: "14px",
                                cursor: "pointer",
                            }}
                        >
                            更多
                            <RightOutlined />
                        </div>
                    </div>
                    <Carousel>
                        {hotlable.map((h, i) => (
                            <div className="items" key={i}>
                                {h.map((a, index) => (
                                    <div className="item" key={index}>
                                        <img src={a.image.medium} alt="" />
                                        <div className="name">{a.name}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    );
}

export default Home;
