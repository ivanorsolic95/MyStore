import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/CartItem';
import { CartService } from 'src/service/cart.service';
import { ConfirmationService } from 'src/service/confirmation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  cartItems: CartItem[] = []
  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';

  constructor (private cartService: CartService,
               private confirmationService: ConfirmationService,
               private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe(items => this.cartItems = items)
  }

  calculateTotalCost(): string {
    let total = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    return total.toFixed(2);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    window.alert('Product removed from cart!');
  }


  onSubmit(): void {
    if (!this.fullName || this.fullName.length < 3 || 
        !this.address || this.address.length < 6) {
      alert('Please fill in all required fields with valid information.');
      return;
    }
    
    this.confirmationService.setFullName(this.fullName);
    this.cartService.emptyCart();
    this.router.navigate(['message']);
    
  }

  onFullNameChange(newName: string): void {
    console.log(`Full Name has been updated to: ${newName}`);
  }
  
  onAddressChange(newAddress: string): void {
    console.log(`Address has been updated to: ${newAddress}`);
  }
  
  onCreditCardNumberChange(newNumber: string): void {
    console.log(`Credit Card Number has been updated to: ${newNumber}`);
  }
    
}