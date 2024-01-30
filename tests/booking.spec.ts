// Note: booking flow (happy path)

import { test, expect } from '../fixtures/fixtures';
import { mastercard } from '../data/creditCards';
import { Header } from '../pages/headerPage';
import { Branch } from '../pages/branchPage';
import { BookingPayment } from '../pages/bookingFlow/paymentPage';
import { BookingDetails } from '../pages/bookingFlow/detailsPage';

const SPECIAL_REQUEST = '我可以要一間有好風景的房間嗎？';

test.use({
  locale: 'en',
});

test('Booking flow (happy path)', async ({ page }) => {
  test.slow()
  const header = new Header(page);
  const branchPage = new Branch(page);
  await branchPage.gotoBranch(880);
  await expect(header.userMenuIcon).toBeVisible();
  await branchPage.selectFirstProduct();
  await branchPage.selectNearestBookingTime();
  await branchPage.gotoBookingPaymentPage();

  const bookingPaymentPage = new BookingPayment(page);
  await bookingPaymentPage.fillSpecialRequest(SPECIAL_REQUEST);
  await bookingPaymentPage.selectTestPromotion();
  await bookingPaymentPage.selectSavedCreditCard();
  await bookingPaymentPage.pay();

  const bookingDetailsPage = new BookingDetails(page);
  await expect(bookingDetailsPage.bookingCompletedMessage).toBeVisible();
});
