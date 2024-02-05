<div align="center">

[English](README.md) | 繁體中文

</div>

## 開始使用

該項目可以在本地運行。克隆該倉庫並在 `playwright-python` 文件夾中創建一個 `.env` 檔案。在檔案中，使用以下結構提供一個測試用戶的電子郵件和密碼：

```
MYFUNNOW_USERNAME=<email>
MYFUNNOW_PASSWORD=<password>
```
確保測試用戶已確認他們的電話號碼。

打開一個終端機，依次運行以下命令：

```bash
# 啟動虛擬環境
python3 -m venv .venv
# 將虛擬環境連結到當前終端會話
source .venv/bin/activate
# 安裝 pip
python3 -m pip install --upgrade pip
# 安裝依賴
pip install -r requirements.txt
# 安裝 playwright 瀏覽器
python3 -m playwright install --with-deps
```

之後，你可以使用 `pytest` 命令啟動測試。測試套件針對暫存環境運行。