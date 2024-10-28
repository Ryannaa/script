import fetch from "node-fetch";
export const startFetch = ()=>{

    fetch("https://api.m.jd.com/client.action?functionId=newBabelAwardCollection", {}).then(response => {
        // 检查响应是否成功
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // 解析响应为 JSON 格式
        return response.json();
    })
        .then(data => {
            // 处理获取到的数据
            console.log(new Date())
            console.log(data);
        })
        .catch(error => {
            // 处理请求错误
            console.error('Fetch error:', error);
        });

}