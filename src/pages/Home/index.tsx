import { Carousel } from "antd";
import { getBannerList } from '@/api'
import type { FC } from 'react'
import { useEffect, useState } from "react";
import "./index.scss";
import { BannerItem } from '@/api/interface'

const Home: FC = () => {
    const [bannersList, setBannersList] = useState<Array<BannerItem>>([]);

    const getData = async () => {
        try {
            const { data } = await getBannerList()
            setBannersList(data.items)
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <Carousel autoplay style={{ width: 1200, margin: "20px auto" }}>
            {bannersList.map((item: BannerItem, index: number) => (
                <div key={index}>
                    <img
                        style={{ width: "100%", height: 345 }}
                        src={item.cover}
                        alt="cover"
                    />
                </div>
            ))}
        </Carousel>
    );
}

export default Home;
