import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Product } from 'src/app/models/product';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations : [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class ToastComponent implements OnInit,DoCheck {
  @Input() data: Product;
  @Output() outUpdate = new EventEmitter();
  cart : Product[];
  datas : Product[] = [];
  flag :boolean = true;

  constructor(private _cart : CartService) {
  }

  ngOnInit() {
  }

  remove(p : Product){
    let i : number = this.datas.indexOf(p);
    this.datas.splice(i,1);
    this.cart = this._cart.getCart();
    let index : number = this.cart.indexOf(p);
    this.cart.splice(index,1);
    this._cart.setCart(this.cart);
    this.data = null;
    this.outUpdate.emit(p);
  }

  getTotoalPrice(){
    return this.datas.reduce((sum,cur) => sum + cur.price,0);
  }

  getTotalQuantities(){
    return this.datas.reduce((sum,cur) => sum + cur.quantity,0);
  }

  ngDoCheck(){
    if (this.flag && this.data != null) {
      this.flag = false;
      this.datas.push(this.data);
      this.data = null;
      this.flag = true;
    }
  }
}
