import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";
import "./Home.scss";

function Home() {
    var [banners, setBanners] = useState([]);

    function getBanners() {
        axios
            .get(
                "/api/page-contents/skypixel_root_banner_top/banners?lang=zh-Hans&platform=web&device=desktop"
            )
            .then((res) => {
                // console.log(res);
                setBanners(res.data.data.items);
            });
    }

    function getWeights() {
        axios
            .get(
                "/api/geo-tags/weight?lang=zh-Hans&platform=web&device=desktop"
            )
            .then((res) => {
                console.log(res);
            });
    }

    useEffect(() => {
        getBanners();
        getWeights();
    }, []);

    return (
        <Carousel autoplay style={{ width: 1200, margin: "20px auto" }}>
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
    );
}

export default Home;
