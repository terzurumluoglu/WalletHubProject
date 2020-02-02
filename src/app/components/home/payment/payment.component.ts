import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  datas : Product[] = [];
  amount : string;
  constructor(private _cart :CartService) {
    this.createNewCartData();
  }

  ngOnInit() {
  }

  createNewCartData(){
    let cartData : Product[] = this._cart.getCart();
    cartData.forEach(element => {
      let p : Product = this.datas.find(p => p.id == element.id);
      if (p == null) {
        element.quantity = 1;
        this.datas.push(element)
      } else {
        p.quantity = p.quantity + 1;
        p.price = p.price + element.price;
      }
    });
  }
}
