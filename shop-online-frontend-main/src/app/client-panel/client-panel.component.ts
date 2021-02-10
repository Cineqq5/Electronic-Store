import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductService} from '../services/product.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.css']
})
export class ClientPanelComponent implements OnInit {
  allProduct: Product[] = [];
  // tslint:disable-next-line:new-parens
  buyProducts: Product[] = [];
  quantity = 0;
  productForm: FormGroup;
  submitted = false;
  @ViewChild('basketModal') modal: TemplateRef<any>;

  constructor(private productService: ProductService, private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder, private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.buyProducts = JSON.parse(localStorage.getItem('basket'));
    if (this.buyProducts === null) {
      this.buyProducts = [];
    }
    this.productService.getAllProductsToClient()
      .subscribe(data => {
        this.allProduct = data;
        console.log(data);
      }, error => console.log(error));

    this.productForm = this.formBuilder.group({
      quantity: new FormControl('', [Validators.required, Validators.pattern('^\\d+$')])
    });
  }

  transform(productDetails) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + productDetails);
  }


  get f() {
    return this.productForm.controls;
  }

  addToBasket(product: Product) {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    product.quantity = this.productForm.get('quantity').value;
    if (product.quantity > product.stock) {
      this.productForm.get('quantity').setErrors({serverError: {message: 'Show server error :)'}});
    } else {
      this.buyProducts.push(product);
      console.log(this.buyProducts);
      localStorage.setItem('basket', JSON.stringify(this.buyProducts));
      this.openInformDialog(this.modal);
    }
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

  showBasket() {
    this.router.navigate(['shopCart'], {state: {data: this.buyProducts}});
    this.dialog.closeAll();
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageBase64: any;
  quantity: number;
}

interface Basket {
  products: Product[];

}
