<div align="center">

English | [繁體中文](README_zh.md)

</div>

## Getting Started

The project can be run locally. Clone the repo and create a `.env` file in the `playwright-python` folder. Inside the file, provide the email and password for a test user using the following structure:
```
MYFUNNOW_USERNAME=<email>
MYFUNNOW_PASSWORD=<password>
```
Make sure test user has confirmed their phone number.

Open a terminal, run following commands one by one:

```bash
# activate virtual environment
python3 -m venv .venv
# link virtual environment to the current terminal session
source .venv/bin/activate
# install pip
python3 -m pip install --upgrade pip
# install dependencies
pip install -r requirements.txt
# install playwright browsers
python3 -m playwright install --with-deps
```

After that, you can launch tests using the `pytest` command. Test suite runs against staging. 