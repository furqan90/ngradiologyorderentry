import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  p:number = 1;
  pageTitle:string = "Orders List";
  constructor(private route: ActivatedRoute, private orderService:OrderService) { }
  orders:any[];
  ordersObservable:Observable<any[]>;
  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.orders = data['orders'];
      this.ordersObservable = Observable.of(this.orders);

      if(this.orders)
      {
        this.pageTitle = this.pageTitle + ` - ${this.orders[0].patient.display}`;
      }
    });
  }

  showJSON(uuid:string)
  {
    this.orderService.getOrderByUUID(uuid).subscribe(res=>{
      alert(JSON.stringify(res));
    }) 
  }

}
