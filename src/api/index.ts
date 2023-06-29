import httpRequest from './reqeust'
import { BannerItem } from './interface'

/**
 * @description 获取首页 banner 图片
 */
export function getBannerList() {
    return httpRequest.get<{ data: { items: Array<BannerItem> } }>(`/page-contents/skypixel_root_banner_top/banners?lang=zh-Hans&platform=web&device=desktop`);
}