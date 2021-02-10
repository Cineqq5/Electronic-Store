import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

class Statistics {
  countSaleProduct: number;
  countOrders: number;
  countAvailableProduct: number;
  totalAvailableProduct: number;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild('informModal') modal: TemplateRef<any>;
  username: string;
  password: string;
  authentication = false;
  errorLogin = false;
  addProductFlag = true;
  showProductFlag = false;
  statistics: Statistics = new Statistics();
  // tslint:disable-next-line:new-parens
  newProduct: Product = new class implements Product {
    description: string;
    name: string;
    price: number;
    stock: number;
  };
  productForm: FormGroup;
  submitted = false;
  errorMessage = '';
  isSignUpFailed = false;
  price: string;
  file: any;
  private SERVER_URL = 'http://localhost:8080/api/addProduct';
  showPanel = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
              private httpClient: HttpClient, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    const auth = JSON.parse(localStorage.getItem('auth'));
    this.productForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('^\\d+(,\\d{1,2})?$')]),
      stock: new FormControl('', [Validators.required, Validators.pattern('^\\d+$')]),
      description: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
    this.productService.getStatistics().subscribe(
      data => {
        this.statistics = data;
        console.log(data);
      }
    );
    if (auth === true) {
      this.showPanel = true;
    }
  }

  authenticationAdmin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.showPanel = true;
      localStorage.setItem('auth', JSON.stringify(true));
      console.log('Udane logowanie');
    } else {
      this.errorLogin = true;
    }
  }

  addProduct() {
    this.addProductFlag = true;
    this.showProductFlag = false;
  }

  showProducts() {
    this.addProductFlag = false;
    this.showProductFlag = true;
  }

  get f() {
    return this.productForm.controls;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
    }
  }

  saveProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.newProduct.name = this.productForm.get('name').value;
    this.price = this.productForm.get('price').value;
    this.newProduct.price = Number(this.price.replace(',', '.'));
    this.newProduct.stock = this.productForm.get('stock').value;
    this.newProduct.description = this.productForm.get('description').value;
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(formData);
    console.log(this.newProduct);
    const mData = JSON.stringify(this.newProduct);
    formData.append('product', mData);
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(res);
        this.openInformDialog();
      },
      (err) => console.log(err.error)
    );
  }

  openInformDialog() {
    const dialogRef = this.dialog.open(this.modal);
    console.log('Dodany produkt');
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.resetForm(this.productForm);
      // this.ngOnInit();
    });
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  backToStore() {
    this.router.navigateByUrl('/');
    localStorage.setItem('auth', JSON.stringify(false));
  }
}

interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
}


