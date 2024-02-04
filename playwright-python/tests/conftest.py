import pytest
import os
from pathlib import Path
from playwright.sync_api import Playwright, Browser, Page
from dotenv import load_dotenv

load_dotenv()
BASE_URL = "https://stg2-www.myfunnow.com/"
AUTH_FILE = ".auth/user.json"
AUTH_DATA = {'username': os.environ["MYFUNNOW_USERNAME"],
             'password': os.environ["MYFUNNOW_PASSWORD"],
             'os': "automation",
             'osVersion': "Playwright",
             'appVersion': "1.0",
             'deviceId': "PW",
             'verification_token': "0"}

# create the .auth folder if it doesn't exist
output_file = Path(AUTH_FILE)
output_file.parent.mkdir(exist_ok=True, parents=True)

#UI authentication, slower
# @pytest.fixture(scope='session', autouse=True)
# def authenticate(browser: Browser):
#     context = browser.new_context(base_url=BASE_URL)
#     page = context.new_page()
    
#     page.goto('/')
#     expect(page).to_have_title(re.compile(r'FunNow'))
#     page.get_by_role('button', name="Login / Sign Up").click()
#     page.get_by_role('button', name="Login", exact=True).click()
#     page.get_by_placeholder("Please enter email").click()
#     page.get_by_placeholder("Please enter email").fill(os.environ["MYFUNNOW_USERNAME"])
#     page.get_by_placeholder("Please enter email").press('Tab')
#     page.get_by_placeholder("Please enter password").fill(os.environ["MYFUNNOW_PASSWORD"])
#     page.get_by_placeholder("Please enter password").press('Enter')
#     expect(page.locator("#user-menu")).to_be_visible()
#     context.storage_state(path=AUTH_FILE)
#     yield


# API authentication, faster 
@pytest.fixture(scope='module', autouse=True)
def authenticate(playwright: Playwright):
    api_request_context = playwright.request.new_context(base_url=BASE_URL)
    authentication = api_request_context.post("/v2/funnow/login", data=AUTH_DATA)
    assert authentication.ok
    api_request_context.storage_state(path=AUTH_FILE)
    yield 
    # authentication.dispose()


# TestRail screenshots after crash
# @pytest.fixture(scope="function", autouse=True)
# def testrail_screenshot(browser: Browser):
#     yield


# Browser context handling
@pytest.fixture(scope='module')
def set_up(browser: Browser):
    context = browser.new_context(storage_state=AUTH_FILE,
                                  base_url=BASE_URL,
                                  locale='en',
                                  timezone_id='Asia/Taipei',)
    page = context.new_page()
    yield page
    context.close()
    browser.close()
