from dataclasses import dataclass

@dataclass
class Locale:
    name: str
    product_list: str
    ok_button: str
    booking_time_list: str
    next_button: str
    special_request_field: str
    promotion_button: str
    skip_promotion: str
    test_promotion: str
    saved_credit_card: str
    add_credit_card: str
    new_credit_card_number: str
    new_credit_card_expiration_date: str
    new_credit_card_cvv: str
    pay_button: str
    dialog_duplicate_booking: str
    dialog_duplicate_booking_button: str
    dialog_succesful_transaction: str
    booking_completed_message: str


# Instantiate localizations

# Traditional Chinese
ZHTWLocale = Locale(
    name="zh-tw",
    product_list="選擇商品",
    ok_button="確認",
    booking_time_list="選擇享樂時間",
    next_button="下一步 (",
    special_request_field="寫下需求",
    promotion_button="選擇優惠",
    skip_promotion="不使用優惠券",
    test_promotion="測試用 Promo Code (中文翻譯)",
    saved_credit_card="我的信用卡",
    add_credit_card="新增信用卡",
    new_credit_card_number="信用卡卡號",
    new_credit_card_expiration_date="MM / YY",
    new_credit_card_cvv="CVC / CVV",
    pay_button="付款",
    dialog_duplicate_booking="已存在相同時間的訂單",
    dialog_duplicate_booking_button="繼續預訂",
    dialog_succesful_transaction="交易成功",
    booking_completed_message="預訂完成"
)

# Simplified Chinese
ZHCNLocale = Locale(
    name="zh-cn",
    product_list="选择商品",
    ok_button="确认",
    booking_time_list="选择享乐时间",
    next_button="下一步 (",
    special_request_field="写下需求",
    promotion_button="选择优惠",
    skip_promotion="不使用优惠券",
    test_promotion="測試用 Promo Code (中文翻譯)",
    saved_credit_card="我的信用卡",
    add_credit_card="新增信用卡",
    new_credit_card_number="信用卡卡号",
    new_credit_card_expiration_date="MM / YY",
    new_credit_card_cvv="CVC / CVV",
    pay_button="付款",
    dialog_duplicate_booking="已存在相同时间的订单",
    dialog_duplicate_booking_button="继续预订",
    dialog_succesful_transaction="交易成功",
    booking_completed_message="预订完成"
)

# Japanese
JAJPLocale = Locale(
    name="ja",
    product_list="商品を選択",
    ok_button="確認",
    booking_time_list="予約日時を選択",
    next_button="次へ (",
    special_request_field="リクエストをお伺い致しますが",
    promotion_button="クーポンを選択",
    skip_promotion="利用しない",
    test_promotion="測試用 Promo Code (中文翻譯)",
    saved_credit_card="選択中のクレジットカード",
    add_credit_card="クレジットカードを追加",
    new_credit_card_number="クレジットカード番号",
    new_credit_card_expiration_date="MM / YY",
    new_credit_card_cvv="CVC / CVV",
    pay_button="支払い",
    dialog_duplicate_booking="既に同じ日時に予約があります",
    dialog_duplicate_booking_button="予約を続ける",
    dialog_succesful_transaction="決済完了",
    booking_completed_message="予約確定"
)

# English
ENLocale = Locale(
    name = "en",
    product_list = "Select product",
    ok_button = "OK",
    booking_time_list = "Select Booking Time",
    next_button = "Next (",
    special_request_field = "Tell us your needs. We will",
    promotion_button = "Select A Promotion",
    skip_promotion = "Skip using Coupon",
    test_promotion = "測試用 Promo Code (中文翻譯)",
    saved_credit_card = "My Credit Card",
    add_credit_card = "Add New Credit Card",
    new_credit_card_number = "Credit Card Number",
    new_credit_card_expiration_date = "MM / YY",
    new_credit_card_cvv = "CVC / CVV",
    pay_button = "Pay",
    dialog_duplicate_booking = "There is an existing booking for the same time",
    dialog_duplicate_booking_button = "Continue booking",
    dialog_succesful_transaction = "Successful Transaction",
    booking_completed_message = "Booking Completed",
)

# Thai
THLocale = Locale(
    name = "th",
    product_list = "เลือกรายการ",
    ok_button = "ยืนยัน",
    booking_time_list = "เลือกเวลาจอง",
    next_button = "ถัดไป (",
    special_request_field = "โปรดระบุความ",
    promotion_button = "เลือกข้อเสนอ",
    skip_promotion = "ข้ามการใช้คูปอง",
    test_promotion = "ทดสอบรหัสโปรโมชั่น (Test1)",
    saved_credit_card = "บัตรเครดิตของฉัน",
    add_credit_card = "เพิ่มบัตรเครดิต",
    new_credit_card_number = "หมายเลขบัตรเครดิต",
    new_credit_card_expiration_date = "MM / YY",
    new_credit_card_cvv = "CVC / CVV",
    pay_button = "ชำระเงิน",
    dialog_duplicate_booking = "มีคำสั่งซื้อเวลาเดียวนี้กัน",
    dialog_duplicate_booking_button = "ดำเนินการจอง",
    dialog_succesful_transaction = "การทำธุรกรรมสำเร็จ",
    booking_completed_message = "การจองเสร็จสมบูรณ์",
)

locales = [ZHTWLocale, ZHCNLocale, JAJPLocale, ENLocale, THLocale, ]