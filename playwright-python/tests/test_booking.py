# Note: booking flow (happy path) 
# Tests are parameterized in order to test the booking flow in different locales.
# Tests are using page objects to adhere to SOLID principles.

import re
import pytest
from playwright.sync_api import Browser, expect

# page object models

from models.branch import BranchPage
from models.header import HeaderPage
from models.booking.details import DetailsPage
from models.booking.payment import PaymentPage

# data
from data.locales import locales, Locale

BASE_URL = "https://stg2-www.myfunnow.com/"
AUTH_FILE = ".auth/user.json"
SPECIAL_REQUEST = "我可以要一間有好風景的房間嗎？"
BRANCH_ID = 73
BUG_OCCURED_MESSAGE = (f"test might fail here because of the bug\n"
                       f"See https://github.com/koynoyno/funnow-ci-automation/?tab=readme-ov-file#why-are-booking-flow-tests-flaky")




@pytest.mark.parametrize('locale', locales)
def test_booking_flow_happy_path(browser: Browser, locale: Locale):
  context = browser.new_context(storage_state=AUTH_FILE, base_url=BASE_URL, locale=locale.name)
  page = context.new_page()

  header = HeaderPage(page)
  branch_page = BranchPage(page, locale)
  branch_page.goto_branch(BRANCH_ID)
  expect(header.user_menu_icon).to_be_visible()
  branch_page.select_first_product()
  expect(branch_page.product_dialog).not_to_be_visible()
  branch_page.select_nearest_booking_time()
  expect(branch_page.booking_time_dialog).not_to_be_visible()
  branch_page.goto_booking_payment_page()
  expect(page, BUG_OCCURED_MESSAGE).to_have_url(re.compile("/.*booking/"))

  booking_payment_page = PaymentPage(page, locale)
  booking_payment_page.fill_special_request(SPECIAL_REQUEST)
  booking_payment_page.select_promotion_coupon()
  booking_payment_page.select_payment()
  booking_payment_page.pay()

  booking_details_page = DetailsPage(page, locale)
  expect(booking_details_page.booking_completed_message).to_be_visible()

  page.close()
