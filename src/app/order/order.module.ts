import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateEditComponent } from './order-create-edit/order-create-edit.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild(
      [
        { path: 'orders', children:
          [
            { path: '', component:OrderListComponent },
            { path: ':uuid', component: OrderDetailComponent },
            { path: ':uuid/edit', component: OrderCreateEditComponent }
          ]
        }
      ]
      ),
    CommonModule
  ],
  declarations: [OrderListComponent, OrderCreateEditComponent, OrderDetailComponent],
  exports:[ RouterModule ]
})
export class OrderModule { }
