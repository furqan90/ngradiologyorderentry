import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Order } from '../order';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';

@Injectable()
export class OrderListResolverService implements Resolve<any>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let uuid = route.params['uuid'];
    return this.orderService.getOrdersByPatientUUID(uuid);
  }

  constructor(private orderService:OrderService) { }

}
