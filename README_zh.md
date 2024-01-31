<p align="center">
  <a href="https://github.com/koynoyno/funnow-ci-automation/">
    <img width="200" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/b24a85c8-cebc-4203-8ddd-22536079c725">
  </a>
	
</p>
<div align="center">
	
[![Playwright 測試](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright.yml)

[英文](README.md) | 繁體中文

</div>

# FunNow Playwright 概念證明

## 描述

此概念證明使用 Playwright 測試 FunNow 網站所有語言的[預訂流程正常路徑](tests/booking.spec.ts)。每次提交和拉取請求時，它會自動在 GitHub Actions 上運行（CI/CD），並使用 `trcli` 自動將測試結果上傳到 TestRail 實例。

## 使用技術

- Playwright + [POM 設計模式](https://playwright.dev/docs/pom "POM 設計模式") + [參數化測試](https://playwright.dev/docs/test-parameterize "參數化測試") + [固件](https://playwright.dev/docs/test-fixtures)
- GitHub Actions + [快取](https://docs.github.com/zh/actions/using-workflows/caching-dependencies-to-speed-up-workflows) + [密碼](https://docs.github.com/zh/actions/security-guides/using-secrets-in-github-actions)
- [trcli](https://github.com/gurock/trcli "trcli")（自動將失敗測試的截圖上傳到 TestRail 實例）

## 開始使用

項目可以在本地運行。克隆文件夾並在根文件夹中創建 `.env` 文件，在文件內使用以下結構提供測試用戶的電子郵件和密碼：
```
MYFUNNOW_USERNAME=<email>
MYFUNNOW_PASSWORD=<password>
```
確保測試用戶已確認他們的電話號碼，已經申請了測試促銷代碼，並且已儲存信用卡資訊。

打開終端，`npm install`，之後你可以使用 `npx playwright test` 命令啟動測試。 測試套件針對暫存環境運行。

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

## ⚠️ 重要提示

為了使被測系統（system-under-test, SUT）更容易測試，強烈建議實施 `data-testid` 屬性。因為 SUT 沒有使用 `data-testid`，定位器變得 [脆弱](pages/branchPage.ts#L25) 和 [難以閱讀](pages/branchPage.ts#L19)，這使得自動化過程不必要地複雜，並浪費開發人員的時間。

## 問題與權衡

#### 為何頁面物件使用斷言？

雖然[不建議](https://martinfowler.com/bliki/PageObject.html)在頁面物件中使用斷言，但系統測試時行為有時可能不可預測。因此，為了簡化，這個概念驗證在頁面物件中使用了斷言。

#### 為何預訂流程測試不穩定？

存在一個問題，即如果使用者在相同時間進行太多預訂，他們將突然被重定向到選擇時間的頁面，而不是支付頁面（見下方截圖）。在這種情況下，網站沒有處理來自 API 的錯誤。

![image](https://github.com/koynoyno/funnow-ci-automation/assets/46102189/d4918b91-df3e-409a-bd56-a199c4a55adf)

API 錯誤如下：
```
{
	"code": 42,
	"message": "This Product Has Been Sold Out."
}
```

這個問題可以通過適當的拆解來解決，其中已製作的預訂將從數據庫中移除，但在實施這個概念驗證期間，我無法訪問數據庫。

## [bugs.spec.ts](tests/bugs.spec.ts) 檔案是什麼？

在測試過程中發現了幾個問題。

一些容易驗證，因此它們被實現在 `bugs.spec.ts` 檔案中。這些測試是[預期失敗的](https://playwright.dev/docs/api/class-test#test-fail-1)，除非相關的錯誤被修復。


## trcli 說明

每次 CI 運行後，測試結果會自動上傳到 TestRail。您可以在[這裡](.github/workflows/playwright.yml#L41-L53)找到相關的工作流程步驟。

成功測試運行的示例：

<img width="1531" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/532f9b3d-7523-4cc1-bf06-25e38078bb22"><br/><br/>

不成功測試運行的示例，錯誤描述和截圖附加在測試運行結果中：

<img width="1527" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/516fd9df-f186-4715-a878-864af2a8c940"><br/><br/>

由 `trcli` 自動創建的測試案例示例。請注意，測試案例可以使用 _自動化類型_ 欄位進行排序：

<img width="1526" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/ba3cedb7-d5b2-4aff-aaab-d472cf4244ea"><br/><br/>
