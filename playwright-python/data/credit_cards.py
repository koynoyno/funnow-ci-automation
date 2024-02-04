from dataclasses import dataclass

@dataclass
class CardData:
    card_number: str
    expiration_date: str
    cvv: str

mastercard = CardData(
    card_number="5451417825230575",
    expiration_date="12/30",
    cvv="123"
)