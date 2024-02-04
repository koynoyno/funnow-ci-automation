from playwright.sync_api import Page, expect
from data.credit_cards import mastercard, CardData

class PaymentPage:
    def __init__(self, page: Page,  locale):
        self.page = page
        self.locale = locale
        self.special_request_field = page.get_by_placeholder(locale.special_request_field)
        # promotion coupon locators
        self.promotion_button = page.get_by_role('button', name=locale.promotion_button)
        self.skip_promotion = page.get_by_text(locale.skip_promotion)
        self.test_promotion = page.get_by_text(locale.test_promotion)
        self.promotion_dialog_ok_button = page.get_by_role('button', name=locale.ok_button)
        # payment locators
        self.saved_credit_card = page.get_by_text(locale.saved_credit_card)
        self.add_credit_card = page.get_by_text(locale.add_credit_card)
        self.new_credit_card_number = page.get_by_role('textbox', name=locale.new_credit_card_number)
        self.new_credit_card_expiration_date = page.get_by_role('textbox', name=locale.new_credit_card_expiration_date)
        self.new_credit_card_cvv = page.get_by_role('textbox', name=locale.new_credit_card_cvv)
        self.pay_button = page.get_by_role('button', name=locale.pay_button)
        # post-payment dialog locators
        self.dialog_duplicate_booking = page.get_by_text(locale.dialog_duplicate_booking)
        self.dialog_duplicate_booking_button = page.get_by_role('button', name=locale.dialog_duplicate_booking_button)
        self.dialog_succesful_transaction = page.get_by_text(locale.dialog_succesful_transaction)
        self.successful_transaction_ok_button = page.locator('div.dialog-container').get_by_role('button', name=locale.ok_button, exact=True)

    def fill_special_request(self, special_request):
        self.special_request_field.click()
        self.special_request_field.fill(special_request)

    def select_promotion_coupon(self):
        self.promotion_button.click()
        expect(self.test_promotion.or_(self.skip_promotion).first).to_be_visible()
        if self.test_promotion.is_visible():
            self.test_promotion.click()
        else:
            self.skip_promotion.click()
        self.promotion_dialog_ok_button.click()

    def select_payment(self):
        expect(self.saved_credit_card.or_(self.add_credit_card).first).to_be_visible()
        if self.saved_credit_card.is_visible():
            self.saved_credit_card.click()
        else:
            self.add_new_credit_card(mastercard)

    def add_new_credit_card(self, card_data: CardData):
        self.add_credit_card.click()
        self.new_credit_card_number.fill(card_data.card_number)
        self.new_credit_card_expiration_date.fill(card_data.expiration_date)
        self.new_credit_card_cvv.fill(card_data.cvv)

    def pay(self):
        self.pay_button.click()
        expect(self.dialog_succesful_transaction.or_(self.dialog_duplicate_booking_button).first).to_be_visible()
        if self.dialog_duplicate_booking.is_visible():
            self.dialog_duplicate_booking_button.click()
            expect(self.dialog_duplicate_booking).not_to_be_visible()
        self.successful_transaction_ok_button.click()
