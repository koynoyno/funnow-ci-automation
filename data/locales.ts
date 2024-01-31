export interface Locale {
    locale: string,
    productList: string,
    okButton: string,
    bookingTimeList: string,
    nextButton: string,
    specialRequestField: string,
    promotionButton: string,
    testPromotion: string,
    savedCreditCard: string,
    payButton: string,
    dialogDuplicateBookingButton: string,
    dialogSuccesfulTransaction: string,
    bookingCompletedMessage: string,

}

export const locales: Locale[] = [

    // Traditional Chinese
    {
        locale: 'zh-tw',
        productList: '選擇商品',
        okButton: '確認',
        bookingTimeList: '選擇享樂時間',
        nextButton: '下一步 (',
        specialRequestField: '寫下需求',
        promotionButton: '選擇優惠',
        testPromotion: '測試用 Promo Code (中文翻譯)',
        savedCreditCard: '我的信用卡',
        payButton: '付款',
        dialogDuplicateBookingButton: '繼續預訂',
        dialogSuccesfulTransaction: '交易成功',
        bookingCompletedMessage: '預訂完成',
    },

    // Simplified Chinese
    {
        locale: 'zh-cn',
        productList: '选择商品',
        okButton: '确认',
        bookingTimeList: '选择享乐时间',
        nextButton: '下一步 (',
        specialRequestField: '写下需求',
        promotionButton: '选择优惠',
        testPromotion: '測試用 Promo Code (中文翻譯)',
        savedCreditCard: '我的信用卡',
        payButton: '付款',
        dialogDuplicateBookingButton: '继续预订',
        dialogSuccesfulTransaction: '交易成功',
        bookingCompletedMessage: '预订完成',
    },

    // Japanese
    {
        locale: 'ja',
        productList: '商品を選択',
        okButton: '確認',
        bookingTimeList: '予約日時を選択',
        nextButton: '次へ (',
        specialRequestField: 'リクエストをお伺い致しますが',
        promotionButton: 'クーポンを選択',
        testPromotion: '測試用 Promo Code (中文翻譯)',
        savedCreditCard: '選択中のクレジットカード',
        payButton: '支払い',
        dialogDuplicateBookingButton: '予約を続ける',
        dialogSuccesfulTransaction: '決済完了',
        bookingCompletedMessage: '予約確定',
    },

    // English
    {
        locale: 'en',
        productList: 'Select product',
        okButton: 'OK',
        bookingTimeList: 'Select Booking Time',
        nextButton: 'Next (',
        specialRequestField: 'Tell us your needs. We will',
        promotionButton: 'Select A Promotion',
        testPromotion: '測試用 Promo Code (中文翻譯)',
        savedCreditCard: 'My Credit Card',
        payButton: 'Pay',
        dialogDuplicateBookingButton: 'Continue booking',
        dialogSuccesfulTransaction: 'Successful Transaction',
        bookingCompletedMessage: 'Booking Completed',
    },

    // Thai
    {
        locale: 'th',
        productList: 'เลือกรายการ',
        okButton: 'ยืนยัน',
        bookingTimeList: 'เลือกเวลาจอง',
        nextButton: 'ถัดไป (',
        specialRequestField: 'โปรดระบุความ',
        promotionButton: 'เลือกข้อเสนอ',
        testPromotion: 'ทดสอบรหัสโปรโมชั่น (Test1)',
        savedCreditCard: 'บัตรเครดิตของฉัน',
        payButton: 'ชำระเงิน',
        dialogDuplicateBookingButton: 'ดำเนินการจอง',
        dialogSuccesfulTransaction: 'การทำธุรกรรมสำเร็จ',
        bookingCompletedMessage: 'การจองเสร็จสมบูรณ์',
    }
];