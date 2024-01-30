import { type Locator, type Page } from '@playwright/test';

export class BookingDetails {
    readonly page: Page;
    readonly bookingCompletedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookingCompletedMessage = page.getByText('Booking Completed')

    }

    async someAwesomeFunction() {

    }
}