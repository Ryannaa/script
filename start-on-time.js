import axios from 'axios';
import { startFetch } from './index.js';

// 常量配置
const OFFSET_MS = 30;                 // 提前触发的毫秒数
const TARGET_DATE = new Date(2024, 9, 27, 23, 34, 40) - OFFSET_MS; // 目标抢购时间
const MAX_ATTEMPTS = 100;              // 最大请求次数
const REQUEST_INTERVAL_MS = 20;       // 请求间隔（毫秒）
const TIME_UNTIL_TARGET = Math.max(0, TARGET_DATE - Date.now()); // 距离抢购时间的毫秒数

// 抢购请求逻辑
async function triggerPurchase() {
    try {
        const response = await axios.post('https://api.example.com/purchase', { item: 'item_id' });
        console.log('请求成功:', response.data);
    } catch (error) {
        console.error('请求失败:', error);
    }
}

// 设置抢购计时器
function initiatePurchase() {
    console.log('开始抢购！', new Date());

    let attempts = 0;
    const intervalId = setInterval(() => {
        if (attempts >= MAX_ATTEMPTS) {
            clearInterval(intervalId);
            console.log("抢购结束");
            return;
        }

        startFetch(); // 或者 triggerPurchase();
        attempts++;
    }, REQUEST_INTERVAL_MS);
}

// 开始抢购计时逻辑
if (TIME_UNTIL_TARGET > 0) {
    console.log(`距抢购时间: ${(TIME_UNTIL_TARGET / 1000).toFixed(2)} 秒`);
    setTimeout(initiatePurchase, TIME_UNTIL_TARGET);
} else {
    console.log("抢购时间已过，无法执行任务");
}
