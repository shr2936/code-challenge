import { Component, OnInit } from '@angular/core';
import { IDebitCard } from '../../interfaces/IDebitCard';
import { ICardAction } from '../../interfaces/ICardAction';
import { ITransaction } from '../../interfaces/ITransaction';
import { eTransactionType } from '../../enums';
import { CardsApiService } from '../../services/cards-api.service';
import 'jquery';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(private cardsApiService: CardsApiService) {}

  eTransactionType = eTransactionType;

  cardOptions: string[] = ['My debit cards', 'All company cards'];
  selectedOption: string = this.cardOptions[0];
  balanceAmount: number = 3000;
  debitCards: IDebitCard[] = [];
  selectedCardIndex: number = 0;
  showCardNumber: boolean = false;
  cardActions: ICardAction[] = [
    {
      value: 1,
      imageUrl: 'assets/images/set-spend-limit.svg',
      label: 'Set spend limit',
    },
    {
      value: 2,
      imageUrl: 'assets/images/gpay.svg',
      label: 'Add to GPay',
    },
    {
      value: 3,
      imageUrl: 'assets/images/replace-card.svg',
      label: 'Replace card',
    },
    {
      value: 4,
      imageUrl: 'assets/images/deactivate-card.svg',
      label: 'Cancel card',
    },
  ];
  showCardDetails: boolean = false;
  showRecentTxn: boolean = true;
  transactions: ITransaction[] = [
    {
      imageUrl: 'assets/images/file-storage.svg',
      title: 'Hamleys',
      amount: 150,
      transactionType: eTransactionType.CREDIT,
      date: '20 May 2020',
      info: 'Refund on dedit card',
    },
    {
      imageUrl: 'assets/images/file-storage.svg',
      title: 'Hamleys',
      amount: 150,
      transactionType: eTransactionType.DEBIT,
      date: '20 May 2020',
      info: 'Charged to dedit card',
    },
    {
      imageUrl: 'assets/images/file-storage.svg',
      title: 'Hamleys',
      amount: 150,
      transactionType: eTransactionType.DEBIT,
      date: '20 May 2020',
      info: 'Charged to dedit card',
    },
    {
      imageUrl: 'assets/images/file-storage.svg',
      title: 'Hamleys',
      amount: 150,
      transactionType: eTransactionType.DEBIT,
      date: '20 May 2020',
      info: 'Charged to dedit card',
    },
  ];
  loadingCards: boolean = true;
  newCardName: string = '';

  ngOnInit(): void {
    this.getCards();
  }

  onShowRecentTxnToggle() {
    this.showRecentTxn = !this.showRecentTxn;
  }

  onToggleShowCard() {
    this.showCardNumber = !this.showCardNumber;
  }

  setSelectedCardIndex(index: number) {
    this.selectedCardIndex = index;
  }

  getCards() {
    this.cardsApiService
      .getCards()
      .then((r) => r.json())
      .then((r: any) => {
        // dummy data
        let cardsData = localStorage.getItem('cards');
        if (cardsData) {
          r = JSON.parse(cardsData);
        } else {
          r = [
            {
              cardNumber: ['1234', '1234', '1234', '2020'],
              expiry: '12/20',
              cvv: '123',
              customerName: 'Mark Henry',
            },
            {
              cardNumber: ['3434', '3434', '3434', '3434'],
              expiry: '12/21',
              cvv: '456',
              customerName: 'Mark Henry',
            },
            {
              cardNumber: ['1212', '1212', '1212', '1212'],
              expiry: '12/22',
              cvv: '789',
              customerName: 'Mark Henry',
            },
          ];
        }

        // settimeout is used to add delay in api result
        setTimeout(() => {
          this.debitCards = r;
          this.loadingCards = false;
          this.updateCardsDataInStorage();
        }, 1000);
      })
      .catch((err) => {
        console.log('error : ', err);
        this.loadingCards = false;
      });
  }

  addNewCard() {
    this.debitCards.splice(0, 0, {
      cardNumber: this.getRandomCardNumber(),
      expiry: this.getRandomExpiryDate(),
      cvv: '789',
      customerName: this.newCardName,
    });
    this.selectedCardIndex = 0;
    this.closeAddCardDialog();
    this.newCardName = '';
    this.updateCardsDataInStorage();
  }

  getRandomCardNumber() {
    let cardNumber: string[] = [];
    for (let i = 0; i < 4; i++) {
      let num: number = 0;
      for (let j = 0; j < 4; j++) {
        num = num * 10 + Math.floor(Math.random() * 9) + 1;
      }
      cardNumber.push(String(num));
    }
    return cardNumber;
  }

  getRandomExpiryDate() {
    let date = new Date(),
      month = String(date.getMonth());
    if (month.length == 1) month = '0' + month;
    return month + '/' + String(date.getFullYear()).slice(2);
  }

  closeAddCardDialog() {
    let x: any = $('#addCardModal');
    x.modal('hide');
  }

  updateCardsDataInStorage() {
    localStorage.setItem('cards', JSON.stringify(this.debitCards));
  }

  onToggleFreezeCard() {
    this.debitCards[this.selectedCardIndex].isFreezed =
      !this.debitCards[this.selectedCardIndex].isFreezed;
  }
}
