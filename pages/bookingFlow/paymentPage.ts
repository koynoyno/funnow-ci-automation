import { type Locator, type Page, expect } from '@playwright/test';
import { Locale } from '../../data/locales'

export class BookingPayment {
    readonly page: Page;
    readonly locale: Locale;
    readonly specialRequestField: Locator;
    readonly promotionButton: Locator;
    readonly testPromotion: Locator;
    readonly promotionDialogOkButton: Locator;
    readonly savedCreditCard: Locator;
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
        this.promotionButton = page.getByRole('button', { name: locale.promotionButton })
        this.testPromotion = page.getByText(locale.testPromotion)
        this.promotionDialogOkButton = page.getByRole('button', { name: locale.okButton })
        this.savedCreditCard = page.getByText(locale.savedCreditCard)
        this.payButton = page.getByRole('button', { name: locale.payButton })

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

    async selectTestPromotion() {
        await this.promotionButton.click();
        await this.testPromotion.click();
        await this.promotionDialogOkButton.click();
    }

    async selectSavedCreditCard() {
        await this.savedCreditCard.click();
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