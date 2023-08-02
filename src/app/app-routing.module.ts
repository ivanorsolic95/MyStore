import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'details/:productId', component: ProductItemDetailComponent},
  { path: 'cart', component: ConfirmationComponent},
  { path: 'message', component: ConfirmationMessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
