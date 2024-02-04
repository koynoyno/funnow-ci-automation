from playwright.sync_api import Page

class HeaderPage:
    def __init__(self, page: Page):
        self.page = page
        self.user_menu_icon = page.locator('#user-menu')