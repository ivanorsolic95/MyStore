import { Product } from "./Product";

export class CartItem {
    product: Product;
    quantity: number;
    totalPrice: number;
  static quantity: any;

    constructor(product: Product, quantity: number, totalPrice: number) {
        this.product = product;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}