import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        proxy: {
            // 本地开发环境通过代理实现跨域
            // 正则表达式写法
            "/api": {
                target: "https://www.skypixel.com/api/v2", // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            "/vid": {
                target: "https://www.djivideos.com", // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/vid/, ""),
            },
        },
    },
});
