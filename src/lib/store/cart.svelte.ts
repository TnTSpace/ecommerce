import { browser } from '$app/environment';

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  productSizeId: string | null;
  quantity: number;
  priceAtAdd: string;
  product?: any;
  productSize?: any;
}

class CartStore {
  items = $state<CartItem[]>([]);
  recentlyViewed = $state<any[]>([]);
  isLoading = $state(false);
  isUpdating = $state(false);
  isReady = $state(false);

  constructor() {
    if (browser) {
      // Load everything from server
      this.fetchCart();

      const savedViewed = localStorage.getItem('recentlyViewed');
      if (savedViewed) {
        try {
          this.recentlyViewed = JSON.parse(savedViewed);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Failed to parse recently viewed from local storage', e);
        }
      }
    }
  }

  get count() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  get total() {
    return this.items.reduce((acc, item) => acc + (parseFloat(item.priceAtAdd) * item.quantity), 0);
  }

  async fetchCart() {
    if (!browser) return;
    this.isLoading = true;
    try {
      const response = await fetch('/api/cart');
      const result = await response.json();
      if (result.success && result.data) {
        this.items = result.data.items || [];
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch cart', e);
    } finally {
      this.isLoading = false;
      this.isReady = true;
    }
  }

  async addItem(product: any, productSizeId?: string) {
    if (!browser) return;
    this.isUpdating = true;
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          priceAtAdd: product.basePrice, // Product basePrice now includes size calculation
          productSizeId
        })
      });
      const result = await response.json();
      if (result.success) {
        await this.fetchCart();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to add item to cart', e);
    } finally {
      this.isUpdating = false;
    }
  }

  async removeItem(itemId: string) {
    if (!browser) return;
    this.isUpdating = true;
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });
      const result = await response.json();
      if (result.success) {
        this.items = this.items.filter((item) => item.id !== itemId);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to remove item from cart', e);
    } finally {
      this.isUpdating = false;
    }
  }

  async updateQuantity(itemId: string, quantity: number) {
    if (!browser) return;
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }

    this.isUpdating = true;
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity })
      });
      const result = await response.json();
      if (result.success) {
        const item = this.items.find((item) => item.id === itemId);
        if (item) item.quantity = quantity;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to update quantity', e);
    } finally {
      this.isUpdating = false;
    }
  }

  async clear() {
    if (!browser) return;
    const cartId = this.items[0]?.cartId;
    if (!cartId) return;

    this.isUpdating = true;
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clearAll: true, cartId })
      });
      const result = await response.json();
      if (result.success) {
        this.items = [];
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to clear cart', e);
    } finally {
      this.isUpdating = false;
    }
  }

  addViewed(product: any) {
    const filtered = this.recentlyViewed.filter((p) => p.id !== product.id);
    this.recentlyViewed = [product, ...filtered].slice(0, 10);
    this.saveViewed();
  }

  private saveViewed() {
    if (browser) {
      localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    }
  }
}

export const cart = new CartStore();
