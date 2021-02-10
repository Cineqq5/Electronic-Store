import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ProductDetailsComponent } from './admin-panel/product-details/product-details.component';
import { ListProductComponent } from './admin-panel/list-product/list-product.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { ShopCartComponent } from './client-panel/shop-cart/shop-cart.component';
import '@angular/common/locales/global/pl';
import { OrderDetailsComponent } from './client-panel/order-details/order-details.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    ProductDetailsComponent,
    ListProductComponent,
    ClientPanelComponent,
    ShopCartComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
