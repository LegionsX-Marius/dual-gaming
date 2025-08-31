# DualGaming - FiveM Roleplay Server Website

Site oficial pentru serverul de FiveM DualGaming cu sistem complet de e-commerce și autentificare CFX.re.

## 🚀 Instalare Rapidă

1. **Descarcă toate fișierele** și pune-le în structura corectă
2. **Adaugă imaginile** în folderul `assets/images/`
3. **Deschide `index.html`** în browser pentru testare
4. **Uploadează pe server** pentru producție

## 📁 Structura Fișierelor

```
dualgaming-website/
├── index.html                 # Pagina principală
├── assets/
│   ├── css/
│   │   └── styles.css         # Toate stilurile
│   ├── js/
│   │   └── script.js          # Toate funcționalitățile
│   └── images/
│       ├── logo.png           # Logo serverului
│       ├── favicon.ico        # Iconița din tab
│       └── hero-bg.jpg        # Fundal hero section
└── README.md                  # Acest fișier
```

## ✨ Funcționalități

### 🏠 **Pagina Principală**
- Hero section animat cu fundal personalizat
- Secțiune cu caracteristicile serverului
- Design responsive pentru toate dispozitivele
- Efecte de parallax și animații

### 🛒 **Sistem de Shop**
- 17+ produse pre-configurate (VIP, vehicule, proprietăți, obiecte)
- Coș de cumpărături funcțional
- Filtrare pe categorii
- Sistem de cantități (+/-)
- Salvare automată în localStorage

### 🔐 **Autentificare CFX.re**
- Login modal elegant
- Validare email și username
- Sesiuni persistente
- Interface utilizator personalizată

### 💳 **Sistem de Checkout**
- Formular complet de finalizare
- Validare date utilizator
- Generare ID comenzi unice
- Instrucțiuni clare pentru `/getdual`

### 📱 **Design Responsive**
- Mobile-first design
- Menu mobil hamburger
- Adaptare automată pentru tablete și telefoane
- Touch-friendly interface

### 🎨 **Alte Funcționalități**
- Loading screen animat
- Notificări toast elegante
- Efecte de hover și animații
- Parallax scrolling
- Optimizare SEO

## 🔧 Personalizare

### **Adăugare Produse Noi**

În fișierul `assets/js/script.js`, găsește array-ul `products` și adaugă:

```javascript
{
    id: 'produs-nou',
    name: 'Numele Produsului',
    price: 99,
    category: 'vip', // sau 'vehicles', 'properties', 'items'
    icon: '🎮',
    description: 'Descrierea produsului cu beneficiile incluse.'
}
```

### **Schimbarea Culorilor**

In `assets/css/styles.css`, caută variabilele CSS și modifică:
- `#ff0000` - Roșu principal
- `#cc0000` - Roșu secondary
- `#990000` - Roșu închis

### **Actualizare Logo**

Înlocuiește `assets/images/logo.png` cu logo-ul tău (200x200px recomandat).

### **Schimbarea Textelor**

Toate textele sunt în `index.html` și pot fi modificate direct.

## 🌐 Implementare pentru Producție

### **1. Upload pe Server**
- Încarcă toate fișierele pe serverul web
- Asigură-te că structura de foldere este corectă
- Testează funcționalitățile în browser

### **2. Configurare CFX.re API**

Pentru autentificare reală cu CFX.re, modifică în `script.js`:

```javascript
async function cfxLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('cfx-username').value;
    const email = document.getElementById('cfx-email').value;
    
    try {
        const response = await fetch('https://api.cfx.re/user/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        });
        
        if (response.ok) {
            const userData = await response.json();
            currentUser = userData;
            // Continuă cu logica...
        }
    } catch (error) {
        showNotification('Eroare la conectarea cu CFX.re', 'error');
    }
}
```

### **3. Backend pentru Procesarea Plăților**

Creează un endpoint pentru procesarea comenzilor:

```javascript
// Înlocuiește funcția processPaymentSuccess
async function processPayment(event) {
    event.preventDefault();
    
    const orderData = {
        serverId: document.getElementById('server-id').value,
        cfxUser: currentUser,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    try {
        const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        if (result.success) {
            showMessage('Plată procesată cu succes!', 'success');
        }
    } catch (error) {
        showMessage('Eroare la procesarea plății', 'error');
    }
}
```

### **4. Script FiveM pentru `/getdual`**

```lua
-- server.lua
RegisterCommand('getdual', function(source, args, rawCommand)
    local serverId = source
    
    -- Verifică în baza de date pentru comenzi pending
    MySQL.Async.fetchAll('SELECT * FROM pending_orders WHERE server_id = @server_id AND status = @status', {
        ['@server_id'] = serverId,
        ['@status'] = 'pending'
    }, function(result)
        if result[1] then
            local order = result[1]
            local items = json.decode(order.items)
            
            -- Procesează fiecare produs
            for _, item in pairs(items) do
                if item.category == 'vip' then
                    -- Acordă status VIP
                    giveVipStatus(serverId, item.id, item.quantity)
                elseif item.category == 'vehicles' then
                    -- Adaugă vehicul în garaj
                    addVehicleToGarage(serverId, item.id, item.name)
                elseif item.category == 'properties' then
                    -- Acordă proprietate
                    giveProperty(serverId, item.id)
                elseif item.category == 'items' then
                    -- Adaugă bani/obiecte
                    if string.find(item.id, 'money') then
                        local amount = extractMoneyAmount(item.name)
                        addMoney(serverId, amount)
                    elseif item.id == 'starter-pack' then
                        giveStarterPack(serverId)
                    end
                end
            end
            
            -- Marchează comanda ca procesată
            MySQL.Async.execute('UPDATE pending_orders SET status = @status WHERE id = @id', {
                ['@id'] = order.id,
                ['@status'] = 'completed'
            })
            
            TriggerClientEvent('chatMessage', serverId, 'DualGaming', {255, 0, 0}, 
                'Ai primit produsele comandate! ID Comandă: ' .. order.order_id)
        else
            TriggerClientEvent('chatMessage', serverId, 'DualGaming', {255, 255, 0}, 
                'Nu ai comenzi în așteptare.')
        end
    end)
end, false)

-- Funcții helper
function giveVipStatus(playerId, vipType, duration)
    -- Implementează logica VIP
end

function addVehicleToGarage(playerId, vehicleId, vehicleName)
    -- Implementează adăugarea vehiculului
end

function giveProperty(playerId, propertyId)
    -- Implementează acordarea proprietății
end

function addMoney(playerId, amount)
    -- Implementează adăugarea banilor
end

function giveStarterPack(playerId)
    -- Implementează starter pack
end

function extractMoneyAmount(itemName)
    -- Extrage suma din numele produsului (ex: "1,000,000 $" -> 1000000)
    local amount = string.match(itemName, "([%d,]+)")
    return tonumber(string.gsub(amount, ",", ""))
end
```

### **5. Baza de Date**

```sql
CREATE TABLE pending_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    server_id INT NOT NULL,
    cfx_username VARCHAR(100) NOT NULL,
    cfx_id VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    items TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_server_id (server_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Tabel pentru utilizatori
CREATE TABLE cfx_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cfx_username VARCHAR(100) UNIQUE NOT NULL,
    cfx_id VARCHAR(100) UNIQUE,
    email VARCHAR(255) NOT NULL,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_cfx_username (cfx_username),
    INDEX idx_cfx_id (cfx_id)
);
```

## 🎮 Testare Funcționalități

### **Testare Coș de Cumpărături**
1. Accesează pagina Shop
2. Adaugă produse în coș
3. Verifică iconița coșului (numărul de produse)
4. Deschide coșul și testează +/- cantități
5. Testează ștergerea produselor

### **Testare Login CFX**
1. Click pe "Login CFX"
2. Completează username și email fictiv
3. Verifică că interface-ul se schimbă după login
4. Testează logout-ul

### **Testare Checkout**
1. Cu coș plin și utilizator logat
2. Click "Finalizează comanda"
3. Completează ID server
4. Verifică procesarea plății simulată

### **Testare Mobile**
1. Redimensionează browser-ul la dimensiuni mobile
2. Testează menu hamburger
3. Verifică că toate funcționalitățile merg pe mobile

## 📞 Support

Pentru probleme de implementare sau personalizări:
1. Verifică consola browser-ului pentru erori
2. Asigură-te că toate fișierele sunt în locațiile corecte
3. Testează pe un server web local (nu direct din fișier)

## 🔐 Securitate

- **Nu pune niciodată chei API în frontend**
- **Validează toate datele pe backend**
- **Folosește HTTPS în producție**
- **Implementează rate limiting pentru API-uri**

## 📈 Optimizări Recomandate

- **Compresia imaginilor** pentru încărcare mai rapidă
- **Minificarea CSS/JS** pentru producție
- **CDN** pentru asset-uri statice
- **Caching** pentru performanțe mai bune

---

**Dezvoltat pentru DualGaming FiveM Server**  
Versiunea: 1.0.0  
Ultima actualizare: 2025