# expense-tracker
使用Node.js 和express、MongoDB 打造的記帳Web app

&nbsp;
## 功能介紹

* 使用者可以使用email 註冊
* 註冊失敗給與提示訊息
* 使用者必須登入之後 才能使用以下功能
* 使用者可以使用 facebook 登入
* 登入失敗、註冊失敗都有提示訊息
* 使用者可以新增自己的消費記錄並分類
* 使用者可以修改自己的消費記錄
* 使用者可以刪除自己的消費記錄
* 使用者能在首頁看到自己的消費總額
* 使用者能選擇分類，指顯示該分類的消費金額與內容

## 如何使用(安裝與執行)
1. 確認有安裝node.js 與npm跟MondoDB或者MongoDb雲端版 跟圖形化介面Robo3T
2. 將專案clone到本地
3. 在本地端開啟後透過終端機進入資料夾中
4. 在終端機輸入
   ```bash
   npm init
   ```
5. 參考 .env.exanple 建立 env檔案，並填入自己的資訊
6. 連線自己的Mongodb資料庫
7. 連先完成後 先跑腳本新增種子資料
   ```bash
   npm run seed
   ```
8. 開啟伺服器
   ```bash
   npm run dev
   ```
9. 當 terminal 出現以下字樣，表示伺服器已啟動完成
   ```bash
   server is running on localhost:3000
   mongodb connected
   ```
10. 打開瀏覽器網址列輸入 http://localhost:3000/ 可以看到本專案的網頁呈現

## 測試帳密（要先跑過種子資料才能使用）
帳號：
```bash
   user1@example.com
   ```
密碼：
```bash
   123
   ```