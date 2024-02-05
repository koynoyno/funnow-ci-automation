<div align="center">

[English](README.md) | 繁體中文

</div>

## 開始使用

該項目可以在本地運行。克隆該倉庫並在 `playwright-typescript` 文件夾中創建一個 `.env` 檔案。在檔案中，使用以下結構提供一個測試用戶的電子郵件和密碼：

```
MYFUNNOW_USERNAME=<email>
MYFUNNOW_PASSWORD=<password>
```
確保測試用戶已確認他們的電話號碼。

打開一個終端機，運行 `npm install`，之後你可以使用 `npx playwright test` 命令啟動測試。測試套件針對暫存環境運行。 

## 專案結構
```
├── data # 各種測試數據
│   ├── auth.ts
│   ├── creditCards.ts
│   └── locales.ts
├── fixtures
│   ├── autoFixtures.ts # 自動化 fixtures, 全局 "beforeAll"
│   └── testrailScreenshot.fixture.ts # 失敗截圖自動上傳
├── pages # 頁面對象模型
│   ├── bookingFlow
│   ├── branchPage.ts
│   └── headerPage.ts
└── tests
    ├── booking.spec.ts # 預訂流程測試（正常路徑）
    ├── bugs.spec.ts # 網站現有錯誤
    └── helpers
        └── auth.setup.ts # 處理使用 API/UI 的授權邏輯
```