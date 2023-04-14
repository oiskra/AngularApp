import { FormControl, FormGroup } from "@angular/forms";

export type ProductForm = {
    name: FormControl<string>,
    count: FormControl<string>,
    price: FormControl<string>
};

export type OrderForm = {
    customersName: FormControl<string>,
    customersSurname: FormControl<string>,
    address: FormControl<string>,
    paymentMethod: FormControl<PaymentMethod>,
    product: FormGroup<ProductForm>
}

export enum PaymentMethod {
    paypal,
    creditCard,
    debitCard
}