import { Injectable } from '@angular/core';
import { Product } from './product.model'; // Assuming Product interface is defined in 'product.model'

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  removeFromCart(product: Product): void {
    const index = this.cartItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  updateCartItemQuantity(product: Product, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === product.id);
    if (item) {
      item.quantity = quantity;
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  get cartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
  }

  isProductInCart(product: Product): boolean {
    return this.cartItems.some(item => item.product.id === product.id);
  }

  getQuantityInCart(product: Product): number {
    const item = this.cartItems.find(item => item.product.id === product.id);
    return item ? item.quantity : 0;
  }

  decreaseQuantity(product: Product): void {
    const item = this.cartItems.find(item => item.product.id === product.id);
    if (item && item.quantity > 1) { // Check if quantity is greater than 1
      item.quantity--;
    } else if (item && item.quantity === 1) { // Check if quantity is exactly 1
      this.removeFromCart(product);
    }
  }
  
  increaseQuantity(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.addToCart(product);
    }
  }
}
