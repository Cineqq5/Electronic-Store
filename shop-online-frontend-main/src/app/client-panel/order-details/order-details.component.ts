import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DOCUMENT, formatNumber} from '@angular/common';

class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageBase64: any;
  quantity: number;
}

class Order {
  name: string;
  surname: string;
  city: string;
  postalCode: string;
  phone: string;
  town: string;
  products: Product[];
}


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  dotPay = 'https://ssl.dotpay.pl/test_payment/?id=742560&';
  clientForm: FormGroup;
  submitted = false;
  errorMessage = '';
  isSignUpFailed = false;
  shopCart: Product[] = [];
  total = 0;
  uniqueProductId: number[] = [];
  uniqueProduct: Product[] = [];
  order: Order = new Order();
  @ViewChild('informModal') modal: TemplateRef<any>;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;

  constructor(private sanitizer: DomSanitizer, private formBuilder: FormBuilder,
              private productService: ProductService, private router: Router,
              private dialog: MatDialog, @Inject(DOCUMENT) private document: Document) {
    this.clientForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('^\\d{2}[- ]{0,1}\\d{3}$')]),
      town: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}')])
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.shopCart = JSON.parse(localStorage.getItem('basket'));
    // unikalne produkty w koszyku
    for (const elem of this.shopCart) {
      if (!this.uniqueProductId.includes(elem.id)) {
        this.uniqueProductId.push(elem.id);
        this.uniqueProduct.push(elem);
      } else {
        let uniqueQuantity = this.uniqueProduct.find(e => e.id === elem.id).quantity;
        uniqueQuantity = +uniqueQuantity + +elem.quantity;
        this.uniqueProduct.find(e => e.id === elem.id).quantity = uniqueQuantity;
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

  get f() {
    return this.clientForm.controls;
  }

  saveOrder() {
    this.submitted = true;
    if (this.clientForm.invalid) {
      return;
    }

    this.order.name = this.clientForm.get('name').value;
    this.order.surname = this.clientForm.get('surname').value;
    this.order.city = this.clientForm.get('city').value;
    this.order.town = this.clientForm.get('town').value;
    this.order.postalCode = this.clientForm.get('postalCode').value;
    this.order.phone = this.clientForm.get('phone').value;
    this.order.products = this.uniqueProduct;

    this.productService.saveOrder(this.order).subscribe(data => {
        console.log(data);
        this.openInformDialog(this.modal);
        localStorage.removeItem('basket');
    }, error1 => {
      this.openInformDialog(this.errorModal);
      console.log(error1.error.errorMessage);
    });
  }

  openInformDialog(modal) {
    const dialogRef = this.dialog.open(modal);
    console.log('Dodany produkt');
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
      // this.ngOnInit();
    });
  }

  backToOrder() {
    this.router.navigateByUrl('/shopCart');
  }

  backToList() {
    this.router.navigateByUrl('/');
    this.dialog.closeAll();
  }

  pay() {
    this.document.location.href = this.dotPay + 'amount=' + formatNumber(this.total, 'pl') + '&&currency=PLN&description=Zamówienie produktów ze sklepu Kozlowski';
  }
}
