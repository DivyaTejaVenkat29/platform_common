import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../shared services/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../shared services/product-service.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient, private router: Router,private productService: ProductService ,private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

    
  get cartCount(): number {
    return this.cartService.cartCount;
  }

  isProductInCart(product: Product): boolean {
    return this.cartService.isProductInCart(product);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: Product): void {
    this.cartService.decreaseQuantity(product);
  }

  increaseQuantity(product: Product): void {
    this.cartService.increaseQuantity(product);
  }

  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
