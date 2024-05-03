import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'src/service/confirmation.service';
import { CartService } from 'src/service/cart.service';
import { Router} from '@angular/router';
import { CartItem } from 'src/models/CartItem';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent implements OnInit {
  cartItems: CartItem[] = []
  name: string = '';
  lastName: string = '';
  address:string = '';
  postalCode:string = '';
  city:string = '';
  paymentMethod:string = '';
  creditCard:string = '';

  constructor(private confirmationService: ConfirmationService,
              private cartService: CartService,
              private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe(items => this.cartItems = items)
    this.confirmationService.fullName$.subscribe(name => this.name = name);
    this.confirmationService.lastName$.subscribe(lastName => this.lastName = lastName);
    this.confirmationService.address$.subscribe(address => this.address = address);
    this.confirmationService.postalCode$.subscribe(postalCode => this.postalCode = postalCode);
    this.confirmationService.city$.subscribe(city => this.city = city);
    this.confirmationService.paymentMethod$.subscribe(paymentMethod => this.paymentMethod = paymentMethod);
    this.confirmationService.creditCard$.subscribe(creditCard => this.creditCard = creditCard);
  }

  goToProductList () {
    this.router.navigate(['/']);
  }

  calculateTotalCost(): string {
    let total = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    return total.toFixed(2);
  }

  additionalcost(): number {
    let baseCost = parseFloat(this.calculateTotalCost());
    let additionalCost = baseCost + 5;
    return parseFloat(additionalCost.toFixed(2));
  }

}
