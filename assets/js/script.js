// ============ CONFIGURARE PRODUSE ============
// Pentru a adăuga produse noi, doar adaugă-le în acest array
const products = [
    // VIP Packages
    {
        id: 'vip-bronze',
        name: 'VIP Bronze',
        price: 25,
        category: 'vip',
        icon: '💎',
        description: '• Spawn preferențial<br>• +50% XP<br>• Chat colorat<br>• 2 vehicule bonus'
    },
    {
        id: 'vip-silver',
        name: 'VIP Silver',
        price: 45,
        category: 'vip',
        icon: '🏆',
        description: '• Toate din Bronze<br>• +100% XP<br>• Acces zone VIP<br>• 5 vehicule bonus'
    },
    {
        id: 'vip-gold',
        name: 'VIP Gold',
        price: 75,
        category: 'vip',
        icon: '👑',
        description: '• Toate din Silver<br>• +200% XP<br>• Vehicule exclusive<br>• Casa VIP gratuită'
    },

    // Vehicule
    {
        id: 'lamborghini',
        name: 'Lamborghini Huracán',
        price: 150,
        category: 'vehicles',
        icon: '🏎️',
        description: 'Supercar premium cu tuning complet inclus și asigurare pe viață.'
    },
    {
        id: 'bmw-x6',
        name: 'BMW X6M Competition',
        price: 120,
        category: 'vehicles',
        icon: '🚙',
        description: 'SUV luxury perfect pentru afaceri și familie. Tuning premium inclus.'
    },
    {
        id: 'mercedes-amg',
        name: 'Mercedes AMG GT63S',
        price: 140,
        category: 'vehicles',
        icon: '🚗',
        description: '4-door coupe cu performanțe excepționale și design elegant.'
    },
    {
        id: 'audi-rs7',
        name: 'Audi RS7 Sportback',
        price: 135,
        category: 'vehicles',
        icon: '🚘',
        description: 'Sportback premium cu tehnologie avansată și performanțe de top.'
    },
    {
        id: 'porsche-911',
        name: 'Porsche 911 Turbo S',
        price: 160,
        category: 'vehicles',
        icon: '🏁',
        description: 'Legendara 911 în versiunea sa cea mai puternică și rafinată.'
    },

    // Proprietăți
    {
        id: 'penthouse',
        name: 'Penthouse Vinewood',
        price: 300,
        category: 'properties',
        icon: '🏢',
        description: 'Apartament de lux în inima Los Santos cu vedere panoramică.'
    },
    {
        id: 'villa-richman',
        name: 'Villa Richman Hills',
        price: 450,
        category: 'properties',
        icon: '🏡',
        description: 'Vilă exclusivistă în cel mai prestigios cartier din Los Santos.'
    },
    {
        id: 'business-restaurant',
        name: 'Restaurant Premium',
        price: 500,
        category: 'properties',
        icon: '🍽️',
        description: 'Restaurant de lux complet mobilat și gata de business.'
    },
    {
        id: 'nightclub',
        name: 'Club de Noapte',
        price: 650,
        category: 'properties',
        icon: '🌃',
        description: 'Club exclusiv cu toate facilitățile pentru evenimente private.'
    },

    // Obiecte
    {
        id: 'money-1m',
        name: '1,000,000 $',
        price: 35,
        category: 'items',
        icon: '💰',
        description: 'Un milion de dolari in-game pentru a-ți începe aventura.'
    },
    {
        id: 'money-5m',
        name: '5,000,000 $',
        price: 150,
        category: 'items',
        icon: '💵',
        description: 'Cinci milioane de dolari pentru investiții majore în joc.'
    },
    {
        id: 'starter-pack',
        name: 'Starter Pack',
        price: 20,
        category: 'items',
        icon: '🎒',
        description: 'Kit complet pentru începători: bani, vehicul, telefon, haine.'
    },
    {
        id: 'premium-weapons',
        name: 'Pachet Arme Premium',
        price: 80,
        category: 'items',
        icon: '🔫',
        description: 'Set complet de arme premium cu licență inclusă.'
    },
    {
        id: 'custom-plate',
        name: 'Număr Personalizat',
        price: 25,
        category: 'items',
        icon: '🔢',
        description: 'Număr de înmatriculare personalizat pentru vehiculele tale.'
    },
    {
        id: 'pack-smurd',
        name: 'Pack Smurd Personalizat',
        price: 15,
        category: 'items', // sau 'vehicles', 'properties', 'items'
        icon: '🎒',
        description: 'Avem un Pack pentru Smurd pt cei la inceput, un GHID complet pe discord.'
}
];

// ============ VARIABILE GLOBALE ============
let cart = JSON.parse(localStorage.getItem('dualgaming_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('dualgaming_user')) || null;
let currentCategory = 'all';

// ============ DOM ELEMENTS ============
const elements = {
    cartCount: null,
    cartItems: null,
    cartTotal: null,
    checkoutBtn: null,
    cartSidebar: null,
    overlay: null,
    cfxModal: null,
    loginBtn: null,
    userInfo: null,
    username: null,
    userPanel: null,
    shopItemsContainer: null,
    checkoutSection: null,
    notificationContainer: null,
    loading: null
};

// ============ INIȚIALIZARE ============
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeApp();
});

function initializeElements() {
    elements.cartCount = document.getElementById('cart-count');
    elements.cartItems = document.getElementById('cart-items');
    elements.cartTotal = document.getElementById('cart-total');
    elements.checkoutBtn = document.getElementById('checkout-btn');
    elements.cartSidebar = document.getElementById('cart-sidebar');
    elements.overlay = document.getElementById('overlay');
    elements.cfxModal = document.getElementById('cfx-modal');
    elements.loginBtn = document.getElementById('login-btn');
    elements.userInfo = document.getElementById('user-info');
    elements.username = document.getElementById('username');
    elements.userPanel = document.getElementById('user-panel');
    elements.shopItemsContainer = document.getElementById('shop-items-container');
    elements.checkoutSection = document.getElementById('checkout-section');
    elements.notificationContainer = document.getElementById('notification-container');
    elements.loading = document.getElementById('loading');
}

function initializeApp() {
    // Loading screen
    setTimeout(() => {
        if (elements.loading) {
            elements.loading.classList.add('hidden');
            setTimeout(() => {
                elements.loading.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Generare produse
    generateShopItems();
    
    // Actualizare UI
    updateCartUI();
    updateUserInterface();
    updatePlayerCount();
    
    // Event listeners
    setupEventListeners();
    
    // Setare pagină activă
    showPage('home');
    
    console.log('✅ DualGaming website încărcat cu succes!');
    console.log('🛒 Sistem de cumpărături CFX.re activat!');
    console.log('📦 Produse disponibile:', products.length);
}

// ============ EVENT LISTENERS ============
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Resize handler
    window.addEventListener('resize', handleResize);
    
    // Close modals on outside click
    window.addEventListener('click', handleOutsideClick);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Form submissions
    const cfxForm = document.getElementById('cfx-login-form');
    if (cfxForm) {
        cfxForm.addEventListener('submit', cfxLogin);
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendContactMessage);
    }
    
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', processPayment);
    }
    
    // Player count update
    setInterval(updatePlayerCount, 30000);
    
    // Auto-save cart
    setInterval(saveCartToStorage, 5000);
}

// ============ NAVIGARE PAGINI ============
function showPage(pageId) {
    try {
        // Ascunde toate paginile
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Afișează pagina selectată
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            console.error(`Pagina ${pageId} nu există!`);
            return;
        }
        
        // Actualizează navigația
        updateActiveNavLink(pageId);
        
        // Resetări specifice pentru shop
        if (pageId === 'shop') {
            resetShopPage();
            updateUserPanel();
        }
        
        // Închide menu-ul mobil dacă este deschis
        closeMobileMenu();
        
        // Scroll la început
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Eroare la navigarea paginilor:', error);
    }
}

function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

function resetShopPage() {
    if (elements.shopItemsContainer) {
        elements.shopItemsContainer.style.display = 'grid';
    }
    
    const shopCategories = document.querySelector('.shop-categories');
    if (shopCategories) {
        shopCategories.style.display = 'flex';
    }
    
    if (elements.checkoutSection) {
        elements.checkoutSection.style.display = 'none';
    }
}

// ============ GENERARE PRODUSE ============
function generateShopItems() {
    if (!elements.shopItemsContainer) return;
    
    try {
        elements.shopItemsContainer.innerHTML = '';
        
        products.forEach((product, index) => {
            const productElement = createProductElement(product, index);
            elements.shopItemsContainer.appendChild(productElement);
        });
        
        // Aplică filtrul curent
        filterCategory(currentCategory);
        
    } catch (error) {
        console.error('Eroare la generarea produselor:', error);
    }
}

function createProductElement(product, index) {
    const productDiv = document.createElement('div');
    productDiv.className = 'shop-item animate-on-scroll';
    productDiv.setAttribute('data-category', product.category);
    productDiv.style.animationDelay = `${index * 0.1}s`;
    
    productDiv.innerHTML = `
        <div class="shop-item-image">${product.icon}</div>
        <div class="shop-item-content">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <div class="price">${product.price} RON</div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                <span>🛒</span> Adaugă în coș
            </button>
        </div>
    `;
    
    return productDiv;
}

// ============ MANAGEMENT COȘ ============
function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) {
            showNotification('Produs nu a fost găsit!', 'error');
            return;
        }

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartUI();
        saveCartToStorage();
        showNotification(`${product.name} a fost adăugat în coș!`, 'success');
        
        // Animație pentru buton
        const btn = document.querySelector(`[onclick="addToCart('${productId}')"]`);
        if (btn) {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        }
        
    } catch (error) {
        console.error('Eroare la adăugarea în coș:', error);
        showNotification('Eroare la adăugarea produsului!', 'error');
    }
}

function removeFromCart(productId) {
    try {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            const itemName = cart[itemIndex].name;
            cart.splice(itemIndex, 1);
            updateCartUI();
            saveCartToStorage();
            showNotification(`${itemName} a fost șters din coș!`, 'success');
        }
    } catch (error) {
        console.error('Eroare la ștergerea din coș:', error);
    }
}

function changeQuantity(productId, change) {
    try {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            saveCartToStorage();
        }
    } catch (error) {
        console.error('Eroare la schimbarea cantității:', error);
    }
}

function updateCartUI() {
    try {
        if (!elements.cartCount || !elements.cartItems || !elements.cartTotal || !elements.checkoutBtn) {
            return;
        }

        // Actualizare numărul din coș
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        elements.cartCount.textContent = totalItems;

        // Actualizare lista produselor
        elements.cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            elements.cartItems.innerHTML = '<p class="empty-cart-message">Coșul este gol</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItemElement = createCartItemElement(item, itemTotal);
                elements.cartItems.appendChild(cartItemElement);
            });
        }

        elements.cartTotal.textContent = total;
        elements.checkoutBtn.disabled = cart.length === 0;
        
        // Animație pentru numărul din coș
        if (totalItems > 0) {
            elements.cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                elements.cartCount.style.transform = 'scale(1)';
            }, 200);
        }
        
    } catch (error) {
        console.error('Eroare la actualizarea UI-ului coșului:', error);
    }
}

function createCartItemElement(item, itemTotal) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';
    
    cartItemDiv.innerHTML = `
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.price} RON x ${item.quantity} = ${itemTotal} RON</p>
        </div>
        <div class="cart-item-controls">
            <button onclick="changeQuantity('${item.id}', -1)" title="Scade cantitatea">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${item.id}', 1)" title="Crește cantitatea">+</button>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Șterge din coș">
                🗑️
            </button>
        </div>
    `;
    
    return cartItemDiv;
}

function toggleCart() {
    try {
        if (!elements.cartSidebar) return;
        
        const isOpen = elements.cartSidebar.classList.contains('open');
        
        if (isOpen) {
            closeCart();
        } else {
            openCart();
        }
    } catch (error) {
        console.error('Eroare la deschiderea/închiderea coșului:', error);
    }
}

function openCart() {
    if (elements.cartSidebar) {
        elements.cartSidebar.classList.add('open');
    }
    if (elements.overlay) {
        elements.overlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    if (elements.cartSidebar) {
        elements.cartSidebar.classList.remove('open');
    }
    if (elements.overlay) {
        elements.overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

function saveCartToStorage() {
    try {
        localStorage.setItem('dualgaming_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Eroare la salvarea coșului:', error);
    }
}

// ============ FILTRARE CATEGORII ============
function filterCategory(category) {
    try {
        currentCategory = category;
        const items = document.querySelectorAll('.shop-item');
        const buttons = document.querySelectorAll('.category-btn');
        
        // Actualizare butoane
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        // Filtrare produse cu animație
        items.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`;
            } else {
                item.style.display = 'none';
            }
        });
        
    } catch (error) {
        console.error('Eroare la filtrarea categoriilor:', error);
    }
}

// ============ AUTENTIFICARE CFX ============
function showLoginModal() {
    try {
        if (currentUser) {
            logout();
            return;
        }
        
        if (elements.cfxModal) {
            elements.cfxModal.style.display = 'block';
            if (elements.overlay) {
                elements.overlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Eroare la afișarea modalului de login:', error);
    }
}

function closeModal() {
    try {
        if (elements.cfxModal) {
            elements.cfxModal.style.display = 'none';
        }
        if (elements.overlay) {
            elements.overlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    } catch (error) {
        console.error('Eroare la închiderea modalului:', error);
    }
}

function cfxLogin(event) {
    event.preventDefault();
    
    try {
        const usernameInput = document.getElementById('cfx-username');
        const emailInput = document.getElementById('cfx-email');
        
        if (!usernameInput || !emailInput) {
            showNotification('Eroare la accesarea formularului!', 'error');
            return;
        }
        
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();

        if (!username || !email) {
            showNotification('Te rog completează toate câmpurile!', 'error');
            return;
        }

        // Validare email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Te rog introdu o adresă de email validă!', 'error');
            return;
        }

        // Simulare autentificare CFX (în producție aici ar fi API call real)
        currentUser = {
            username: username,
            email: email,
            cfxId: 'cfx_' + Math.random().toString(36).substr(2, 9),
            loginTime: new Date().toISOString()
        };

        // Salvare în localStorage
        localStorage.setItem('dualgaming_user', JSON.stringify(currentUser));

        // Actualizare interfață
        updateUserInterface();
        updateUserPanel();
        closeModal();
        
        showNotification(`Bun venit, ${username}! Acum poți face cumpărături.`, 'success');
        
        // Reset form
        usernameInput.value = '';
        emailInput.value = '';
        
    } catch (error) {
        console.error('Eroare la autentificare:', error);
        showNotification('Eroare la conectare! Te rog încearcă din nou.', 'error');
    }
}

function logout() {
    try {
        currentUser = null;
        localStorage.removeItem('dualgaming_user');
        
        updateUserInterface();
        
        if (elements.userPanel) {
            elements.userPanel.style.display = 'none';
        }
        
        showNotification('Te-ai deconectat cu succes.', 'success');
    } catch (error) {
        console.error('Eroare la deconectare:', error);
    }
}

function updateUserInterface() {
    try {
        if (currentUser) {
            if (elements.loginBtn) elements.loginBtn.style.display = 'none';
            if (elements.userInfo) elements.userInfo.style.display = 'flex';
            if (elements.username) elements.username.textContent = currentUser.username;
        } else {
            if (elements.loginBtn) elements.loginBtn.style.display = 'block';
            if (elements.userInfo) elements.userInfo.style.display = 'none';
        }
    } catch (error) {
        console.error('Eroare la actualizarea interfeței utilizatorului:', error);
    }
}

function updateUserPanel() {
    try {
        if (!elements.userPanel) return;
        
        if (currentUser) {
            elements.userPanel.style.display = 'block';
            
            const userDisplayName = document.getElementById('user-display-name');
            const userEmail = document.getElementById('user-email');
            
            if (userDisplayName) userDisplayName.textContent = currentUser.username;
            if (userEmail) userEmail.textContent = currentUser.email;
        } else {
            elements.userPanel.style.display = 'none';
        }
    } catch (error) {
        console.error('Eroare la actualizarea panoului utilizatorului:', error);
    }
}

// ============ CHECKOUT ============
function proceedToCheckout() {
    try {
        if (!currentUser) {
            showNotification('Trebuie să te conectezi cu CFX.re pentru a continua.', 'error');
            showLoginModal();
            return;
        }

        if (cart.length === 0) {
            showNotification('Coșul este gol!', 'error');
            return;
        }

        // Ascunde shop-ul și afișează checkout
        if (elements.shopItemsContainer) {
            elements.shopItemsContainer.style.display = 'none';
        }
        
        const shopCategories = document.querySelector('.shop-categories');
        if (shopCategories) {
            shopCategories.style.display = 'none';
        }
        
        if (elements.checkoutSection) {
            elements.checkoutSection.style.display = 'block';
        }

        // Pre-completare email
        const emailConfirm = document.getElementById('email-confirm');
        if (emailConfirm) {
            emailConfirm.value = currentUser.email;
        }

        // Afișare sumar comandă
        updateOrderSummary();
        
        // Închide coșul
        closeCart();
        
    } catch (error) {
        console.error('Eroare la trecerea la checkout:', error);
        showNotification('Eroare la procesarea comenzii!', 'error');
    }
}

function backToShop() {
    try {
        if (elements.shopItemsContainer) {
            elements.shopItemsContainer.style.display = 'grid';
        }
        
        const shopCategories = document.querySelector('.shop-categories');
        if (shopCategories) {
            shopCategories.style.display = 'flex';
        }
        
        if (elements.checkoutSection) {
            elements.checkoutSection.style.display = 'none';
        }
    } catch (error) {
        console.error('Eroare la întoarcerea la shop:', error);
    }
}

function updateOrderSummary() {
    try {
        const summary = document.getElementById('order-summary');
        const finalTotal = document.getElementById('final-total');
        
        if (!summary || !finalTotal) return;
        
        let total = 0;
        summary.innerHTML = '';

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const orderItemDiv = document.createElement('div');
            orderItemDiv.className = 'order-item';
            orderItemDiv.innerHTML = `
                <span>${item.icon} ${item.name} x${item.quantity}</span>
                <span><strong>${itemTotal} RON</strong></span>
            `;
            summary.appendChild(orderItemDiv);
        });

        finalTotal.textContent = total;
    } catch (error) {
        console.error('Eroare la actualizarea sumarului comenzii:', error);
    }
}

function processPayment(event) {
    event.preventDefault();
    
    try {
        const serverId = document.getElementById('server-id')?.value;
        const emailConfirm = document.getElementById('email-confirm')?.value;

        if (!serverId || !emailConfirm) {
            showMessage('Te rog completează toate câmpurile!', 'error');
            return;
        }

        if (emailConfirm !== currentUser.email) {
            showMessage('Email-ul nu se potrivește cu cel din contul CFX.re!', 'error');
            return;
        }

        // Validare server ID
        const serverIdNum = parseInt(serverId);
        if (isNaN(serverIdNum) || serverIdNum < 1) {
            showMessage('Te rog introdu un ID valid de server!', 'error');
            return;
        }

        // Afișare mesaj de procesare
        showMessage('Se procesează plata...', 'info');

        // Simulare procesare plată
        setTimeout(() => {
            processPaymentSuccess(serverIdNum);
        }, 3000);

    } catch (error) {
        console.error('Eroare la procesarea plății:', error);
        showMessage('Eroare la procesarea plății! Te rog încearcă din nou.', 'error');
    }
}

function processPaymentSuccess(serverId) {
    try {
        // Generare ID comandă unic
        const orderId = 'DG' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Creare obiect comandă
        const orderData = {
            orderId: orderId,
            serverId: serverId,
            cfxUsername: currentUser.username,
            cfxId: currentUser.cfxId,
            email: currentUser.email,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            total: total,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        // Salvare comandă (în producție aici ar fi API call către server)
        console.log('Comandă procesată:', orderData);

        // Simulare trimitere email confirmare
        sendConfirmationEmail(orderData);

        // Salvare comandă în localStorage pentru istoric
        saveOrderToHistory(orderData);

        // Afișare mesaj succes
        showMessage(`
            <strong>🎉 Plata a fost procesată cu succes!</strong><br><br>
            <strong>ID Comandă:</strong> ${orderId}<br>
            <strong>Total plătit:</strong> ${total} RON<br>
            <strong>Server ID:</strong> ${serverId}<br><br>
            <strong>📋 Pași următori:</strong><br>
            1. ✅ Vei primi un email de confirmare în câteva secunde<br>
            2. 🎮 Conectează-te pe server: <strong>connect dualgaming.ro</strong><br>
            3. 💬 Scrie în chat: <strong>/getdual</strong><br>
            4. 🎁 Vei primi automat toate produsele cumpărate!<br><br>
            <em>⚠️ Dacă întâmpini probleme, contactează staff-ul cu ID-ul comenzii.</em>
        `, 'success');

        // Golire coș
        cart = [];
        updateCartUI();
        saveCartToStorage();
        closeCart();

        // Întoarcere la shop după 10 secunde
        setTimeout(() => {
            backToShop();
        }, 10000);

    } catch (error) {
        console.error('Eroare la finalizarea plății:', error);
        showMessage('Eroare la finalizarea comenzii!', 'error');
    }
}

function sendConfirmationEmail(orderData) {
    try {
        // În implementarea reală, aici se trimite email prin API
        console.log('📧 Email confirmare trimis către:', orderData.email);
        console.log('📄 Conținut email:', {
            subject: `DualGaming - Confirmă comanda ${orderData.orderId}`,
            orderId: orderData.orderId,
            total: orderData.total,
            items: orderData.items,
            instructions: 'Conectează-te pe server și folosește /getdual pentru a primi produsele.'
        });
    } catch (error) {
        console.error('Eroare la trimiterea emailului de confirmare:', error);
    }
}

function saveOrderToHistory(orderData) {
    try {
        let orderHistory = JSON.parse(localStorage.getItem('dualgaming_orders')) || [];
        orderHistory.unshift(orderData); // Adaugă la început
        
        // Păstrează doar ultimele 10 comenzi
        if (orderHistory.length > 10) {
            orderHistory = orderHistory.slice(0, 10);
        }
        
        localStorage.setItem('dualgaming_orders', JSON.stringify(orderHistory));
    } catch (error) {
        console.error('Eroare la salvarea istoricului comenzilor:', error);
    }
}

// ============ CONTACT FORM ============
function sendContactMessage(event) {
    event.preventDefault();
    
    try {
        const name = document.getElementById('contact-name')?.value?.trim();
        const email = document.getElementById('contact-email')?.value?.trim();
        const subject = document.getElementById('contact-subject')?.value?.trim();
        const message = document.getElementById('contact-message')?.value?.trim();
        
        if (!name || !email || !subject || !message) {
            showNotification('Te rog completează toate câmpurile!', 'error');
            return;
        }
        
        // Validare email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Te rog introdu o adresă de email validă!', 'error');
            return;
        }
        
        // Simulare trimitere mesaj (în producție aici ar fi API call)
        console.log('📞 Contact form submitted:', { name, email, subject, message });
        
        showNotification('✅ Mesajul a fost trimis cu succes! Îți vom răspunde în cel mai scurt timp.', 'success');
        
        // Reset form
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-subject').value = '';
        document.getElementById('contact-message').value = '';
        
    } catch (error) {
        console.error('Eroare la trimiterea mesajului de contact:', error);
        showNotification('Eroare la trimiterea mesajului!', 'error');
    }
}

// ============ FUNCȚII UTILE ============
function showMessage(message, type = 'info') {
    try {
        const successMsg = document.getElementById('success-msg');
        const errorMsg = document.getElementById('error-msg');

        if (!successMsg || !errorMsg) return;

        // Ascunde toate mesajele
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';

        if (type === 'success') {
            successMsg.innerHTML = message;
            successMsg.style.display = 'block';
        } else if (type === 'error') {
            errorMsg.innerHTML = message;
            errorMsg.style.display = 'block';
        }

        // Auto-ascundere pentru mesajele de succes
        if (type === 'success') {
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 15000);
        }
    } catch (error) {
        console.error('Eroare la afișarea mesajului:', error);
    }
}

function showNotification(message, type = 'info') {
    try {
        // Creare container dacă nu există
        if (!elements.notificationContainer) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            document.body.appendChild(container);
            elements.notificationContainer = container;
        }

        // Creare notificare
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Buton de închidere
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            float: right;
            margin-left: 1rem;
            padding: 0;
        `;
        closeBtn.onclick = () => notification.remove();
        
        notification.appendChild(closeBtn);
        elements.notificationContainer.appendChild(notification);

        // Auto-remove după 5 secunde
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

    } catch (error) {
        console.error('Eroare la afișarea notificării:', error);
        // Fallback la alert
        alert(message);
    }
}

function connectToServer() {
    try {
        // Acest link va deschide FiveM și va conecta la server
        window.location.href = 'fivem://connect/dualgaming.ro';
        showNotification('Se deschide FiveM...', 'success');
    } catch (error) {
        console.error('Eroare la conectarea la server:', error);
        showNotification('Eroare la conectarea la server! Asigură-te că ai FiveM instalat.', 'error');
    }
}

function updatePlayerCount() {
    try {
        const counts = document.querySelectorAll('#player-count, #player-count-contact');
        // Simulare numărul de jucători (în producție ar fi API call real)
        const currentPlayers = Math.floor(Math.random() * 40) + 80;
        const maxPlayers = 128;
        
        counts.forEach(count => {
            if (count) {
                count.textContent = `${currentPlayers}/${maxPlayers}`;
            }
        });
    } catch (error) {
        console.error('Eroare la actualizarea numărului de jucători:', error);
    }
}

// ============ MOBILE MENU ============
function toggleMobileMenu() {
    try {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && mobileBtn) {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                if (elements.overlay) {
                    elements.overlay.classList.add('active');
                }
                document.body.style.overflow = 'hidden';
            } else {
                if (elements.overlay) {
                    elements.overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }
    } catch (error) {
        console.error('Eroare la toggle-ul meniului mobil:', error);
    }
}

function closeMobileMenu() {
    try {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && mobileBtn) {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Eroare la închiderea meniului mobil:', error);
    }
}

// ============ EVENT HANDLERS ============
function handleScroll() {
    try {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }

        // Parallax effect pentru elementele floating
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    } catch (error) {
        console.error('Eroare la scroll:', error);
    }
}

function handleResize() {
    try {
        // Închide coșul și modalurile pe resize
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        
        // Ajustare coș pe mobile
        if (elements.cartSidebar && window.innerWidth <= 768) {
            if (elements.cartSidebar.classList.contains('open')) {
                elements.cartSidebar.style.width = '100%';
            }
        }
    } catch (error) {
        console.error('Eroare la resize:', error);
    }
}

function handleOutsideClick(event) {
    try {
        // Închidere modal la click în afara acestuia
        if (elements.cfxModal && event.target === elements.cfxModal) {
            closeModal();
        }
        
        // Închidere coș la click în overlay
        if (elements.overlay && event.target === elements.overlay) {
            closeAll();
        }
    } catch (error) {
        console.error('Eroare la click-ul din afară:', error);
    }
}

function handleKeyboard(event) {
    try {
        // ESC pentru închidere modal/coș/menu
        if (event.key === 'Escape') {
            closeAll();
        }
        
        // Enter pentru deschiderea coșului când e focusat
        if (event.key === 'Enter' && event.target.classList.contains('cart-icon')) {
            toggleCart();
        }
    } catch (error) {
        console.error('Eroare la tastatura:', error);
    }
}

function closeAll() {
    try {
        closeModal();
        closeCart();
        closeMobileMenu();
    } catch (error) {
        console.error('Eroare la închiderea tuturor:', error);
    }
}

// ============ PERFORMANCE & ACCESSIBILITY ============
// Lazy loading pentru imagini
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Animații on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    });

    elements.forEach(el => observer.observe(el));
}

// ============ INIT FINAL ============
// Rulează după încărcarea completă a paginii
window.addEventListener('load', () => {
    lazyLoadImages();
    animateOnScroll();
    
    // Preload pentru imagini importante
    const importantImages = [
        'assets/images/hero-bg.jpg',
        'assets/images/logo.png'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ============ SERVICE WORKER (PWA Support) ============
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ============ DEBUG MODE ============
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 DEBUG MODE ACTIV');
    console.log('📦 Produse încărcate:', products.length);
    console.log('🛒 Coș actual:', cart);
    console.log('👤 Utilizator curent:', currentUser);
    
    // Funcții debug disponibile în consolă
    window.debugDualGaming = {
        cart,
        currentUser,
        products,
        addToCart,
        clearCart: () => {
            cart = [];
            updateCartUI();
            saveCartToStorage();
        },
        showAllNotifications: () => {
            showNotification('Test Success', 'success');
            showNotification('Test Error', 'error');
            showNotification('Test Info', 'info');
        }
    };

}
