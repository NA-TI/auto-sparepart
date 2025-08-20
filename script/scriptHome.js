// Ultra Modern Home Page Script

class HomePageManager {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".discounts");
    this.totalSlides = this.slides.length;
    this.init();
  }

  init() {
    this.setupSlider();
    this.setupSearch();
    this.setupCategories();
    this.setupProducts();
    this.setupAnimations();
  }

  setupSlider() {
    const nextBtn = document.querySelector(
      ".discount_section span:nth-child(2)"
    );
    const prevBtn = document.querySelector(
      ".discount_section span:first-child"
    );

    if (nextBtn) nextBtn.addEventListener("click", () => this.nextSlide());
    if (prevBtn) prevBtn.addEventListener("click", () => this.prevSlide());

    // Auto-play
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlider();
  }

  updateSlider() {
    const collection = document.querySelector(".discount_collection");
    if (collection) {
      const translateX = -(this.currentSlide * 33.333);
      collection.style.transform = `translateX(${translateX}%)`;
    }
  }

  setupSearch() {
    const searchInput = document.querySelector(".search_bar input");
    const searchBtn = document.querySelector(".search_bar button");
    const allParts = document.querySelector(".all-parts");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });

      if (searchBtn) {
        searchBtn.addEventListener("click", () => {
          this.performSearch(searchInput.value);
        });
      }

      searchInput.addEventListener("focus", () => {
        if (allParts) allParts.classList.add("active");
      });

      searchInput.addEventListener("blur", () => {
        setTimeout(() => {
          if (allParts) allParts.classList.remove("active");
        }, 200);
      });
    }
  }

  handleSearch(query) {
    const allParts = document.querySelector(".all-parts");
    if (!allParts) return;

    const items = allParts.querySelectorAll("li");
    items.forEach((item) => {
      const matches = item.textContent
        .toLowerCase()
        .includes(query.toLowerCase());
      item.style.display = matches ? "block" : "none";
    });
  }

  performSearch(query) {
    if (!query.trim()) return;
    this.showMessage(`Searching for "${query}"...`, "success");
  }

  setupCategories() {
    const categoryBtn = document.querySelector(".categories p");
    const categoryList = document.querySelector(".category_lists");

    if (categoryBtn && categoryList) {
      categoryBtn.addEventListener("click", () => {
        categoryList.classList.toggle("active");
      });

      const categoryItems = categoryList.querySelectorAll("li");
      categoryItems.forEach((item) => {
        item.addEventListener("click", () => {
          const selectedCategory = item.textContent;
          categoryBtn.textContent = selectedCategory;
          categoryList.classList.remove("active");
          this.showMessage(`Filtered by ${selectedCategory}`, "success");
        });
      });
    }
  }

  setupProducts() {
    const products = document.querySelectorAll(".product_content");

    products.forEach((product) => {
      const addToCartBtn = product.querySelector(".buttons a:first-child");
      const detailBtn = product.querySelector(".buttons a:last-child");

      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const productName =
            product.querySelector("h1")?.textContent || "Product";
          this.showMessage(`${productName} added to cart!`, "success");
        });
      }

      if (detailBtn) {
        detailBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const productName =
            product.querySelector("h1")?.textContent || "Product";
          this.showProductDetail(productName);
        });
      }

      // Hover effects
      product.addEventListener("mouseenter", () => {
        product.style.transform = "translateY(-10px)";
        product.style.boxShadow = "var(--shadow-2xl)";
      });

      product.addEventListener("mouseleave", () => {
        product.style.transform = "translateY(0)";
        product.style.boxShadow = "var(--shadow-lg)";
      });
    });
  }

  setupAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = document.querySelectorAll(
      ".intro, .product_content, .discounts"
    );
    animateElements.forEach((el) => observer.observe(el));
  }

  showProductDetail(productName) {
    // Get product data based on name
    const productData = this.getProductData(productName);

    const modal = document.createElement("div");
    modal.className = "product-detail-modal";
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <h2>${productData.name}</h2>
            <span class="product-category">${productData.category}</span>
          </div>
          <button class="close-modal" aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="product-gallery">
            <div class="main-image">
              <img src="${productData.image}" alt="${productData.name}" />
              <div class="image-overlay">
                <button class="zoom-btn" aria-label="Zoom image">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="thumbnail-images">
              <div class="thumbnail active">
                <img src="${productData.image}" alt="Main view" />
              </div>
              <div class="thumbnail">
                <img src="${productData.image}" alt="Side view" />
              </div>
              <div class="thumbnail">
                <img src="${productData.image}" alt="Detail view" />
              </div>
            </div>
          </div>
          
          <div class="product-info">
            <div class="product-price">
              <span class="price-amount">$${productData.price}</span>
              <span class="price-original">$${productData.originalPrice}</span>
              <span class="discount-badge">-${productData.discount}%</span>
            </div>
            
            <div class="product-description">
              <h3>Description</h3>
              <p>${productData.description}</p>
            </div>
            
            <div class="product-features">
              <h3>Key Features</h3>
              <ul>
                ${productData.features
                  .map((feature) => `<li>${feature}</li>`)
                  .join("")}
              </ul>
            </div>
            
            <div class="product-specs">
              <h3>Specifications</h3>
              <div class="specs-grid">
                ${Object.entries(productData.specifications)
                  .map(
                    ([key, value]) =>
                      `<div class="spec-item">
                    <span class="spec-label">${key}</span>
                    <span class="spec-value">${value}</span>
                   </div>`
                  )
                  .join("")}
              </div>
            </div>
            
            <div class="product-actions">
              <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <div class="quantity-controls">
                  <button class="qty-btn minus" aria-label="Decrease quantity">-</button>
                  <input type="number" id="quantity" value="1" min="1" max="99" />
                  <button class="qty-btn plus" aria-label="Increase quantity">+</button>
                </div>
              </div>
              
              <div class="action-buttons">
                <button class="btn-add-cart">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add to Cart
                </button>
                <button class="btn-buy-now">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c-1 0-4-1-4-4s3-4 4-4"></path>
                    <path d="M3 12c1 0 4-1 4-4s-3-4-4-4"></path>
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>
            
            <div class="product-meta">
              <div class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>Free Shipping</span>
              </div>
              <div class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-4-1-4-4s3-4 4-4"></path>
                  <path d="M3 12c1 0 4-1 4-4s-3-4-4-4"></path>
                </svg>
                <span>2 Year Warranty</span>
              </div>
              <div class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    this.addModalStyles();

    // Initialize modal functionality
    this.initializeModal(modal, productData);
  }

  getProductData(productName) {
    // Product data matching the actual products from HTML
    const products = {
      "Timing Belt/Chain": {
        name: "Timing Belt/Chain",
        category: "Engine Parts",
        price: 215,
        originalPrice: 285,
        discount: 25,
        image: "images/product1.jpg",
        description:
          "Critical timing belt/chain for the engine's valve system. Regular replacement is essential to prevent potential engine damage and ensure optimal performance.",
        features: [
          "High-strength reinforced construction",
          "Precise timing accuracy",
          "Extended service life",
          "Easy installation design",
          "Compatible with most engines",
        ],
        specifications: {
          "Belt Type": "Reinforced rubber",
          Length: "Varies by model",
          Width: "25mm",
          "Service Life": "60,000-100,000 miles",
          Installation: "Professional recommended",
          Warranty: "2 years",
        },
      },
      "Spark Plugs": {
        name: "Spark Plugs",
        category: "Engine Parts",
        price: 5,
        originalPrice: 8,
        discount: 38,
        image: "images/product2.jpg",
        description:
          "High-performance spark plugs integral for starting the combustion process in the engine. Often requiring periodic replacement for optimal engine performance.",
        features: [
          "Iridium electrode design",
          "Enhanced ignition performance",
          "Extended service life",
          "Improved fuel efficiency",
          "Reduced emissions",
        ],
        specifications: {
          "Electrode Material": "Iridium",
          "Heat Range": "Standard",
          "Thread Size": "14mm",
          Gap: "0.032 inches",
          "Service Life": "60,000 miles",
          Quantity: "Set of 4",
        },
      },
      "Brake Pads": {
        name: "Brake Pads",
        category: "Brake System",
        price: 215,
        originalPrice: 285,
        discount: 25,
        image: "images/product3.jpg",
        description:
          "Essential brake pads for safe braking performance. These wear out over time and need regular replacements to maintain optimal stopping power.",
        features: [
          "Ceramic compound for low dust",
          "Excellent heat resistance",
          "Quiet operation",
          "Long service life",
          "Fade-resistant performance",
        ],
        specifications: {
          Material: "Ceramic",
          Thickness: "12mm",
          "Friction Rating": "FF",
          "Temperature Range": "-40°F to 600°F",
          "Wear Sensor": "Included",
          Shims: "Pre-installed",
        },
      },
      "Car Batteries": {
        name: "Car Batteries",
        category: "Electrical System",
        price: 240,
        originalPrice: 320,
        discount: 25,
        image: "images/product4.jpg",
        description:
          "Vital car batteries for powering electrical systems in vehicles. They often require replacement after a few years to ensure reliable starting and electrical performance.",
        features: [
          "High cold cranking amps",
          "Long service life",
          "Maintenance-free design",
          "Vibration resistant",
          "Quick charging capability",
        ],
        specifications: {
          "Battery Type": "Lead-acid",
          Voltage: "12V",
          Capacity: "60Ah",
          CCA: "600A",
          "Service Life": "3-5 years",
          Warranty: "3 years",
        },
      },
      "Oil Filters": {
        name: "Oil Filters",
        category: "Engine Parts",
        price: 44,
        originalPrice: 58,
        discount: 24,
        image: "images/product5.jpg",
        description:
          "Necessary oil filters for keeping the engine oil clean, ensuring proper lubrication for the engine's moving parts and extended engine life.",
        features: [
          "Advanced multi-layer filtration",
          "Extended service life",
          "Easy installation",
          "Compatible with most vehicles",
          "Meets OEM specifications",
        ],
        specifications: {
          "Filter Type": "Spin-on",
          "Thread Size": "M20 x 1.5",
          Height: "3.5 inches",
          "Outer Diameter": "3.25 inches",
          "Bypass Valve": "Yes",
          "Anti-Drainback": "Yes",
        },
      },
      "Air Filters": {
        name: "Air Filters",
        category: "Engine Parts",
        price: 35,
        originalPrice: 47,
        discount: 26,
        image: "images/product6.jpg",
        description:
          "Crucial air filters for maintaining engine health by filtering out dust and debris from entering the engine, ensuring optimal performance and longevity.",
        features: [
          "High-flow design",
          "Washable and reusable",
          "Improved engine performance",
          "Better fuel economy",
          "Easy maintenance",
        ],
        specifications: {
          "Filter Type": "Panel",
          Dimensions: '12.5" x 8.5" x 1.5"',
          Material: "Cotton gauze",
          "Flow Rate": "Increased 15%",
          Filtration: "99.5% efficiency",
          "Service Life": "50,000 miles",
        },
      },
    };

    return (
      products[productName] || {
        name: productName,
        category: "Auto Parts",
        price: 99.99,
        originalPrice: 129.99,
        discount: 23,
        image: "images/product1.jpg",
        description:
          "High-quality automotive part designed for optimal performance and reliability. Built to meet or exceed OEM specifications.",
        features: [
          "Premium quality materials",
          "OEM specifications",
          "Easy installation",
          "Long service life",
          "Warranty included",
        ],
        specifications: {
          Material: "High-grade steel",
          Weight: "2.5 lbs",
          Dimensions: "Varies by model",
          Warranty: "2 years",
          Installation: "Professional recommended",
        },
      }
    );
  }

  addModalStyles() {
    if (document.getElementById("product-modal-styles")) return;

    const style = document.createElement("style");
    style.id = "product-modal-styles";
    style.textContent = `
      .product-detail-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: modalFadeIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%);
        backdrop-filter: blur(25px) saturate(180%);
        -webkit-backdrop-filter: blur(25px) saturate(180%);
      }

      .modal-container {
        position: relative;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(30px) saturate(200%);
        -webkit-backdrop-filter: blur(30px) saturate(200%);
        border-radius: var(--radius-2xl);
        max-width: 1200px;
        width: 95%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: modalSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .modal-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 25%, var(--primary) 50%, var(--accent) 75%, var(--primary) 100%);
        background-size: 200% 100%;
        animation: gradientShift 3s ease-in-out infinite;
        border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid var(--gray-200);
        position: relative;
      }

      .modal-title h2 {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--gray-800);
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .product-category {
        display: inline-block;
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        color: var(--white);
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .close-modal {
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid var(--gray-200);
        border-radius: 50%;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        color: var(--gray-600);
        backdrop-filter: blur(10px);
      }

      .close-modal:hover {
        background: var(--primary);
        border-color: var(--primary);
        color: var(--white);
        transform: scale(1.1) rotate(90deg);
        box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
      }

      .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        padding: 2rem;
      }

      .product-gallery {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .main-image {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: var(--gray-50);
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .main-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 2rem;
        transition: transform 0.3s ease;
      }

      .main-image:hover img {
        transform: scale(1.05);
      }

      .image-overlay {
        position: absolute;
        top: 1rem;
        right: 1rem;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .main-image:hover .image-overlay {
        opacity: 1;
      }

      .zoom-btn {
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--gray-600);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }

      .zoom-btn:hover {
        background: var(--primary);
        color: var(--white);
        transform: scale(1.1);
      }

      .thumbnail-images {
        display: flex;
        gap: 1rem;
      }

      .thumbnail {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-lg);
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        background: var(--gray-50);
      }

      .thumbnail.active {
        border-color: var(--primary);
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
      }

      .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 0.5rem;
      }

      .product-info {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .product-price {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .price-amount {
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--primary);
      }

      .price-original {
        font-size: 1.25rem;
        color: var(--gray-400);
        text-decoration: line-through;
      }

      .discount-badge {
        background: linear-gradient(135deg, var(--success) 0%, #059669 100%);
        color: var(--white);
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-full);
        font-size: 0.875rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .product-description h3,
      .product-features h3,
      .product-specs h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--gray-800);
        margin-bottom: 1rem;
      }

      .product-description p {
        color: var(--gray-600);
        line-height: 1.7;
        font-size: 1rem;
      }

      .product-features ul {
        list-style: none;
        padding: 0;
      }

      .product-features li {
        padding: 0.5rem 0;
        color: var(--gray-700);
        position: relative;
        padding-left: 1.5rem;
      }

      .product-features li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--success);
        font-weight: 700;
        font-size: 1.1rem;
      }

      .specs-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .spec-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: var(--gray-50);
        border-radius: var(--radius-lg);
        border: 1px solid var(--gray-200);
      }

      .spec-label {
        font-weight: 600;
        color: var(--gray-700);
      }

      .spec-value {
        color: var(--gray-600);
        font-weight: 500;
      }

      .product-actions {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .quantity-selector {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .quantity-selector label {
        font-weight: 600;
        color: var(--gray-700);
        min-width: 80px;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        border: 2px solid var(--gray-200);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }

      .qty-btn {
        background: var(--gray-100);
        border: none;
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--gray-600);
        font-weight: 700;
      }

      .qty-btn:hover {
        background: var(--primary);
        color: var(--white);
      }

      .quantity-controls input {
        border: none;
        padding: 0.75rem;
        text-align: center;
        width: 60px;
        font-weight: 600;
        color: var(--gray-800);
      }

      .quantity-controls input:focus {
        outline: none;
      }

      .action-buttons {
        display: flex;
        gap: 1rem;
      }

      .btn-add-cart,
      .btn-buy-now {
        flex: 1;
        padding: 1rem 1.5rem;
        border: none;
        border-radius: var(--radius-xl);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;
      }

      .btn-add-cart {
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        color: var(--white);
        box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
      }

      .btn-add-cart:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(220, 38, 38, 0.4);
      }

      .btn-buy-now {
        background: linear-gradient(135deg, var(--success) 0%, #059669 100%);
        color: var(--white);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
      }

      .btn-buy-now:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
      }

      .product-meta {
        display: flex;
        gap: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--gray-200);
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--gray-600);
        font-size: 0.875rem;
        font-weight: 500;
      }

      .meta-item svg {
        color: var(--success);
      }

      @keyframes modalFadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes modalSlideIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @media (max-width: 1024px) {
        .modal-body {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        .specs-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .product-detail-modal {
          padding: 1rem;
        }
        
        .modal-container {
          width: 100%;
          max-height: 98vh;
          margin: 0;
          border-radius: var(--radius-xl);
        }
        
        .modal-header {
          padding: 1.25rem 1.25rem 1rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .modal-title h2 {
          font-size: 1.5rem;
          line-height: 1.2;
        }
        
        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
        }
        
        .modal-body {
          padding: 1.25rem;
          gap: 1.5rem;
        }
        
        .product-gallery {
          gap: 1rem;
        }
        
        .main-image {
          aspect-ratio: 4/3;
        }
        
        .main-image img {
          padding: 1rem;
        }
        
        .thumbnail-images {
          gap: 0.75rem;
          justify-content: center;
        }
        
        .thumbnail {
          width: 60px;
          height: 60px;
        }
        
        .product-info {
          gap: 1.5rem;
        }
        
        .product-price {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .price-amount {
          font-size: 2rem;
        }
        
        .price-original {
          font-size: 1.1rem;
        }
        
        .product-description h3,
        .product-features h3,
        .product-specs h3 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        
        .product-description p {
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .product-features li {
          padding: 0.4rem 0;
          padding-left: 1.25rem;
          font-size: 0.9rem;
        }
        
        .spec-item {
          padding: 0.6rem;
          font-size: 0.9rem;
        }
        
        .product-actions {
          gap: 1.25rem;
        }
        
        .quantity-selector {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .quantity-controls {
          width: 100%;
          max-width: 200px;
        }
        
        .action-buttons {
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .btn-add-cart,
        .btn-buy-now {
          padding: 1rem;
          font-size: 0.95rem;
        }
        
        .product-meta {
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1rem;
        }
        
        .meta-item {
          font-size: 0.8rem;
        }
      }

      @media (max-width: 480px) {
        .product-detail-modal {
          padding: 0.5rem;
        }
        
        .modal-container {
          width: 100%;
          max-height: 99vh;
          border-radius: var(--radius-lg);
        }
        
        .modal-header {
          padding: 1rem 1rem 0.75rem;
        }
        
        .modal-title h2 {
          font-size: 1.25rem;
        }
        
        .close-modal {
          width: 36px;
          height: 36px;
          top: 0.75rem;
          right: 0.75rem;
        }
        
        .modal-body {
          padding: 1rem;
          gap: 1.25rem;
        }
        
        .main-image {
          aspect-ratio: 1;
        }
        
        .main-image img {
          padding: 0.75rem;
        }
        
        .thumbnail {
          width: 50px;
          height: 50px;
        }
        
        .thumbnail-images {
          gap: 0.5rem;
        }
        
        .product-info {
          gap: 1.25rem;
        }
        
        .price-amount {
          font-size: 1.75rem;
        }
        
        .price-original {
          font-size: 1rem;
        }
        
        .product-description h3,
        .product-features h3,
        .product-specs h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .product-description p {
          font-size: 0.9rem;
        }
        
        .product-features li {
          font-size: 0.85rem;
          padding-left: 1rem;
        }
        
        .spec-item {
          padding: 0.5rem;
          font-size: 0.85rem;
        }
        
        .quantity-controls {
          max-width: 150px;
        }
        
        .qty-btn {
          padding: 0.6rem 0.8rem;
        }
        
        .quantity-controls input {
          width: 50px;
          padding: 0.6rem;
        }
        
        .btn-add-cart,
        .btn-buy-now {
          padding: 0.875rem;
          font-size: 0.9rem;
        }
        
        .product-meta {
          gap: 0.5rem;
          padding-top: 0.75rem;
        }
        
        .meta-item {
          font-size: 0.75rem;
        }
      }

      @media (max-width: 360px) {
        .modal-container {
          width: 100%;
          max-height: 100vh;
          border-radius: 0;
        }
        
        .modal-header {
          padding: 0.75rem 0.75rem 0.5rem;
        }
        
        .modal-title h2 {
          font-size: 1.1rem;
        }
        
        .close-modal {
          width: 32px;
          height: 32px;
          top: 0.5rem;
          right: 0.5rem;
        }
        
        .modal-body {
          padding: 0.75rem;
          gap: 1rem;
        }
        
        .price-amount {
          font-size: 1.5rem;
        }
        
        .btn-add-cart,
        .btn-buy-now {
          padding: 0.75rem;
          font-size: 0.85rem;
        }
      }
    `;

    document.head.appendChild(style);
  }

  initializeModal(modal, productData) {
    // Close modal functionality
    const closeBtn = modal.querySelector(".close-modal");
    const overlay = modal.querySelector(".modal-overlay");

    const closeModal = () => {
      modal.style.animation = "modalFadeOut 0.3s ease-out";
      setTimeout(() => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, 300);
    };

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // Quantity controls
    const qtyInput = modal.querySelector("#quantity");
    const minusBtn = modal.querySelector(".qty-btn.minus");
    const plusBtn = modal.querySelector(".qty-btn.plus");

    minusBtn.addEventListener("click", () => {
      const currentValue = parseInt(qtyInput.value);
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
      }
    });

    plusBtn.addEventListener("click", () => {
      const currentValue = parseInt(qtyInput.value);
      if (currentValue < 99) {
        qtyInput.value = currentValue + 1;
      }
    });

    // Thumbnail navigation
    const thumbnails = modal.querySelectorAll(".thumbnail");
    const mainImage = modal.querySelector(".main-image img");

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        thumbnails.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
        // In a real app, you'd change the main image here
      });
    });

    // Action buttons
    const addToCartBtn = modal.querySelector(".btn-add-cart");
    const buyNowBtn = modal.querySelector(".btn-buy-now");

    addToCartBtn.addEventListener("click", () => {
      const quantity = parseInt(qtyInput.value);
      this.showMessage(
        `Added ${quantity} ${productData.name} to cart!`,
        "success"
      );
      addToCartBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 12l2 2 4-4"></path>
        </svg>
        Added!
      `;
      addToCartBtn.style.background =
        "linear-gradient(135deg, var(--success) 0%, #059669 100%)";
      setTimeout(() => {
        addToCartBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        `;
        addToCartBtn.style.background =
          "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)";
      }, 2000);
    });

    buyNowBtn.addEventListener("click", () => {
      const quantity = parseInt(qtyInput.value);
      this.showMessage(
        `Proceeding to checkout with ${quantity} ${productData.name}`,
        "success"
      );
      // In a real app, this would redirect to checkout
    });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  showMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    const bgColor = type === "success" ? "var(--success)" : "var(--primary)";

    messageDiv.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      color: var(--white);
      font-weight: 600;
      z-index: 3000;
      animation: slideInRight 0.3s ease-out;
      background: ${bgColor};
      box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HomePageManager();

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    .product_content {
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});

// Product Pagination System
document.addEventListener("DOMContentLoaded", function () {
  const productHome = document.querySelector(".product_home");
  const pageButtons = document.querySelectorAll(".page-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const products = document.querySelectorAll(".products");

  let currentPage = 1;
  const totalPages = 3;
  const productsPerPage = 6;
  let isInitialLoad = true; // Flag to track initial page load

  // Function to show specific page
  function showPage(pageNumber, shouldScroll = false) {
    // Hide all products
    products.forEach((product) => {
      product.style.display = "none";
    });

    // Show products for current page
    if (pageNumber === 1) {
      // Show first 6 products (page 1)
      for (let i = 0; i < 6; i++) {
        if (products[i]) {
          products[i].style.display = "block";
        }
      }
    } else if (pageNumber === 2) {
      // Show products 7-12 (page 2)
      for (let i = 6; i < 12; i++) {
        if (products[i]) {
          products[i].style.display = "block";
        }
      }
    } else if (pageNumber === 3) {
      // Show products 13-18 (page 3)
      for (let i = 12; i < 18; i++) {
        if (products[i]) {
          products[i].style.display = "block";
        }
      }
    }

    // Update active button
    pageButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .querySelector(`[data-page="${pageNumber}"]`)
      .classList.add("active");

    // Update navigation buttons
    updateNavigationButtons(pageNumber);

    // Only scroll if explicitly requested (not on initial load)
    if (shouldScroll && !isInitialLoad) {
      const productSection = document.querySelector(".product_section");
      productSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Function to update navigation buttons
  function updateNavigationButtons(pageNumber) {
    if (pageNumber === 1) {
      prevBtn.style.opacity = "0.5";
      prevBtn.style.cursor = "not-allowed";
    } else {
      prevBtn.style.opacity = "1";
      prevBtn.style.cursor = "pointer";
    }

    if (pageNumber === totalPages) {
      nextBtn.style.opacity = "0.5";
      nextBtn.style.cursor = "not-allowed";
    } else {
      nextBtn.style.opacity = "1";
      nextBtn.style.cursor = "pointer";
    }
  }

  // Event listeners for page buttons
  pageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const pageNumber = parseInt(this.getAttribute("data-page"));
      if (pageNumber !== currentPage) {
        currentPage = pageNumber;
        showPage(currentPage, true); // Enable scrolling for navigation
      }
    });
  });

  // Event listener for previous button
  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage, true); // Enable scrolling for navigation
    }
  });

  // Event listener for next button
  nextBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage, true); // Enable scrolling for navigation
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (event) {
    if (event.key >= "1" && event.key <= "3") {
      const pageNumber = parseInt(event.key);
      if (pageNumber !== currentPage) {
        currentPage = pageNumber;
        showPage(currentPage, true); // Enable scrolling for navigation
      }
    } else if (event.key === "ArrowLeft" && currentPage > 1) {
      currentPage--;
      showPage(currentPage, true); // Enable scrolling for navigation
    } else if (event.key === "ArrowRight" && currentPage < totalPages) {
      currentPage++;
      showPage(currentPage, true); // Enable scrolling for navigation
    }
  });

  // Initialize first page (no scrolling on initial load)
  showPage(1, false);
  isInitialLoad = false; // Set flag to false after initial load
});

// Product card hover effects enhancement
document.addEventListener("DOMContentLoaded", function () {
  const productCards = document.querySelectorAll(".product_content");

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Add to cart functionality (placeholder)
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".buttons a:first-child");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Add visual feedback
      this.style.transform = "scale(0.95)";
      this.style.background =
        "linear-gradient(135deg, #38a169 0%, #48bb78 100%)";
      this.textContent = "Added!";

      setTimeout(() => {
        this.style.transform = "scale(1)";
        this.style.background =
          "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)";
        this.textContent = "Add To Cart";
      }, 1000);
    });
  });
});
