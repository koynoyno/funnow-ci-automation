import { type Locator, type Page } from '@playwright/test';
import { Locale } from '../../data/locales'

export class BookingDetails {
    readonly page: Page;
    readonly locale: Locale;
    readonly bookingCompletedMessage: Locator;

    constructor(page: Page, locale: Locale) {
        this.page = page;
        this.locale = locale;
        this.bookingCompletedMessage = page.getByText(locale.bookingCompletedMessage)

    }
}