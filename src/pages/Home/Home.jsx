import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";
import "./Home.scss";
import Modu from "../../components/Modu";

function Home() {
    var [banners, setBanners] = useState([]); // 轮播图
    var [weights, setWeights] = useState([]);

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

    useEffect(() => {
        getBanners();
        getWeights();
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
                <Modu name='自然' keywrod="nature" />
                <Modu name='城市' keywrod="city" />
                <Modu name='运动' keywrod="sport" />
                <Modu name='人物' keywrod="people" />
            </div>
        </>
    );
}

export default Home;
