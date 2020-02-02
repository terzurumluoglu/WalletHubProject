import { Component, OnInit } from '@angular/core';
import { Product,ProductsList } from "src/app/models/product";
import { CartService } from 'src/app/services/cart/cart.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ])
    ])
  ]
})

export class ProductListComponent implements OnInit {

  staRR : number[] = [1,2,3,4,5];
  pList : ProductsList;
  products : Product[] = [];
  product : Product;

  constructor(private _cart : CartService) {
    this.pList = new ProductsList();
  }

  ngOnInit() {
    this.products = this.pList.getAllProducts();
  }

  outUpdateData(event : Product) {
    let i : number = this.products.indexOf(event);
    console.log(i);
  }

  lastProductsCount(id : number){
    let productCountOnCart : number = this._cart.getCart().filter(p => p.id == id).length;
    return this.products.find(p => p.id == id).quantity - productCountOnCart
  }

  add2Cart(p : Product){
    if (p != undefined) {
      if(this.lastProductsCount(p.id) > 0){
        this.product = p;
        let productsOnCart : Product[] = this._cart.getCart();
        productsOnCart.push(p);
        this._cart.setCart(productsOnCart);
        setTimeout(() => {
          this.product = null;
        }, 250);
      }
    }
  }
}
