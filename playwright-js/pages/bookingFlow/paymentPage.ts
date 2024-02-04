import { type Locator, type Page, expect } from '@playwright/test';
import { Locale } from '../../data/locales'
import { mastercard } from '../../data/creditCards'

export class BookingPayment {
    readonly page: Page;
    readonly locale: Locale;
    readonly specialRequestField: Locator;
    readonly promotionButton: Locator;
    readonly skipPromotion: Locator;
    readonly testPromotion: Locator;
    readonly promotionDialogOkButton: Locator;
    readonly savedCreditCard: Locator;
    readonly addCreditCard: Locator;
    readonly newCreditCardNumber: Locator;
    readonly newCreditCardExpirationDate: Locator;
    readonly newCreditCardCVV: Locator;
    readonly payButton: Locator;
    readonly dialogDuplicateBooking: Locator;
    readonly dialogDuplicateBookingButton: Locator;
    readonly dialogSuccesfulTransaction: Locator;
    readonly continueBookingButton: Locator;
    readonly successfulTransactionOkButton: Locator;

    constructor(page: Page, locale: Locale) {
        this.page = page;
        this.locale = locale;
        this.specialRequestField = page.getByPlaceholder(locale.specialRequestField)
        // promotion coupon locators
        this.promotionButton = page.getByRole('button', { name: locale.promotionButton })
        this.skipPromotion = page.getByText(locale.skipPromotion)
        this.testPromotion = page.getByText(locale.testPromotion)
        this.promotionDialogOkButton = page.getByRole('button', { name: locale.okButton })
        // payment locators
        this.savedCreditCard = page.getByText(locale.savedCreditCard)
        this.addCreditCard = page.getByText(locale.addCreditCard)
        this.newCreditCardNumber = page.getByRole('textbox', { name: locale.newCreditCardNumber })
        this.newCreditCardExpirationDate = page.getByRole('textbox', { name: locale.newCreditCardExpirationDate })
        this.newCreditCardCVV = page.getByRole('textbox', { name: locale.newCreditCardCVV })
        this.payButton = page.getByRole('button', { name: locale.payButton })
        // post-payment dialog locators
        this.dialogDuplicateBooking = page.getByText(locale.dialogDuplicateBooking)
        this.dialogDuplicateBookingButton = page
            .getByRole('button', { name: locale.dialogDuplicateBookingButton })
        this.dialogSuccesfulTransaction = page.getByText(locale.dialogSuccesfulTransaction);
        this.successfulTransactionOkButton = page
            .locator('div.dialog-container')
            .getByRole('button', { name: locale.okButton, exact: true })
    }

    async fillSpecialRequest(specialRequest: string) {
        await this.specialRequestField.click();
        await this.specialRequestField.fill(specialRequest);
    }

    async selectPromotionCoupon() {
        await this.promotionButton.click();
        await expect(this.testPromotion.or(this.skipPromotion).first())
            .toBeVisible()
        if (await this.testPromotion.isVisible()) {
            await this.testPromotion.click();
        } else {
            await this.skipPromotion.click();
        }
        await this.promotionDialogOkButton.click();
    }

    async selectPayment() {
        await expect(this.savedCreditCard.or(this.addCreditCard).first())
            .toBeVisible()
        if (await this.savedCreditCard.isVisible()) {
            await this.savedCreditCard.click();
        } else {
            this.addNewCreditCard(mastercard)
        }
    }

    async addNewCreditCard(cardData) {
        await this.addCreditCard.click();
        await this.newCreditCardNumber.fill(cardData.cardNumber);
        await this.newCreditCardExpirationDate.fill(cardData.expirationDate);
        await this.newCreditCardCVV.fill(cardData.cvv);
    }

    async pay() {
        await this.payButton.click();
        await expect(this.dialogSuccesfulTransaction.or(this.dialogDuplicateBookingButton).first())
            .toBeVisible()
        if (await this.dialogDuplicateBooking.isVisible()) {
            await this.dialogDuplicateBookingButton.click();
            expect(this.dialogDuplicateBooking).not.toBeVisible()
        }
        await this.successfulTransactionOkButton.click();
    }
}