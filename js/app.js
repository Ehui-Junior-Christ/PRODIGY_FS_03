// Logique principale de l'application "Maison Céleste"

let currentCategory = 'tout';
let currentSort = 'popularite';
let currentSearch = '';
let maxPrice = 40;

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation de l'affichage du panier
    renderCart();

    // Rendu initial des produits
    filterAndRenderProducts();

    // Écouteurs pour les filtres de catégorie
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            filterAndRenderProducts();
        });
    });

    // Écouteur pour le tri
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterAndRenderProducts();
        });
    }

    // Écouteur pour la barre de recherche
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            filterAndRenderProducts();
        });
    }

    // Écouteur pour le filtre de prix
    const priceSlider = document.getElementById('price-slider');
    const priceDisplay = document.getElementById('price-display');
    if (priceSlider && priceDisplay) {
        priceSlider.addEventListener('input', (e) => {
            maxPrice = parseFloat(e.target.value);
            priceDisplay.textContent = `${maxPrice}€`;
            filterAndRenderProducts();
        });
    }

    // Écouteur pour le formulaire de commande (Checkout)
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }

    // Écouteur pour le suivi de commande
    const trackingForm = document.getElementById('tracking-form');
    if (trackingForm) {
        trackingForm.addEventListener('submit', handleTrackingSubmit);
    }

    // Écouteur pour le formulaire de contact / support
    const supportForm = document.getElementById('support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', handleSupportSubmit);
    }

    // Gestion de la fermeture des modales via la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartDrawer();
            closeCheckoutModal();
            closeOrderConfirmModal();
            closeQuickViewModal();
            closeTrackingModal();
            closeSupportModal();
        }
    });

    // Gestion des clics sur les overlays pour fermer
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartDrawer);
    }
});

// Filtrer et trier les produits avant de les afficher
function filterAndRenderProducts() {
    let filtered = products.filter(p => {
        const matchCategory = currentCategory === 'tout' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch);
        const matchPrice = p.price <= maxPrice;
        return matchCategory && matchSearch && matchPrice;
    });

    // Tri
    if (currentSort === 'prix-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'prix-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'note') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else { // popularite
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    renderProductsGrid(filtered);
}

// Afficher la grille de produits
function renderProductsGrid(productList) {
    const grid = document.getElementById('products-grid');
    const countDisplay = document.getElementById('products-count');
    
    if (countDisplay) {
        countDisplay.textContent = `${productList.length} produit${productList.length > 1 ? 's' : ''}`;
    }

    if (!grid) return;

    if (productList.length === 0) {
        grid.innerHTML = `
            <div class="products-empty">
                <h3>Aucun produit ne correspond à vos critères</h3>
                <p>Essayez de modifier vos filtres ou votre recherche.</p>
                <button class="btn btn-primary" onclick="resetFilters()">Réinitialiser les filtres</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = productList.map(p => `
        <article class="product-card" data-id="${p.id}">
            <div class="product-img-wrapper" onclick="openQuickView(${p.id})">
                <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80';">
                <span class="product-category-tag">${p.categoryLabel}</span>
                <button class="quick-view-btn" aria-label="Aperçu rapide de ${p.name}">Aperçu rapide</button>
            </div>
            <div class="product-content">
                <div class="product-rating">
                    <span class="stars">★ ${p.rating.toFixed(1)}</span>
                    <span class="reviews-count">(${p.reviewsCount} avis)</span>
                </div>
                <h3 class="product-title" onclick="openQuickView(${p.id})">${p.name}</h3>
                <div class="product-footer">
                    <span class="product-price">${p.price.toFixed(2)}€</span>
                    <button class="btn btn-primary add-to-cart-btn" onclick="addToCart(${p.id})" aria-label="Ajouter ${p.name} au panier">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function resetFilters() {
    currentCategory = 'tout';
    currentSort = 'popularite';
    currentSearch = '';
    maxPrice = 40;

    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.category-btn[data-category="tout"]').classList.add('active');
    if (document.getElementById('sort-select')) document.getElementById('sort-select').value = 'popularite';
    if (document.getElementById('search-input')) document.getElementById('search-input').value = '';
    if (document.getElementById('price-slider')) {
        document.getElementById('price-slider').value = 40;
        document.getElementById('price-display').textContent = '40€';
    }

    filterAndRenderProducts();
}

// Aperçu rapide (Quick View modal & Gestion des Avis)
let activeQuickViewProductId = null;

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    activeQuickViewProductId = productId;
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    document.querySelector('.qv-img').src = product.image;
    document.querySelector('.qv-img').alt = product.name;
    document.querySelector('.qv-category').textContent = product.categoryLabel;
    document.querySelector('.qv-title').textContent = product.name;
    document.querySelector('.qv-price').textContent = `${product.price.toFixed(2)}€`;
    document.querySelector('.qv-stars').textContent = `★ ${product.rating.toFixed(1)}`;
    document.querySelector('.qv-reviews-count').textContent = `(${product.reviewsCount} avis)`;
    document.querySelector('.qv-description').textContent = product.description;
    document.querySelector('.qv-details').textContent = product.details;

    // Écouteur d'ajout au panier depuis la modale
    const qvAddBtn = document.querySelector('.qv-add-to-cart-btn');
    qvAddBtn.onclick = () => {
        addToCart(product.id);
        closeQuickViewModal();
    };

    // Rendu des avis existants
    renderReviews(product);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        activeQuickViewProductId = null;
    }
}

function renderReviews(product) {
    const reviewsList = document.querySelector('.reviews-list');
    if (!reviewsList) return;

    if (!product.reviews || product.reviews.length === 0) {
        reviewsList.innerHTML = `<p class="no-reviews">Soyez le premier à donner votre avis sur ce produit !</p>`;
        return;
    }

    reviewsList.innerHTML = product.reviews.map(r => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-author">${r.author}</span>
                <span class="review-date">${r.date}</span>
            </div>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            <p class="review-comment">${r.comment}</p>
        </div>
    `).join('');
}

function handleReviewSubmit(event) {
    event.preventDefault();
    if (!activeQuickViewProductId) return;

    const product = products.find(p => p.id === activeQuickViewProductId);
    if (!product) return;

    const form = event.target;
    const formData = new FormData(form);
    
    const newReview = {
        author: formData.get('author'),
        rating: parseInt(formData.get('rating')),
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        comment: formData.get('comment')
    };

    if (!product.reviews) product.reviews = [];
    product.reviews.unshift(newReview);
    product.reviewsCount += 1;

    // Recalcul de la note moyenne
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / product.reviews.length;

    // Rafraîchissement UI
    renderReviews(product);
    document.querySelector('.qv-stars').textContent = `★ ${product.rating.toFixed(1)}`;
    document.querySelector('.qv-reviews-count').textContent = `(${product.reviewsCount} avis)`;

    form.reset();
    showToast('Merci ! Votre avis a été publié avec succès.');
    
    // Mettre à jour la grille principale pour refléter les nouvelles notes
    filterAndRenderProducts();
}

// Suivi de Commande (Order Tracking)
function openTrackingModal() {
    const modal = document.getElementById('tracking-modal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.getElementById('tracking-result').innerHTML = '';
    }
}

function closeTrackingModal() {
    const modal = document.getElementById('tracking-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function handleTrackingSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('tracking-input');
    const resultContainer = document.getElementById('tracking-result');
    if (!input || !resultContainer) return;

    const orderId = input.value.trim().toUpperCase();
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        resultContainer.innerHTML = `
            <div class="tracking-error">
                <p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 6px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Commande introuvable pour l'identifiant <strong>"${orderId}"</strong>.</p>
                <p class="tracking-hint">Astuce : Utilisez la commande de test <strong>CMD-84920</strong> ou passez une nouvelle commande pour faire un essai.</p>
            </div>
        `;
        return;
    }

    const steps = [
        { step: 1, label: "En préparation", desc: "Votre commande est en cours de préparation dans notre atelier." },
        { step: 2, label: "Expédié", desc: "Votre colis a été remis à notre transporteur local." },
        { step: 3, label: "En livraison", desc: "Le livreur est en route vers votre adresse." },
        { step: 4, label: "Livré", desc: "Commande livrée avec succès." }
    ];

    resultContainer.innerHTML = `
        <div class="tracking-details-card">
            <div class="tracking-header-info">
                <h4>Commande ${order.orderId}</h4>
                <span class="tracking-date">Passée le ${order.date}</span>
            </div>
            <div class="tracking-est">Livraison estimée : <strong>${order.estDelivery}</strong></div>
            
            <div class="tracking-timeline">
                ${steps.map(s => `
                    <div class="timeline-step ${order.trackingStep >= s.step ? 'completed' : ''} ${order.trackingStep === s.step ? 'current' : ''}">
                        <div class="step-indicator">${order.trackingStep >= s.step ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : s.step}</div>
                        <div class="step-content">
                            <h5 class="step-label">${s.label}</h5>
                            <p class="step-desc">${s.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="tracking-items-list">
                <h5>Articles de la commande :</h5>
                <ul>
                    ${order.items.map(item => `<li>${item.name} (x${item.quantity})</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Support Client & FAQ
function openSupportModal() {
    const modal = document.getElementById('support-modal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeSupportModal() {
    const modal = document.getElementById('support-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function handleSupportSubmit(event) {
    event.preventDefault();
    const form = event.target;
    form.reset();
    closeSupportModal();
    showToast("Votre message a bien été envoyé à notre équipe. Nous vous répondrons sous 24h.");
}

function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    button.setAttribute('aria-expanded', !isExpanded);
    if (!isExpanded) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        answer.style.maxHeight = null;
    }
}
