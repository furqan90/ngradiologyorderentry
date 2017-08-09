import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateEditComponent } from './order-create-edit/order-create-edit.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { Ng2PaginationModule } from 'ng2-pagination';//new module  from installation
import { FormsModule } from '@angular/forms';
import { PatientService } from '../shared/services/patient.service';
import { AppSessionService } from '../shared/services/app-session.service';
import { AppConstantsService } from '../shared/services/app-constants.service';
import { AppConfig } from '../app-config';
import { OrderListResolverService } from './order-list/order-list-resolver.service';
import { HttpModule } from '@angular/http';
import { OrderService } from './order.service';

@NgModule({
  imports: [ 
    HttpModule,
    FormsModule,
    Ng2PaginationModule,
    RouterModule.forChild(
      [
        { path: 'order-management', component: OrderManagementComponent,
          children:
          [  
            { path: 'patients', component: PatientListComponent },
            { path: '', redirectTo:'patients', pathMatch:"full" },
            { path: 'orders', 
              children:
              [
                { 
                  path: ':uuid/patient', 
                  component:OrderListComponent, 
                  resolve: { orders: OrderListResolverService }
                },
                { path: ':uuid', component: OrderDetailComponent },
                { path: ':uuid/edit', component: OrderCreateEditComponent }
              ]
            }
          ]},
          { path: '' , redirectTo:'order-management', pathMatch:"full" },
        
      ]
      ),
    CommonModule
  ],
  declarations: [
    OrderListComponent, 
    OrderCreateEditComponent, 
    OrderDetailComponent, 
    PatientListComponent, 
    OrderManagementComponent],
    providers:
    [
      OrderService,
      PatientService, 
      AppSessionService, 
      AppConstantsService,  
      AppConfig, 
      OrderListResolverService, 
      { provide: APP_INITIALIZER,
        useFactory: initConfig, // And use it here
        deps: [AppConfig], 
        multi: true 
      }
    ],
  exports:[ RouterModule ]
})
export class OrderModule { }

export function initConfig(config: AppConfig){
 return () => config.load() 
}