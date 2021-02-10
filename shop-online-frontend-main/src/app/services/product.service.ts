import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'http://localhost:8080/api/productDetails';
  private allProductUrl = 'http://localhost:8080/api/allProduct';
  private deleteProductUrl = 'http://localhost:8080/api/deleteProduct';
  private allProductToClientUrl = 'http://localhost:8080/api/allProductToClient';
  private orderUrl = 'http://localhost:8080/api/order';
  private statisticsUrl = 'http://localhost:8080/api/statistics';

  constructor(private httpClient: HttpClient) {
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.allProductUrl);
  }

  deleteProductByIds(id: number): Observable<any> {
    return this.httpClient.delete(`${this.deleteProductUrl}/${id}`);
  }

  public getProductById(id: number): Observable<any> {
    return this.httpClient.get(`${this.productUrl}/${id}`);
  }

  public getAllProductsToClient(): Observable<any> {
    return this.httpClient.get(this.allProductToClientUrl);
  }

  saveOrder(order): Observable<any> {
    return this.httpClient.post(this.orderUrl, order);
  }

  getStatistics(): Observable<any> {
    return this.httpClient.get(this.statisticsUrl);
  }
}
