/*
  Note: booking flow (happy path) 
  Tests are using locales to test the booking flow in different languages.
  Tests are using page objects to adhere for SOLID and DRY principles.
*/

import { test, expect } from '../fixtures/fixtures';
import { mastercard } from '../data/creditCards';
import { Header } from '../pages/headerPage';
import { Branch } from '../pages/branchPage';
import { BookingPayment } from '../pages/bookingFlow/paymentPage';
import { BookingDetails } from '../pages/bookingFlow/detailsPage';
import { locales } from '../data/locales'

const SPECIAL_REQUEST = '我可以要一間有好風景的房間嗎？';
const BRANCH_ID = 2272

for (const locale of locales) {

  test.describe(`[${locale.locale}] Booking Flow`, () => {

    test.use({
      locale: locale.locale,
    });

    test(`Happy path (${locale.locale})`, async ({ page }) => {
      // test.slow()
      const header = new Header(page);
      const branchPage = new Branch(page, locale);
      await branchPage.gotoBranch(BRANCH_ID);
      await expect(header.userMenuIcon).toBeVisible();
      await branchPage.selectFirstProduct();
      await branchPage.selectNearestBookingTime();
      await branchPage.gotoBookingPaymentPage();

      const bookingPaymentPage = new BookingPayment(page, locale);
      await bookingPaymentPage.fillSpecialRequest(SPECIAL_REQUEST);
      await bookingPaymentPage.selectTestPromotion();
      await bookingPaymentPage.selectSavedCreditCard();
      await bookingPaymentPage.pay();

      const bookingDetailsPage = new BookingDetails(page, locale);
      await expect(bookingDetailsPage.bookingCompletedMessage).toBeVisible();
    });
  });
}
