import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCart() : Product[]{
    return localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart'));
  }

  setCart(cart : Product[]){
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  emptyCart(){
    this.setCart([]);
  }
}
