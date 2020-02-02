import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsList } from 'src/app/models/product';
import { Product } from "src/app/models/product";
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
  pList: ProductsList;
  product: Product;
  isDetail: boolean = true;
  constructor(private route: ActivatedRoute, private _cart: CartService) {
    this.pList = new ProductsList();
    this.route.params.subscribe(params => {
      this.productId = params.productId; this.isDetail = false;
    }
    );
  }

  ngOnInit() {
    this.product = this.pList.getProduct(this.productId);
  }

  lastProductsCount() {
    let productCountOnCart: number = this._cart.getCart().filter(p => p.id == this.productId).length;
    return this.product.quantity - productCountOnCart
  }

  add2Cart(p: Product) {
    if (p != undefined) {
      if(this.lastProductsCount() > 0){
        let cartData: Product[] = this._cart.getCart();
        cartData.push(p);
        this._cart.setCart(cartData);
      }
    }
  }
}