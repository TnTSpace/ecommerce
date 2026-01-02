import { browser } from '$app/environment';

class CartStore {
  items = $state<{ product: any; quantity: number }[]>([]);
  recentlyViewed = $state<any[]>([]);

  constructor() {
    if (browser) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          this.items = JSON.parse(savedCart);
        } catch (e) {
          console.error('Failed to parse cart from local storage', e);
        }
      }
      const savedViewed = localStorage.getItem('recentlyViewed');
      if (savedViewed) {
        try {
          this.recentlyViewed = JSON.parse(savedViewed);
        } catch (e) {
          console.error('Failed to parse recently viewed from local storage', e);
        }
      }
    }
  }

  get count() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  addItem(product: any) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.save();
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.save();
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      }
    }
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  addViewed(product: any) {
    const filtered = this.recentlyViewed.filter((p) => p.id !== product.id);
    this.recentlyViewed = [product, ...filtered].slice(0, 10);
    this.saveViewed();
  }

  private save() {
    if (browser) {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  private saveViewed() {
    if (browser) {
      localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    }
  }
}

export const cart = new CartStore();
