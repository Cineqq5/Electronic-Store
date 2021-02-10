import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {ProductDetailsComponent} from './admin-panel/product-details/product-details.component';
import {ListProductComponent} from './admin-panel/list-product/list-product.component';
import {ClientPanelComponent} from './client-panel/client-panel.component';
import {ShopCartComponent} from './client-panel/shop-cart/shop-cart.component';
import {OrderDetailsComponent} from './client-panel/order-details/order-details.component';


const routes: Routes = [{path: 'adminPanel', component: AdminPanelComponent},
  {path: 'productDetails/:id', component: ProductDetailsComponent},
  {path: '', component: ClientPanelComponent},
  {path: 'shopCart', component: ShopCartComponent},
  {path: 'orderDetails', component: OrderDetailsComponent},
  {path: 'listProduct', component: ListProductComponent},
  {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
