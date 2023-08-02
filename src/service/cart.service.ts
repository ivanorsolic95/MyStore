import { Injectable } from '@angular/core';
import { CartItem } from 'src/models/CartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart = new BehaviorSubject<CartItem[]>([])

  constructor() { }

  get cart() {
    return this._cart.asObservable();
  }

  addToCart(item: CartItem): void {
    const currentCart = this._cart.value;

    const foundItem = currentCart.find(CartItem => CartItem.product.id === item.product.id)

    if(foundItem) {
      foundItem.quantity = Number(foundItem.quantity) + Number(item.quantity);
      foundItem.totalPrice += item.totalPrice;
    } else {
      currentCart.push(item);
    }

    this._cart.next(currentCart)
  }

  removeFromCart(productId: number): void {
    let currentCart = this._cart.value;
    currentCart = currentCart.filter(item => item.product.id !== productId);

    this._cart.next(currentCart);
  }

  emptyCart(): void {
    this._cart.next([]);
  }

  logCartItems(): void {
    const currentCart = this._cart.value;
    console.log('Items in the cart:', currentCart);
  }
}
