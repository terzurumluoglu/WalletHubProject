import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  cart : Product[];
  isPayment : boolean = false;
  userName : string;
  constructor(
    private router :Router,
    private _cart : CartService,
    private _auth : AuthService) {
      this.getCurrentUser();
  }

  getCurrentUser(){
    this.userName = this._auth.currentUserValue.name;
  }

  ngOnInit() {
    this.cart = this._cart.getCart();
  }

  ngDoCheck(){
    this.cart = this._cart.getCart();
  }

  getTotalPrice(cart : Product[]){
    return cart.reduce((sum, current) => sum + current.price, 0);
  }

  emptyCart(){
    this._cart.emptyCart();
  }

  logOut(){
    this._auth.logout();
    this.router.navigate(['/login']);
  }
}