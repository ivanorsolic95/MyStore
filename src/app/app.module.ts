import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/service/product.service';
import { CartService } from 'src/service/cart.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductItemDetailComponent,
    CartComponent,
    ConfirmationComponent,
    ConfirmationMessageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [ProductService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
