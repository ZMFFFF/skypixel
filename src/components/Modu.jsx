import axios from "axios";
import { Carousel } from "antd";
import { RightOutlined, EyeFilled, HeartOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
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
        let res = await axios.get(
            `/api/topics/${props.keywrod}/works?lang=zh-Hans&platform=web&device=desktop&filter=featured:true&sort=hot&limit=16&offset=0`
        );
        // console.log(group(res.data.data.items, 4));

        setData(group(res.data.data.items, 4));
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="modu">
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
                                    }}
                                    alt=""
                                />
                                <div className="xinxi">
                                    <div>{b.title}</div>
                                    <div>设备: {b.equipment.name}</div>
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
                                                src={b.user.avatar.medium}
                                                alt=""
                                            />
                                            <div>{b.user.name}</div>
                                        </div>
                                        <div className="user_r">
                                            {b.created_at}
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
