from playwright.sync_api import Page

class DetailsPage:
    def __init__(self, page: Page, locale):
        self.page = page
        self.locale = locale
        self.booking_completed_message = page.get_by_text(locale.booking_completed_message)