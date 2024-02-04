from playwright.sync_api import Page

class BranchPage:
    def __init__(self, page: Page, locale):
        self.page = page
        self.locale = locale
        self.product_list = page.get_by_label(locale.product_list)
        self.control_selection_radio = page.locator('.v-input--selection-controls__ripple')
        # self.control_selection_radio = page
        #     .locator('div:nth-child(2) > .v-input--selection-controls__input > .v-input--selection-controls__ripple')
        self.product_list_ok_button = page.get_by_role('button', name=locale.ok_button, exact=True)
        self.booking_time_list = page.get_by_placeholder(locale.booking_time_list)
        # HACK .last() is unreliable, use "data-testid" instead
        self.booking_time_ok_button = page.get_by_role('button', name=locale.ok_button, exact=True).last
        self.next_button = page.get_by_role('button', name=locale.next_button)
        self.product_dialog = page.locator('div.v-card__title').filter(has_text=locale.product_list)
        self.booking_time_dialog = page.locator('div.v-card__title').filter(has_text=locale.booking_time_list)

    def select_first_product(self):
        self.product_list.click()
        self.control_selection_radio.first.click()
        self.booking_time_ok_button.click()

    def select_nearest_booking_time(self):
        self.booking_time_list.click()
        self.booking_time_ok_button.click(delay=500)

    def goto_booking_payment_page(self):
        self.next_button.click()

    def goto_branch(self, branch_id: int):
        self.page.goto(f"/branches/{branch_id}")
