import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/models/CartItem';
import { CartService } from 'src/service/cart.service';
import { ProductService } from 'src/service/product.service';
import { Product } from 'src/models/Product';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []
  quantity: number = 1;
 @Input() product: Product = new Product;
 @Output() productAdded = new EventEmitter<Product>();

  constructor (private cartService: CartService,
               private productService: ProductService,
               private route: ActivatedRoute,
               private toastr: ToastrService) {
    this.cartService.cart.subscribe(items => this.cartItems = items)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productIdParam = params.get('productId'); // Get productId from URL

      if (productIdParam !== null) { 
        const productId = +productIdParam;

        if (!isNaN(productId)) { // Check if productId is a number
          this.productService.getProductById(productId).pipe(first()).subscribe(
            product => {
              this.product = product;
            },
            error => {
              console.error('Error fetching product', error);
            }
          );
        }
      }
    }); 
}

  onSubmit(): void {
    if (this.product) {
      this.toastr.success('Product added to the cart!');
      const totalPrice = this.product.price * this.quantity;
      const cartItem = new CartItem(this.product, this.quantity, totalPrice);
      this.cartService.addToCart(cartItem);
      this.productAdded.emit(this.product);
    }
  }

  validateQuantity(quantity: number): void {
   
    if (quantity > 10) {
      this.quantity = 10;
      window.alert('You can only add up to 10 units of a product at a time.');
    }
  }
   
  }
