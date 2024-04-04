import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  get cartTotal(): number {
    return this.cartService.cartTotal;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) { // Check if quantity is greater than 1
      this.cartService.updateCartItemQuantity(item.product, item.quantity - 1);
    } else if (item.quantity === 1) { // Check if quantity is exactly 1
      this.removeFromCart(item);
    }
  }
  
  increaseQuantity(item: any): void {
    this.cartService.updateCartItemQuantity(item.product, item.quantity + 1);
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item.product);
  }
}