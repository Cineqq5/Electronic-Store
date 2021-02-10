import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'delete', 'more'];
  dataSource;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(e => {
      console.log(e);
      this.dataSource = new MatTableDataSource<ProductDetails>(e);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteProduct(id: number) {
    this.productService.deleteProductByIds(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    }, e => {
      console.log(e.error.message);
    });
  }

  showDetails(id: number) {
    this.router.navigate(['productDetails', id]);
  }
}
interface ProductDetails {
  name: string;
  id: number;
  price: number;
  stock: number;
}
