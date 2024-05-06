import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/CartItem';
import { CartService } from 'src/service/cart.service';
import { ConfirmationService } from 'src/service/confirmation.service';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  private currentUrl: string;
  cartItems: CartItem[] = []
  name: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  postalCode: string = '';
  phoneNumber: string = '';
  city: string = '';
  paymentMethod: string = '';
  creditCard: string = '';
  nameOnCard: string = '';
  expirationDate: string = '';
  cvc: string = '';

  constructor (private cartService: CartService,
               private confirmationService: ConfirmationService,
               private router: Router,
               private toastr: ToastrService) 
  
  {
    this.currentUrl = this.router.url;

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        if (this.currentUrl === '/message' && event.url !== '/message') {
          this.cartService.emptyCart();
        }
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe(items => this.cartItems = items)
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

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.toastr.warning('Product removed from the cart!');
  }


  onSubmit(): void {
    if (!this.name || !this.lastName || !this.email || !this.paymentMethod || !this.address || !this.city || !this.postalCode || !this.phoneNumber || (this.paymentMethod === 'Credit card' && (!this.nameOnCard || !this.creditCard || !this.expirationDate || !this.cvc))) {
    alert('Please fill in all required fields with valid information.');
    return;
    }
    this.confirmationService.setName(this.name);
    this.confirmationService.setLastName(this.lastName);
    this.confirmationService.setAddress(this.address);
    this.confirmationService.setPostalCode(this.postalCode);
    this.confirmationService.setCity(this.city);
    this.confirmationService.setPaymentMethod(this.paymentMethod);
    this.confirmationService.setCreditCard(this.creditCard);
    this.router.navigate(['message']);
  }    
}