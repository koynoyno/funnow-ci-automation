import { type Locator, type Page } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly userMenuIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userMenuIcon = page.locator('#user-menu')
    }
}