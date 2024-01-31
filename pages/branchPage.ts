import { type Locator, type Page } from '@playwright/test';
import { Locale } from '../data/locales'
export class Branch {
    readonly page: Page;
    readonly locale: Locale;
    readonly productList: Locator;
    readonly controlSelectionRadio: Locator;
    readonly productListOkButton: Locator;
    readonly bookingTimeOkButton: Locator;
    readonly bookingTimeList: Locator;
    readonly nextButton: Locator;

    constructor(page: Page, locale: Locale) {
        this.page = page;
        this.locale = locale;
        this.productList = page.getByLabel(locale.productList)
        this.controlSelectionRadio = page.locator('.v-input--selection-controls__ripple')
        // this.controlSelectionRadio = page
        //     .locator('div:nth-child(2) > .v-input--selection-controls__input > .v-input--selection-controls__ripple')
        this.productListOkButton = page.getByRole('button', { name: locale.okButton, exact: true })
        this.bookingTimeList = page.getByPlaceholder(locale.bookingTimeList)
        // HACK .last() is unreliable, use "data-testid" instead
        this.bookingTimeOkButton = page.getByRole('button', { name: locale.okButton, exact: true }).last()
        this.nextButton = page.getByRole('button', { name: locale.nextButton })
    }

    async selectFirstProduct() {
        await this.productList.click();
        await this.controlSelectionRadio.first().click();
        await this.bookingTimeOkButton.click();
    }

    async selectNearestBookingTime() {
        await this.bookingTimeList.click();
        await this.bookingTimeOkButton.click({ delay: 500 });
    }

    async gotoBookingPaymentPage() {
        await this.nextButton.click();
    }

    async gotoBranch(branchId: number) {
        await this.page.goto(`/branches/${branchId}`);
    }
}

