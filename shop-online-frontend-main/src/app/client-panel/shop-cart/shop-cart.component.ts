import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageBase64: any;
  quantity: number;
}

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  shopCart: Product[] = [];
  total = 0;
  uniqueProductId: number[] = [];
  uniqueProduct: Product[] = [];
  constructor(private sanitizer: DomSanitizer, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.shopCart = JSON.parse(localStorage.getItem('basket'));
    // unikalne produkty w koszyku
    if (this.shopCart !== null) {
      for (const elem of this.shopCart) {
        if (!this.uniqueProductId.includes(elem.id)) {
          this.uniqueProductId.push(elem.id);
          this.uniqueProduct.push(elem);
        } else {
          let uniqueQuantity = this.uniqueProduct.find(e => e.id === elem.id).quantity;
          uniqueQuantity = +uniqueQuantity + +elem.quantity;
          if (uniqueQuantity <= elem.stock) {
            this.uniqueProduct.find(e => e.id === elem.id).quantity = uniqueQuantity;
          } else {
            this.uniqueProduct.find(e => e.id === elem.id).quantity = elem.stock;
          }
        }
      }
    }

    this.totalPrice();
  }

  totalPrice() {
    this.total = 0;
    for (const elem of this.uniqueProduct) {
      this.total += elem.price * elem.quantity;
    }
  }

  transform(productDetails) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + productDetails);
  }

  plus(product) {
    if (product.quantity < product.stock) {
      product.quantity++;
      this.totalPrice();
      localStorage.setItem('basket', JSON.stringify(this.uniqueProduct));
    }
  }

  minus(product) {
    if (product.quantity > 1) {
      product.quantity = product.quantity - 1;
      this.totalPrice();
      localStorage.setItem('basket', JSON.stringify(this.uniqueProduct));
    }
  }

  order() {
    this.router.navigate(['orderDetails'], {state: {data: this.uniqueProduct}});
  }

  remove(product) {
    const index: number = this.uniqueProduct.indexOf(product);
    if (index !== -1) {
      this.uniqueProduct.splice(index, 1);
      this.totalPrice();
      localStorage.setItem('basket', JSON.stringify(this.uniqueProduct));
    }
  }

  changeQuantityValue(product) {
    if (product.quantity <= product.stock) {
    }
    else{
      product.quantity = product.stock;
    }
    this.totalPrice();
    localStorage.setItem('basket', JSON.stringify(this.uniqueProduct));
  }

  backToList() {
    this.router.navigateByUrl('/');
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
