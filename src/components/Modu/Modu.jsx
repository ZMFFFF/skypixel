import axios from "axios";
import { Carousel } from "antd";
import { RightOutlined, EyeFilled, HeartOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import "./Modu.scss";

function Modu(props) {
    var [data, setData] = useState([]);

    var group = (array = [], subGroupLength = 0) => {
        let index = 0;
        const newArray = [];
        while (index < array.length) {
            newArray.push(array.slice(index, (index += subGroupLength)));
        }
        return newArray;
    };

    async function getData() {
        try {
            let url = `/api/topics/${props.keywrod}/works?lang=zh-Hans&platform=web&device=desktop&filter=featured:true&sort=hot&limit=16&offset=0`;
            if (props.name == "签约摄影师")
                url =
                    "/api/photographers/contract-works?lang=zh-Hans&platform=web&device=desktop&limit=16&offset=0";
            let res = await axios.get(url);
            setData(group(res.data.data.items, 4));
        } catch (error) {
            getData();
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="modu">
            {data.length > 0 && (
                <div className="evenmore">
                    <div style={{ fontSize: 20 }}>{props.name}</div>
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
            )}

            <Carousel dotPosition={"top"} style={{ margin: "50px 0" }}>
                {data.map((a, i) => (
                    <div className="items" key={i}>
                        {a.map((b, j) => (
                            <div className="item" key={j}>
                                <img
                                    src={b.image.medium}
                                    style={{
                                        width: "100%",
                                        height: "190px",
                                        objectFit: 'cover'
                                    }}
                                    alt=""
                                />
                                <div className="xinxi">
                                    <div className="title">{b.title}</div>
                                    <div
                                        style={{ fontSize: 12, color: "#999" }}
                                    >
                                        设备:{" "}
                                        <span className="equipment">
                                            {b.equipment.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <EyeFilled
                                                style={{
                                                    color: "#838385",
                                                    marginRight: 5,
                                                }}
                                            />
                                            {b.view_count}
                                        </span>
                                        <span>
                                            <HeartOutlined
                                                style={{
                                                    color: "#838385",
                                                    margin: 5,
                                                }}
                                            />
                                            {b.like_count}
                                        </span>
                                    </div>
                                    <div className="user">
                                        <div className="user_l">
                                            <img
                                                className="avatar"
                                                src={b.user.avatar.medium}
                                                alt=""
                                            />
                                            <div className="name">
                                                {b.user.name}
                                            </div>
                                        </div>
                                        <div className="user_r">
                                            {dayjs(
                                                b.created_at.slice(0, 10)
                                            ).format("YYYY年M月MM日")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
export default Modu;
