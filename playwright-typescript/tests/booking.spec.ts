/*
  Note: booking flow (happy path) 
  Tests is parameterized, to test the booking flow in different locales.
  Tests is using page objects to adhere to SOLID principles.
*/

import { test, expect } from '../fixtures/autoFixtures';
import { Header } from '../pages/headerPage';
import { Branch } from '../pages/branchPage';
import { BookingPayment } from '../pages/bookingFlow/paymentPage';
import { BookingDetails } from '../pages/bookingFlow/detailsPage';
import { locales } from '../data/locales'

const SPECIAL_REQUEST = '我可以要一間有好風景的房間嗎？';
const BRANCH_ID = 73

for (const locale of locales) {

  const LOCALE_NAME = locale.name;
  test.describe(`Booking Flow`, () => {

    // apply user locale
    test.use({
      locale: LOCALE_NAME,
    });

    test(`Happy path (${LOCALE_NAME})`, async ({ page }) => {
      // test.slow() // 3x increase of timeout
      const header = new Header(page);
      const branchPage = new Branch(page, locale);
      await branchPage.gotoBranch(BRANCH_ID);
      await expect(header.userMenuIcon).toBeVisible();
      await branchPage.selectFirstProduct();
      await expect(branchPage.productDialog).not.toBeVisible()
      await branchPage.selectNearestBookingTime();
      await expect(branchPage.bookingTimeDialog).not.toBeVisible()
      await branchPage.gotoBookingPaymentPage();
      await expect(page).toHaveURL(/.*booking/);

      const bookingPaymentPage = new BookingPayment(page, locale);
      await bookingPaymentPage.fillSpecialRequest(SPECIAL_REQUEST);
      await bookingPaymentPage.selectPromotionCoupon();
      await bookingPaymentPage.selectPayment();
      await bookingPaymentPage.pay();

      const bookingDetailsPage = new BookingDetails(page, locale);
      await expect(bookingDetailsPage.bookingCompletedMessage).toBeVisible();
    });
  });
}
