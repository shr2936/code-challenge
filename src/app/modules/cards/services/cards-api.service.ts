import { Injectable } from '@angular/core';

@Injectable()
export class CardsApiService {
  constructor() {}

  getCards() {
    return fetch('https://dummyjson.com/test');
  }
}
