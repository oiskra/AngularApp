import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderForm, ProductForm, PaymentMethod } from './order-form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lab_5-Forms';
  
  
  order!: FormGroup<OrderForm>

  ngOnInit(): void {

    this.order = new FormGroup({
      customersName: new FormControl(''),
      customersSurname: new FormControl(''),
      address: new FormControl(''),
      paymentMethod: new FormControl(),
      product: new FormGroup({
        name: new FormControl(''),
        count: new FormControl(''),
        price: new FormControl('')
      } as ProductForm)
    } as OrderForm);
  
  }
}
