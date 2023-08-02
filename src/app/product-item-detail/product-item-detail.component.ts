import { Component, OnInit} from '@angular/core';
import { Product } from 'src/models/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/service/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  product: Product = {} as Product;

  constructor (private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId !== null) {
      this.productService.getProductById(+productId).subscribe(product => {
        this.product = product;
      }, error => {
        console.error('Error fetching product:', error);
      });
    }
  }

  goToProductList () {
    this.router.navigate(['/']);
  }

  onProductAdded(product: Product): void {
    window.alert(`Product ${product.name} added to the cart successfully!`);
  }

}
