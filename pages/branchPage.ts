import { type Locator, type Page } from '@playwright/test';

export class Branch {
    readonly page: Page;
    readonly productList: Locator;
    readonly controlSelectionRadio: Locator;
    readonly productListOkButton: Locator;
    readonly bookingTimeOkButton: Locator;
    readonly bookingTimeList: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.getByLabel('Select product')
        this.controlSelectionRadio = page.locator('.v-input--selection-controls__ripple')
        this.productListOkButton = page.getByRole('button', { name: 'OK', exact: true })
        this.bookingTimeList = page.getByPlaceholder('Select Booking Time')
        // HACK .last() is unreliable, use "data-testid" instead
        this.bookingTimeOkButton = page.getByRole('button', { name: 'OK', exact: true }).last()
        this.nextButton = page.getByRole('button', { name: 'Next (TWD 2500)' })
    }

    async selectFirstProduct() {
        await this.productList.click();
        await this.controlSelectionRadio.first().click();
        await this.bookingTimeOkButton.click();
    }

    async selectNearestBookingTime() {
        await this.bookingTimeList.click();
        await this.bookingTimeOkButton.click();
    }

    async gotoBookingPaymentPage() {
        await this.nextButton.click();
    }

    async gotoBranch(branchId: number) {
        await this.page.goto(`/branches/${branchId}`);
    }
}