## AI 補助資源一頁式網頁

由各部會所提供的 js 檔，讀入所有 AI 補助資源，再由本一頁式網頁動態列出
1. 部署時，請將 index.html、script.js、style.css 三支檔案，全數放至本機路徑
2. 請於 index.html 中，填入所有 AI 補助資源的 JS 網址。
3. 請於 script.js 中，填入所有 AI 補助資源的 JS 變數名稱。

### Demo

目前是用 pm2 於沃草測試機上 Demo，可用以下指令運行

`pm2 start python3 --name 2030ai --  -m http.server 8080`
