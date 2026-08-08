/* ---------------------------------------------
   Creazen Crafts - Global E-Commerce & Cart Engine
--------------------------------------------- */

(function () {
  'use strict';

  const CART_KEY = 'creazen_cart';
  const FREE_SHIPPING_THRESHOLD = 999;

  function resolveAssetPath(rawPath) {
    if (!rawPath) return '';
    if (rawPath.startsWith('http://') || rawPath.startsWith('https://') || rawPath.startsWith('data:')) {
      return rawPath;
    }
    const cleanPath = rawPath.replace(/^(\.\/|\.\.\/)+/, '');
    const isSubDir = window.location.pathname.includes('/src/');
    return (isSubDir ? '../' : './') + cleanPath;
  }

  class CartEngine {
    constructor() {
      this.items = this.loadCart();
      this.initUI();
    }

    loadCart() {
      try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error('Failed to load cart from localStorage:', e);
        return [];
      }
    }

    saveCart() {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(this.items));
        this.updateBadge();
        this.renderDrawer();
      } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
      }
    }

    addItem(product) {
      if (!product || !product.name) return;
      
      const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');
      const existing = this.items.find(item => item.id === productId);

      if (existing) {
        existing.quantity += (product.quantity || 1);
      } else {
        this.items.push({
          id: productId,
          name: product.name,
          price: Number(product.price) || 0,
          originalPrice: Number(product.originalPrice) || Number(product.price) * 1.2,
          discount: Number(product.discount) || 0,
          image: product.image || 'assets/images/services/service-1.jpg',
          category: product.category || 'Handcrafted',
          quantity: product.quantity || 1
        });
      }

      this.saveCart();
      this.showToast(`"${product.name}" added to cart!`, 'success');
      this.openDrawer();
    }

    removeItem(id) {
      const index = this.items.findIndex(item => item.id === id);
      if (index > -1) {
        const name = this.items[index].name;
        this.items.splice(index, 1);
        this.saveCart();
        this.showToast(`Removed "${name}" from cart.`, 'info');
      }
    }

    updateQuantity(id, delta) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          this.removeItem(id);
        } else {
          this.saveCart();
        }
      }
    }

    clearCart() {
      this.items = [];
      this.saveCart();
    }

    getTotalCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTotalDiscount() {
      return this.items.reduce((sum, item) => sum + (item.discount * item.quantity), 0);
    }

    getFinalTotal() {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 70;
      return subtotal + shipping;
    }

    // ---------------------------------------------
    // Dynamic UI Construction
    // ---------------------------------------------
    initUI() {
      document.addEventListener('DOMContentLoaded', () => {
        this.injectElements();
        this.updateBadge();
        this.renderDrawer();
        this.bindEvents();
      });
    }

    injectElements() {
      // Cart Drawer
      if (!document.getElementById('cartDrawer')) {
        const drawerHTML = `
          <div class="cart-drawer-overlay" id="cartOverlay"></div>
          <div class="cart-drawer" id="cartDrawer">
            <div class="cart-drawer-header">
              <div class="cart-title-group">
                <i class="fa-solid fa-bag-shopping"></i>
                <h3>Your Shopping Bag</h3>
                <span class="cart-count-badge" id="drawerCountBadge">0</span>
              </div>
              <button class="cart-close-btn" id="cartCloseBtn" aria-label="Close Cart">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="free-shipping-bar" id="freeShippingBar">
              <div class="shipping-bar-text" id="shippingBarText">Add ₹999 for FREE Express Shipping</div>
              <div class="shipping-bar-progress">
                <div class="shipping-bar-fill" id="shippingBarFill" style="width: 0%;"></div>
              </div>
            </div>

            <div class="cart-drawer-body" id="cartDrawerBody">
              <!-- Cart items rendered dynamically -->
            </div>

            <div class="cart-drawer-footer" id="cartDrawerFooter">
              <div class="cart-summary-rows">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span id="cartSubtotal">₹0</span>
                </div>
                <div class="summary-row text-discount" id="cartDiscountRow">
                  <span>Total Savings</span>
                  <span id="cartDiscount">-₹0</span>
                </div>
                <div class="summary-row">
                  <span>Estimated Shipping</span>
                  <span id="cartShipping">₹0</span>
                </div>
                <div class="summary-row total-row">
                  <span>Total Amount</span>
                  <span id="cartTotal">₹0</span>
                </div>
              </div>
              <button class="checkout-btn" id="checkoutBtn">
                <span>Proceed to Checkout</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
              <div class="cart-secure-tag">
                <i class="fa-solid fa-shield-halved"></i> 100% Secure Checkout & Free Returns
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', drawerHTML);
      }

      // Checkout Modal
      if (!document.getElementById('checkoutModal')) {
        const checkoutHTML = `
          <div class="modal-backdrop" id="checkoutBackdrop"></div>
          <div class="checkout-modal" id="checkoutModal">
            <button class="modal-close-btn" id="checkoutCloseBtn"><i class="fa-solid fa-xmark"></i></button>
            <div class="checkout-modal-header">
              <h2>Complete Your Order</h2>
              <div class="checkout-steps">
                <div class="step-pill active" id="step1Pill">1. Address</div>
                <div class="step-pill" id="step2Pill">2. Payment</div>
                <div class="step-pill" id="step3Pill">3. Confirmation</div>
              </div>
            </div>

            <div class="checkout-modal-body">
              <!-- Step 1: Address -->
              <form class="checkout-step-panel active" id="step1Panel">
                <h3>Delivery Address</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" id="chkName" placeholder="e.g. Ananya Sharma" required>
                  </div>
                  <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" id="chkPhone" placeholder="+91 98765 43210" required>
                  </div>
                  <div class="form-group full-width">
                    <label>Street Address *</label>
                    <input type="text" id="chkAddress" placeholder="Flat, House no., Building, Street" required>
                  </div>
                  <div class="form-group">
                    <label>City *</label>
                    <input type="text" id="chkCity" placeholder="Mumbai" required>
                  </div>
                  <div class="form-group">
                    <label>PIN Code *</label>
                    <input type="text" id="chkPincode" placeholder="400001" required>
                  </div>
                </div>
                <button type="button" class="btn btn-primary" id="toStep2Btn">
                  Continue to Payment <i class="fa-solid fa-arrow-right"></i>
                </button>
              </form>

              <!-- Step 2: Payment -->
              <div class="checkout-step-panel" id="step2Panel">
                <h3>Select Payment Method</h3>
                <div class="payment-options">
                  <label class="payment-card active">
                    <input type="radio" name="paymentMethod" value="upi" checked>
                    <div class="payment-card-content">
                      <i class="fa-solid fa-qrcode fa-xl"></i>
                      <div>
                        <strong>UPI / Google Pay / PhonePe</strong>
                        <p>Instant 5% extra discount on UPI</p>
                      </div>
                    </div>
                  </label>
                  <label class="payment-card">
                    <input type="radio" name="paymentMethod" value="card">
                    <div class="payment-card-content">
                      <i class="fa-solid fa-credit-card fa-xl"></i>
                      <div>
                        <strong>Credit / Debit Card</strong>
                        <p>Visa, Mastercard, RuPay & Amex</p>
                      </div>
                    </div>
                  </label>
                  <label class="payment-card">
                    <input type="radio" name="paymentMethod" value="cod">
                    <div class="payment-card-content">
                      <i class="fa-solid fa-money-bill-wave fa-xl"></i>
                      <div>
                        <strong>Cash on Delivery (COD)</strong>
                        <p>Pay with cash upon arrival</p>
                      </div>
                    </div>
                  </label>
                </div>

                <div class="order-summary-box">
                  <div class="summary-line">
                    <span>Payable Amount</span>
                    <strong id="chkPayableAmount">₹0</strong>
                  </div>
                </div>

                <div class="modal-actions-row">
                  <button type="button" class="btn btn-outline" id="backToStep1Btn">Back</button>
                  <button type="button" class="btn btn-primary" id="placeOrderBtn">
                    Place Order & Pay <i class="fa-solid fa-check"></i>
                  </button>
                </div>
              </div>

              <!-- Step 3: Success Confirmation -->
              <div class="checkout-step-panel text-center" id="step3Panel">
                <div class="success-icon-wrap">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
                <h2>Order Placed Successfully!</h2>
                <p class="order-id-badge">Order ID: <span id="placedOrderId">CRZ-84920</span></p>
                <p class="delivery-est">Estimated Delivery: <strong>3-5 Business Days</strong></p>
                <p class="success-note">Thank you for crafting memories with Creazen Crafts. A confirmation has been sent to your registered email.</p>
                <button type="button" class="btn btn-primary" id="finishOrderBtn">Continue Shopping</button>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', checkoutHTML);
      }

      // Quick View Modal
      if (!document.getElementById('quickViewModal')) {
        const qvHTML = `
          <div class="modal-backdrop" id="qvBackdrop"></div>
          <div class="quick-view-modal" id="quickViewModal">
            <button class="modal-close-btn" id="qvCloseBtn"><i class="fa-solid fa-xmark"></i></button>
            <div class="qv-content" id="qvContent">
              <!-- Dynamically populated -->
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', qvHTML);
      }

      // Toast Container
      if (!document.getElementById('toastContainer')) {
        const toastHTML = `<div class="toast-container" id="toastContainer"></div>`;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
      }
    }

    bindEvents() {
      // Cart drawer toggles
      const cartCloseBtn = document.getElementById('cartCloseBtn');
      const cartOverlay = document.getElementById('cartOverlay');
      if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => this.closeDrawer());
      if (cartOverlay) cartOverlay.addEventListener('click', () => this.closeDrawer());

      // Header cart icon click listener
      document.addEventListener('click', (e) => {
        const cartBtn = e.target.closest('#headerCartBtn') || e.target.closest('.header-cart-trigger');
        if (cartBtn) {
          e.preventDefault();
          this.openDrawer();
        }
      });

      // Checkout modal triggers
      const checkoutBtn = document.getElementById('checkoutBtn');
      const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
      const checkoutBackdrop = document.getElementById('checkoutBackdrop');
      const toStep2Btn = document.getElementById('toStep2Btn');
      const backToStep1Btn = document.getElementById('backToStep1Btn');
      const placeOrderBtn = document.getElementById('placeOrderBtn');
      const finishOrderBtn = document.getElementById('finishOrderBtn');

      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          if (this.items.length === 0) {
            this.showToast('Your cart is empty! Add items to checkout.', 'warning');
            return;
          }
          this.closeDrawer();
          this.openCheckoutModal();
        });
      }

      if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', () => this.closeCheckoutModal());
      if (checkoutBackdrop) checkoutBackdrop.addEventListener('click', () => this.closeCheckoutModal());

      if (toStep2Btn) {
        toStep2Btn.addEventListener('click', (e) => {
          const form = document.getElementById('step1Panel');
          if (form.checkValidity()) {
            e.preventDefault();
            this.goToStep(2);
          } else {
            form.reportValidity();
          }
        });
      }

      if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', () => this.goToStep(1));
      }

      if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
          const orderId = 'CRZ-' + Math.floor(10000 + Math.random() * 90000);
          document.getElementById('placedOrderId').textContent = orderId;
          this.clearCart();
          this.goToStep(3);
        });
      }

      if (finishOrderBtn) {
        finishOrderBtn.addEventListener('click', () => this.closeCheckoutModal());
      }

      // Quick View Close
      const qvCloseBtn = document.getElementById('qvCloseBtn');
      const qvBackdrop = document.getElementById('qvBackdrop');
      if (qvCloseBtn) qvCloseBtn.addEventListener('click', () => this.closeQuickView());
      if (qvBackdrop) qvBackdrop.addEventListener('click', () => this.closeQuickView());
    }

    openDrawer() {
      document.getElementById('cartDrawer')?.classList.add('open');
      document.getElementById('cartOverlay')?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeDrawer() {
      document.getElementById('cartDrawer')?.classList.remove('open');
      document.getElementById('cartOverlay')?.classList.remove('active');
      document.body.style.overflow = '';
    }

    openCheckoutModal() {
      this.goToStep(1);
      document.getElementById('chkPayableAmount').textContent = `₹${this.getFinalTotal()}`;
      document.getElementById('checkoutModal')?.classList.add('active');
      document.getElementById('checkoutBackdrop')?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeCheckoutModal() {
      document.getElementById('checkoutModal')?.classList.remove('active');
      document.getElementById('checkoutBackdrop')?.classList.remove('active');
      document.body.style.overflow = '';
    }

    goToStep(stepNum) {
      [1, 2, 3].forEach(num => {
        document.getElementById(`step${num}Pill`)?.classList.toggle('active', num === stepNum);
        document.getElementById(`step${num}Panel`)?.classList.toggle('active', num === stepNum);
      });
    }

    openQuickView(product) {
      const qvContent = document.getElementById('qvContent');
      if (!qvContent || !product) return;

      qvContent.innerHTML = `
        <div class="qv-grid">
          <div class="qv-img-box">
            <img src="${resolveAssetPath(product.image)}" alt="${product.name}">
            ${product.discount ? `<span class="qv-badge">Save ₹${product.discount}</span>` : ''}
          </div>
          <div class="qv-info">
            <span class="qv-category">${product.category || 'Handcrafted Collection'}</span>
            <h2>${product.name}</h2>
            <div class="qv-rating">
              <span class="stars">${'★'.repeat(Math.round(product.rating || 5))}${'☆'.repeat(5 - Math.round(product.rating || 5))}</span>
              <span class="rating-val">${product.rating || 5.0} (48 reviews)</span>
            </div>
            <div class="qv-price-box">
              <span class="qv-price">₹${product.price}</span>
              ${product.originalPrice ? `<span class="qv-orig-price">₹${product.originalPrice}</span>` : ''}
            </div>
            <p class="qv-desc">${product.description || 'A exquisitely crafted piece brought to life by master artisans using premium materials.'}</p>
            <div class="qv-actions">
              <button class="btn btn-primary btn-lg" id="qvAddToCartBtn">
                <i class="fa-solid fa-bag-shopping"></i> Add to Bag
              </button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('qvAddToCartBtn')?.addEventListener('click', () => {
        this.addItem(product);
        this.closeQuickView();
      });

      document.getElementById('quickViewModal')?.classList.add('active');
      document.getElementById('qvBackdrop')?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeQuickView() {
      document.getElementById('quickViewModal')?.classList.remove('active');
      document.getElementById('qvBackdrop')?.classList.remove('active');
      document.body.style.overflow = '';
    }

    updateBadge() {
      const count = this.getTotalCount();
      document.querySelectorAll('.cart-badge-val').forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
      });
      const drawerCountBadge = document.getElementById('drawerCountBadge');
      if (drawerCountBadge) drawerCountBadge.textContent = count;
    }

    renderDrawer() {
      const body = document.getElementById('cartDrawerBody');
      if (!body) return;

      const subtotal = this.getSubtotal();
      const discount = this.getTotalDiscount();
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 70;
      const finalTotal = subtotal === 0 ? 0 : subtotal + shipping;

      // Free shipping progress bar
      const barFill = document.getElementById('shippingBarFill');
      const barText = document.getElementById('shippingBarText');
      if (barFill && barText) {
        if (subtotal >= FREE_SHIPPING_THRESHOLD) {
          barFill.style.width = '100%';
          barText.innerHTML = '🎉 You unlocked <strong>FREE Express Shipping!</strong>';
        } else {
          const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
          const needed = FREE_SHIPPING_THRESHOLD - subtotal;
          barFill.style.width = `${pct}%`;
          barText.innerHTML = `Add <strong>₹${needed}</strong> more to unlock FREE Express Shipping`;
        }
      }

      const catLink = window.location.pathname.includes('/src/') ? './catagory.html' : './src/catagory.html';
      if (this.items.length === 0) {
        body.innerHTML = `
          <div class="empty-cart-state">
            <i class="fa-solid fa-basket-shopping fa-3x"></i>
            <h4>Your Bag is Empty</h4>
            <p>Explore our handcrafted collection and add joy to your everyday moments.</p>
            <a href="${catLink}" class="btn btn-outline btn-sm" onclick="window.CreazenCart.closeDrawer()">Explore Crafts</a>
          </div>
        `;
      } else {
        body.innerHTML = this.items.map(item => `
          <div class="cart-item-row" data-id="${item.id}">
            <img src="${resolveAssetPath(item.image)}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h4 class="cart-item-title">${item.name}</h4>
              <div class="cart-item-price-line">
                <span class="cart-item-price">₹${item.price}</span>
                ${item.originalPrice ? `<span class="cart-item-orig">₹${item.originalPrice}</span>` : ''}
              </div>
              <div class="cart-qty-row">
                <div class="qty-stepper">
                  <button class="qty-btn" onclick="window.CreazenCart.updateQuantity('${item.id}', -1)">-</button>
                  <span class="qty-val">${item.quantity}</span>
                  <button class="qty-btn" onclick="window.CreazenCart.updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="window.CreazenCart.removeItem('${item.id}')">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }

      // Update footer sums
      const subEl = document.getElementById('cartSubtotal');
      const discEl = document.getElementById('cartDiscount');
      const shipEl = document.getElementById('cartShipping');
      const totEl = document.getElementById('cartTotal');

      if (subEl) subEl.textContent = `₹${subtotal}`;
      if (discEl) discEl.textContent = `-₹${discount}`;
      if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
      if (totEl) totEl.textContent = `₹${finalTotal}`;
    }

    showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast-message toast-${type}`;
      
      const iconMap = {
        success: 'fa-circle-check',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info',
        error: 'fa-circle-xmark'
      };

      toast.innerHTML = `
        <i class="fa-solid ${iconMap[type] || 'fa-circle-info'}"></i>
        <span>${message}</span>
      `;

      container.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 10);

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }
  }

  window.CreazenCart = new CartEngine();
})();
