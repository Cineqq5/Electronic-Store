import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  image;
  showList;
  productForm: FormGroup;
  submitted = false;
  errorMessage = '';
  isSignUpFailed = false;
  price: string;
  file: any;
  private SERVER_URL = 'http://localhost:8080/api/editProduct';
  constructor(private route: ActivatedRoute, private productService: ProductService,
              private sanitizer: DomSanitizer, private router: Router,
              private dialog: MatDialog, private formBuilder: FormBuilder,
              private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:new-parens
  productDetails: Product = new class implements Product {
    description: string;
    id: number;
    imageBase64: string;
    name: string;
    price: number;
    stock: number;
  };

  ngOnInit(): void {
    window.scroll(0, 0);
    this.productForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('^\\d+(,\\d{1,2})?$')]),
      stock: new FormControl('', [Validators.required, Validators.pattern('^\\d+$')]),
      description: new FormControl('', Validators.required),
    });
    this.id = this.route.snapshot.params.id;
    this.productService.getProductById(this.id).subscribe(data => {
      this.productDetails = data;
      this.productForm.controls.name.setValue(this.productDetails.name);
      this.productForm.controls.price.setValue(this.productDetails.price.toString().replace('.', ','));
      this.productForm.controls.stock.setValue(this.productDetails.stock);
      this.productForm.controls.description.setValue(this.productDetails.description);
    });
  }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.productDetails.imageBase64);
  }

  backToList() {
    this.showList = true;
    this.router.navigate(['adminPanel'], {state: {data: this.showList}});
  }

  showEditDialog(editModal) {
    const dialogRef = this.dialog.open(editModal);
    console.log('Dodany produkt');
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.resetForm(this.productForm);
      // this.ngOnInit();
    });
  }
  get f() {
    return this.productForm.controls;
  }

  saveChangesProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productDetails.name = this.productForm.get('name').value;
    this.price = this.productForm.get('price').value;
    this.productDetails.price = Number(this.price.toString().replace(',', '.'));
    this.productDetails.stock = this.productForm.get('stock').value;
    this.productDetails.description = this.productForm.get('description').value;
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(formData);
    console.log(this.productDetails);
    const mData = JSON.stringify(this.productDetails);
    formData.append('product', mData);
    this.httpClient.put<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(res);
        this.dialog.closeAll();
        this.ngOnInit();
      },
      (err) => console.log(err.error)
    );
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
    }
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageBase64: any;
}
