// ---------------------------------------------
// Creazen Crafts - Category & Product Showcase JS
// ---------------------------------------------

const itemsData = {
  'wedding-invitation': [
    { 
      id: 'wed-01',
      name: 'Royal Heritage Gold Scroll Invite', 
      price: 599, 
      originalPrice: 1199,
      rating: 4.9, 
      category: 'Wedding Invitation',
      description: 'An exquisite gold-embossed scroll wedding invitation packaged in a royal velvet box.',
      discount: 600, 
      image: '../assets/images/services/service-1.jpg'
    },
    { 
      id: 'wed-02',
      name: 'Floral Laser-Cut Elegance Card', 
      price: 650, 
      originalPrice: 999,
      rating: 4.8, 
      category: 'Wedding Invitation',
      description: 'Intricate floral laser-cut envelope card with gold foil monogram inserts.',
      discount: 349, 
      image: '../assets/images/services/service-3.jpg'
    },
    { 
      id: 'wed-03',
      name: 'Classic Vintage Envelope Set', 
      price: 450, 
      originalPrice: 750,
      rating: 4.5, 
      category: 'Wedding Invitation',
      description: 'Handmade deckle-edge paper invitation sealed with custom wax stamp.',
      discount: 300, 
      image: '../assets/images/page-imgages/grid-1.jpg'
    },
    { 
      id: 'wed-04',
      name: 'Peacock Motif Luxury Box Invite', 
      price: 850, 
      originalPrice: 1499,
      rating: 5.0, 
      category: 'Wedding Invitation',
      description: 'Hand-painted peacock artwork box invitation with dried flower petals.',
      discount: 649, 
      image: '../assets/images/page-imgages/grid-2.jpg'
    }
  ],
  
  'ring-ceremony': [
    { 
      id: 'ring-01',
      name: 'Velvet Rose Gold Ring Platter', 
      price: 1200, 
      originalPrice: 1800,
      rating: 4.9, 
      category: 'Ring Ceremony Platter',
      description: 'Handcrafted plush velvet ring tray featuring pearl border and floral accent ring holders.',
      discount: 600, 
      image: '../assets/images/services/service-2.jpg'
    },
    { 
      id: 'ring-02',
      name: 'Crystal Glass Dome Ring Tray', 
      price: 1450, 
      originalPrice: 2200,
      rating: 5.0, 
      category: 'Ring Ceremony Platter',
      description: 'Luminous crystal glass dome ring display with LED fairy lighting.',
      discount: 750, 
      image: '../assets/images/services/service-3.jpg'
    }
  ],

  'hamper-baskets': [
    { 
      id: 'hamp-01',
      name: 'Royal Gourmet Celebration Trunk', 
      price: 1899, 
      originalPrice: 2500,
      rating: 4.8, 
      category: 'Hamper Baskets',
      description: 'Assorted premium artisan dry fruits, scented soy candle & handmade chocolate box.',
      discount: 601, 
      image: '../assets/images/services/service-4.jpg'
    },
    { 
      id: 'hamp-02',
      name: 'Handwoven Cane Spa & Wellness Basket', 
      price: 1299, 
      originalPrice: 1799,
      rating: 4.7, 
      category: 'Hamper Baskets',
      description: 'Eco-friendly cane basket filled with organic bath salts, aromatherapy essential oils.',
      discount: 500, 
      image: '../assets/images/services/service-1.jpg'
    }
  ],

  'trunk-boxes': [
    {
      id: 'trunk-01',
      name: 'Hand-Painted Wooden Trousseau Trunk',
      price: 2499,
      originalPrice: 3500,
      rating: 4.9,
      category: 'Trunk Boxes',
      description: 'Vintage teakwood trousseau box with brass latches and custom initials painting.',
      discount: 1001,
      image: '../assets/images/page-imgages/grid-3.jpg'
    }
  ],

  'floral-jewellery': [
    {
      id: 'flor-01',
      name: 'Haldi & Mehendi Fresh Floral Set',
      price: 799,
      originalPrice: 1299,
      rating: 4.8,
      category: 'Floral Jewellery',
      description: 'Complete set featuring necklace, earrings, maang tikka & matching floral haathphool.',
      discount: 500,
      image: '../assets/images/page-imgages/grid-4.jpg'
    }
  ]
};

// Default fallback items if category not found
const defaultItems = itemsData['wedding-invitation'];

function showCategory(categoryKey) {
  const title = document.getElementById('category-title');
  const itemsDiv = document.getElementById('items');
  if (!itemsDiv) return;

  const displayTitle = categoryKey.replace(/-/g, ' ').toUpperCase();
  if (title) title.innerText = displayTitle;

  // Active sub-header menu highlighting
  document.querySelectorAll('.header-2 nav ul li a').forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector(`.header-2 nav ul li a[onclick*="${categoryKey}"]`);
  if (activeLink) activeLink.classList.add('active');

  const items = itemsData[categoryKey] || defaultItems;
  itemsDiv.innerHTML = '';

  function getCategoryAssetPath(path) {
    if (!path) return '';
    const clean = path.replace(/^(\.\/|\.\.\/)+/, '');
    const isSub = window.location.pathname.includes('/src/');
    return (isSub ? '../' : './') + clean;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const imgSrc = getCategoryAssetPath(item.image);
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${imgSrc}" alt="${item.name}" class="product-img">
        <span class="product-discount-badge">Save ₹${item.discount}</span>
        <button class="quick-view-btn" onclick='window.CreazenCart.openQuickView(${JSON.stringify(item)})'>
          <i class="fa-regular fa-eye"></i> Quick View
        </button>
      </div>
      <div class="product-card-body">
        <span class="product-cat-tag">${item.category}</span>
        <h3 class="product-title">${item.name}</h3>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.round(item.rating))}${'☆'.repeat(5 - Math.round(item.rating))}</span>
          <span class="rating-num">(${item.rating})</span>
        </div>
        <p class="product-desc">${item.description}</p>
        <div class="product-card-footer">
          <div class="product-prices">
            <span class="product-price">₹${item.price}</span>
            <span class="product-orig-price">₹${item.originalPrice}</span>
          </div>
          <button class="add-to-cart-btn" onclick='window.CreazenCart.addItem(${JSON.stringify(item)})'>
            <i class="fa-solid fa-bag-shopping"></i> Add
          </button>
        </div>
      </div>
    `;
    itemsDiv.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Check URL params for category or search
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('cat') || 'wedding-invitation';
  showCategory(cat);
});
