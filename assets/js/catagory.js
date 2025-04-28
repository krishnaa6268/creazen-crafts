// Cart management and adding items
let cart = [];

// Dummy data for items (Updated URLs and Descriptions)
// Dummy data for items (10 items for each category)
const itemsData = {
  'wedding-invitation': [
    { 
      name: 'Royal Invite', 
      price: 500, 
      rating: 4.5, 
      description: 'An elegant and royal wedding invitation to leave a lasting impression.',
      discount: 50, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Elegant Scroll', 
      price: 600, 
      rating: 4.7, 
      description: 'A classic scroll invitation with beautiful calligraphy.',
      discount: 60, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Classic Fold', 
      price: 450, 
      rating: 4.3, 
      description: 'A simple yet elegant fold invitation with a personal touch.',
      discount: 45, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Floral Touch', 
      price: 550, 
      rating: 4.6, 
      description: 'A delicate wedding invitation with floral designs and vibrant colors.',
      discount: 55, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Golden Charm', 
      price: 700, 
      rating: 5, 
      description: 'A luxury gold-themed invitation with intricate patterns.',
      discount: 70, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Peacock Elegance', 
      price: 750, 
      rating: 4.8, 
      description: 'A peacock-inspired wedding invitation with a vibrant touch.',
      discount: 75, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Velvet Royale', 
      price: 800, 
      rating: 4.9, 
      description: 'A velvet-textured wedding invitation with royal embellishments.',
      discount: 80, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Silk Serenity', 
      price: 950, 
      rating: 4.7, 
      description: 'A silk-based wedding invitation that radiates elegance.',
      discount: 95, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Royal Scroll', 
      price: 650, 
      rating: 4.4, 
      description: 'A scroll wedding invitation fit for royalty with an antique finish.',
      discount: 65, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Traditional Card', 
      price: 400, 
      rating: 4.2, 
      description: 'A traditional paper-based wedding invitation with classic designs.',
      discount: 40, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    }
  ],
  
  'ring-ceremony': [
    { 
      name: 'Gold Platter', 
      price: 1000, 
      rating: 4.6, 
      description: 'A luxurious gold ring ceremony platter to celebrate your special occasion.',
      discount: 100, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Silver Platter', 
      price: 800, 
      rating: 4.4, 
      description: 'A beautiful silver platter for your ring ceremony.',
      discount: 80, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Crystal Platters', 
      price: 1200, 
      rating: 4.8, 
      description: 'Crystal platters that sparkle and shine during your ceremony.',
      discount: 120, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Rosewood Platter', 
      price: 900, 
      rating: 4.5, 
      description: 'Elegant rosewood platters with intricate carvings.',
      discount: 90, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Marble Ring Holder', 
      price: 1300, 
      rating: 4.9, 
      description: 'A luxurious marble holder for your rings.',
      discount: 130, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Luxury Wooden Ring Box', 
      price: 1100, 
      rating: 4.7, 
      description: 'Handcrafted wooden ring box with velvet lining.',
      discount: 110, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Elegant Crystal Vase', 
      price: 750, 
      rating: 4.3, 
      description: 'A crystal vase perfect for your ring ceremony décor.',
      discount: 75, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Golden Ring Stand', 
      price: 1000, 
      rating: 4.6, 
      description: 'A golden stand to hold your precious rings.',
      discount: 100, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Candlelit Holder', 
      price: 850, 
      rating: 4.4, 
      description: 'A candle holder to add warmth and beauty to your ceremony.',
      discount: 85, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Platinum Ring Box', 
      price: 1500, 
      rating: 4.9, 
      description: 'A platinum box that will preserve your ring forever.',
      discount: 150, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    }
  ],
  
  'hamper-baskets': [
    { 
      name: 'Luxury Fruit Basket', 
      price: 500, 
      rating: 4.5, 
      description: 'A basket filled with a variety of fresh fruits and delicacies.',
      discount: 50, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Spa Hamper', 
      price: 800, 
      rating: 4.7, 
      description: 'A relaxing spa hamper with essential oils and skincare products.',
      discount: 80, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Gourmet Basket', 
      price: 650, 
      rating: 4.3, 
      description: 'A basket of hand-picked gourmet snacks and chocolates.',
      discount: 65, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Chocolate Hamper', 
      price: 550, 
      rating: 4.6, 
      description: 'A delectable hamper filled with premium chocolates.',
      discount: 55, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Tea & Coffee Basket', 
      price: 450, 
      rating: 4.5, 
      description: 'A basket filled with premium tea leaves and coffee beans.',
      discount: 45, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Eco-friendly Hamper', 
      price: 700, 
      rating: 4.8, 
      description: 'An eco-friendly hamper with organic products.',
      discount: 70, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Baby Care Hamper', 
      price: 600, 
      rating: 4.9, 
      description: 'A gentle hamper for the care of your newborn.',
      discount: 60, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Wine Hamper', 
      price: 850, 
      rating: 4.4, 
      description: 'A fine selection of wines for your special occasion.',
      discount: 85, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Luxury Perfume Hamper', 
      price: 950, 
      rating: 5, 
      description: 'A selection of luxury perfumes for every occasion.',
      discount: 95, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    },
    { 
      name: 'Assorted Snacks Basket', 
      price: 400, 
      rating: 4.2, 
      description: 'An assortment of savory snacks and treats.',
      discount: 40, 
      image: '../assets/images/page-imgages/dummy-img.jpg'
    }
  ]
};

// More categories (up to 10) can be added similarly.


// Display Category Items
function showCategory(category) {
  const title = document.getElementById('category-title');
  const itemsDiv = document.getElementById('items');
  
  title.innerText = category.replace(/-/g, ' ').toUpperCase();
  itemsDiv.innerHTML = '';

  const items = itemsData[category];
  if (items && items.length > 0) {
    items.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item-card';
      itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="rating">${'★'.repeat(Math.round(item.rating))}</div>
        <div class="discount">Discount: ₹${item.discount}</div>
        <button onclick="addToCart('${item.name}', ${item.price}, ${item.discount})">Add ₹${item.price}</button>
      `;
      itemsDiv.appendChild(itemCard);
    });
  } else {
    itemsDiv.innerHTML = '<p>No items available in this category.</p>';
  }
}

// Add items to the cart
function addToCart(name, price, discount) {
  cart.push({ name, price, discount });
  updateCart();
}

// Update the cart UI
function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const subtotalDiv = document.getElementById('subtotal');
  const discountDiv = document.getElementById('discount');
  const totalDiv = document.getElementById('total-amount');
  
  cartItemsDiv.innerHTML = '';
  let subtotal = 0;
  let discount = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `${item.name} - ₹${item.price}`;
    cartItemsDiv.appendChild(cartItem);
    subtotal += item.price;
    discount += item.discount;
  });

  subtotalDiv.innerText = subtotal;
  discountDiv.innerText = discount;
  totalDiv.innerText = subtotal - discount;
}

// Show the cart modal
function showCart() {
  document.getElementById('cart-modal').style.display = 'block';
}

// Close the cart modal
function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

// Proceed to the delivery form
function showDeliveryForm() {
  document.getElementById('cart-modal').style.display = 'none';
  document.getElementById('delivery-form').style.display = 'block';
}

// Process the payment
function processPayment() {
  document.getElementById('payment-total').innerText = document.getElementById('total-amount').innerText;
  document.getElementById('payment-page').style.display = 'block';
  document.getElementById('delivery-form').style.display = 'none';
}

// Cancel the payment process
function cancelPayment() {
  document.getElementById('payment-page').style.display = 'none';
}
