import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/Product';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }

  getProducts(): Observable<Product[]> {
    return this.fetchProducts();
  }

  getProductById(id: number): Observable<Product> {
    return this.fetchProducts().pipe(
      map(products => {
        const product = products.find(product => product.id === id);
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return product;
      })
    );
  }
}
