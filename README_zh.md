<p align="center">
  <a href="https://myfunnow.com/">
    <img width="200" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/b24a85c8-cebc-4203-8ddd-22536079c725">
  </a>
	
</p>
<div align="center">
	
[![Playwright Tests (TypeScript)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-typescript.yml/badge.svg)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-typescript.yml) [![Playwright Tests (Python)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-python.yml/badge.svg)](https://github.com/koynoyno/funnow-ci-automation/actions/workflows/playwright-python.yml)

[English](README.md) | 繁體中文

</div>

# FunNow Playwright 概念證明

## 描述

此概念證明使用 Playwright 測試 [FunNow](https://myfunnow.com/) 網站所有語言的[預訂流程正常路徑](playwright-typescript/tests/booking.spec.ts)。[每次提交](https://github.com/koynoyno/funnow-ci-automation/actions)和拉取請求時，它會自動在 GitHub Actions 上運行（CI/CD），並使用 `trcli` 自動將測試結果上傳到 TestRail 實例。

## 使用技術

- Playwright (TypeScript + Python) + [POM 設計模式](https://playwright.dev/docs/pom "POM 設計模式") + [參數化測試](https://playwright.dev/docs/test-parameterize "參數化測試") + [固件](https://playwright.dev/docs/test-fixtures)
- GitHub Actions + [快取](https://docs.github.com/zh/actions/using-workflows/caching-dependencies-to-speed-up-workflows) + [密碼](https://docs.github.com/zh/actions/security-guides/using-secrets-in-github-actions)
- [trcli](https://github.com/gurock/trcli "trcli")（自動將失敗測試的截圖上傳到 TestRail 實例）

## 開始使用

- [TypeScript](playwright-typescript/README_zh.md)
- [Python](playwright-python/README_zh.md)

## ⚠️ 重要提示

為了使被測系統（system-under-test, SUT）更容易測試，[強烈建議](https://playwright.dev/docs/locators#locate-by-test-id)實施 `data-testid` 屬性。因為 SUT 沒有使用 `data-testid`，定位器變得脆弱和難以閱讀，這使得自動化過程不必要地複雜。

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

## [bugs.spec.ts (TS)](playwright-typescript/tests/bugs.spec.ts) / [test_bugs.py (Python)](playwright-python/tests/test_bugs.py) 檔案是什麼？

在測試過程中發現了幾個問題。

一些容易驗證，因此它們被實現在 `bugs.spec.ts` / `test_bugs.py` 檔案中。這些測試是[預期失敗的](https://playwright.dev/docs/api/class-test#test-fail-1)，除非相關的錯誤被修復。


## trcli 說明

每次 CI 運行後，測試結果會自動上傳到 TestRail。您可以在[這裡](.github/workflows/playwright.yml#L41-L53)找到相關的工作流程步驟。

成功測試運行的示例：

<img width="1531" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/532f9b3d-7523-4cc1-bf06-25e38078bb22"><br/><br/>

不成功測試運行的示例，錯誤描述和截圖附加在測試運行結果中：

<img width="1527" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/516fd9df-f186-4715-a878-864af2a8c940"><br/><br/>

由 `trcli` 自動創建的測試案例示例。請注意，測試案例可以使用 _自動化類型_ 欄位進行排序：

<img width="1526" alt="image" src="https://github.com/koynoyno/funnow-ci-automation/assets/46102189/ba3cedb7-d5b2-4aff-aaab-d472cf4244ea"><br/><br/>
