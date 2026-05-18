// Gestion du panier et des commandes pour "Maison Céleste"

let cart = JSON.parse(localStorage.getItem('maison_celeste_cart')) || [];
let orders = JSON.parse(localStorage.getItem('maison_celeste_orders')) || [
    {
        orderId: "CMD-84920",
        date: "16 Mai 2026",
        status: "expedie",
        statusLabel: "Expédié",
        total: 40.50,
        items: [
            { name: "Miel de Thym Sauvage", quantity: 1, price: 14.50 },
            { name: "Huile d'Olive Vierge Extra - Cuvée Réserve", quantity: 1, price: 26.00 }
        ],
        trackingStep: 2, // 1: Préparation, 2: Expédié, 3: En livraison, 4: Livré
        estDelivery: "20 Mai 2026"
    }
];

// Sauvegarder le panier dans le localStorage
function saveCart() {
    localStorage.setItem('maison_celeste_cart', JSON.stringify(cart));
    renderCart();
}

// Sauvegarder les commandes
function saveOrders() {
    localStorage.setItem('maison_celeste_orders', JSON.stringify(orders));
}

// Ajouter au panier
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            categoryLabel: product.categoryLabel,
            quantity: quantity
        });
    }

    saveCart();
    showToast(`"${product.name}" a été ajouté à votre panier.`);
    
    // Ouvrir le tiroir du panier pour montrer l'action (feedback immédiat)
    openCartDrawer();
}

// Supprimer du panier
function removeFromCart(productId) {
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    if (item) {
        showToast(`"${item.name}" retiré du panier.`);
    }
}

// Mettre à jour la quantité
function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
    }
}

// Calculer les totaux
function getCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.90; // Livraison gratuite dès 50€
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
}

// Afficher/Rendre le panier dans le tiroir UI
function renderCart() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cartDrawerItems = document.querySelector('.cart-drawer-items');
    const cartSubtotalEl = document.querySelector('.cart-subtotal');
    const cartShippingEl = document.querySelector('.cart-shipping');
    const cartTotalEl = document.querySelector('.cart-total');
    const freeShippingProgress = document.querySelector('.free-shipping-progress-bar');
    const freeShippingText = document.querySelector('.free-shipping-text');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Mise à jour des badges de compteur
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) {
            el.classList.add('has-items');
        } else {
            el.classList.remove('has-items');
        }
    });

    if (!cartDrawerItems) return;

    const totals = getCartTotals();

    // Mise à jour de la barre de progression pour la livraison gratuite
    if (totals.subtotal >= 50) {
        if (freeShippingProgress) freeShippingProgress.style.width = '100%';
        if (freeShippingText) freeShippingText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-gold); display: inline-block; vertical-align: middle; margin-right: 4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Félicitations ! La <strong>livraison est gratuite</strong>.';
    } else {
        const remaining = (50 - totals.subtotal).toFixed(2);
        const percentage = Math.min(100, (totals.subtotal / 50) * 100);
        if (freeShippingProgress) freeShippingProgress.style.width = `${percentage}%`;
        if (freeShippingText) freeShippingText.innerHTML = `Plus que <strong>${remaining}€</strong> pour profiter de la livraison gratuite.`;
    }

    // Affichage des articles
    if (cart.length === 0) {
        cartDrawerItems.innerHTML = `
            <div class="cart-empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto var(--space-3) auto; color: var(--text-secondary); display: block;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <p>Votre panier est actuellement vide.</p>
                <button class="btn btn-secondary continue-shopping-btn" onclick="closeCartDrawer()">Découvrir nos produits</button>
            </div>
        `;
    } else {
        cartDrawerItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80';">
                <div class="cart-item-details">
                    <span class="cart-item-category">${item.categoryLabel}</span>
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price-row">
                        <span class="cart-item-price">${item.price.toFixed(2)}€</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Diminuer la quantité">-</button>
                            <span class="qty-current">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Augmenter la quantité">+</button>
                        </div>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Supprimer l'article">×</button>
            </div>
        `).join('');
    }

    // Mise à jour des montants
    if (cartSubtotalEl) cartSubtotalEl.textContent = `${totals.subtotal.toFixed(2)}€`;
    if (cartShippingEl) cartShippingEl.textContent = totals.shipping === 0 ? 'Offerte' : `${totals.shipping.toFixed(2)}€`;
    if (cartTotalEl) cartTotalEl.textContent = `${totals.total.toFixed(2)}€`;
}

// Ouvrir le tiroir du panier
function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll en arrière-plan
    }
}

// Fermer le tiroir du panier
function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Simulation du processus de commande (Checkout)
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Votre panier est vide.', 'error');
        return;
    }
    closeCartDrawer();
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        renderCheckoutSummary();
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function renderCheckoutSummary() {
    const summaryItems = document.querySelector('.checkout-summary-items');
    const summaryTotal = document.querySelector('.checkout-summary-total');
    if (!summaryItems) return;

    const totals = getCartTotals();
    summaryItems.innerHTML = cart.map(item => `
        <div class="checkout-summary-item">
            <span>${item.name} <strong>x${item.quantity}</strong></span>
            <span>${(item.price * item.quantity).toFixed(2)}€</span>
        </div>
    `).join('');

    if (summaryTotal) summaryTotal.textContent = `${totals.total.toFixed(2)}€`;
}

// Traitement du formulaire de commande
function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const orderId = 'CMD-' + Math.floor(10000 + Math.random() * 90000);
    const totals = getCartTotals();
    
    const newOrder = {
        orderId: orderId,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: "preparation",
        statusLabel: "En préparation",
        total: totals.total,
        items: [...cart],
        trackingStep: 1, // 1: Préparation
        estDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        customer: {
            name: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city')
        }
    };

    orders.unshift(newOrder);
    saveOrders();

    // Vider le panier après commande
    cart = [];
    saveCart();

    // Fermer modal de checkout et ouvrir modal de confirmation
    closeCheckoutModal();
    showOrderConfirmation(newOrder);
}

function showOrderConfirmation(order) {
    const modal = document.getElementById('order-confirm-modal');
    const confirmOrderId = document.querySelector('.confirm-order-id');
    const confirmEstDate = document.querySelector('.confirm-est-date');
    
    if (confirmOrderId) confirmOrderId.textContent = order.orderId;
    if (confirmEstDate) confirmEstDate.textContent = order.estDelivery;

    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeOrderConfirmModal() {
    const modal = document.getElementById('order-confirm-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Toast de notification (Animation Emil Kowalski style)
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Déclencher l'animation d'entrée
    setTimeout(() => toast.classList.add('show'), 10);

    // Retirer le toast après 3.5 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Temps de la transition CSS
    }, 3500);
}
