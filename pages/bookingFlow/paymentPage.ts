import { type Locator, type Page } from '@playwright/test';

export class BookingPayment {
    readonly page: Page;
    readonly specialRequestField: Locator;
    readonly selectPromotionButton: Locator;
    readonly testPromotion: Locator;
    readonly promotionDialogOkButton: Locator;
    readonly savedCreditCard: Locator;
    readonly payButton: Locator;
    readonly dialogDuplicateBookingButton: Locator;
    readonly dialogSuccesfulTransaction: Locator;
    readonly continueBookingButton: Locator;
    readonly successfulTransactionOkButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.specialRequestField = page.getByPlaceholder('Tell us your needs. We will')
        this.selectPromotionButton = page.getByRole('button', { name: 'Select A Promotion' })
        this.testPromotion = page.getByText('測試用 Promo Code (中文翻譯)')
        this.promotionDialogOkButton = page.getByRole('button', { name: 'OK' })
        this.savedCreditCard = page.getByText('My Credit Card')
        this.payButton = page.getByRole('button', { name: 'Pay TWD' })

        this.dialogDuplicateBookingButton = page.getByRole('button', { name: 'Continue booking' })
        this.dialogSuccesfulTransaction = page.getByText('Successful Transaction');
        this.successfulTransactionOkButton = page.getByRole('button', { name: 'OK', exact: true })
    }

    async fillSpecialRequest(specialRequest: string) {
        await this.specialRequestField.click();
        await this.specialRequestField.fill(specialRequest);

    }

    async selectTestPromotion() {
        await this.selectPromotionButton.click();
        await this.testPromotion.click();
        await this.promotionDialogOkButton.click();
    }

    async selectSavedCreditCard() {
        await this.savedCreditCard.click();
    }

    async pay() {
        await this.payButton.click();
        // Handle duplicate booking
        // if (await this.dialogDuplicateBookingButton.isVisible())
        // HACK
        try { await this.dialogDuplicateBookingButton.click(); } catch { }
        await this.successfulTransactionOkButton.click();
    }
}