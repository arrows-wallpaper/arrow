// Add this at the very top of your script.js file

// Firebase configuration (replace with your actual Firebase config values)
const firebaseConfig = {
    apiKey: "AIzaSyAR8Wlm6yVlYO_Vr2MilLtF_CWUXBJnXEI",
    authDomain: "arrows-wallpaper.firebaseapp.com",
    databaseURL: "https://arrows-wallpaper-default-rtdb.asia-southeast1.firebasedatabase.app", // Ensure the correct URL
    projectId: "arrows-wallpaper",
    storageBucket: "arrows-wallpaper.appspot.com",
    messagingSenderId: "967806124745",
    appId: "1:967806124745:web:1160827c052d5034ad4318",
    measurementId: "G-TR46814S7E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Database of wallpaper patterns with fixed quantities
const wallpaperPatternsLocal = {
    'P1-1201': 125, 'P2-1202': 75, 'P3-1203': 200, 'P4-1204': 50, 'P5-1205': 180,
    'P6-1801': 90, 'P7-1804': 45, 'P8-1806': 160, 'P9-SE7633': 95, 'P10-SE7634': 150,
    'P11-SE763A': 85, 'P12-SE763B': 120, 'P13-SE763D': 30, 'P14-SE7661': 175,
    'P15-SE7665': 65, 'P16-SE766C': 140, 'P17-SE7673': 25, 'P18-SE7674': 190,
    'P19-SE7676': 70, 'P20-SE7677': 110, 'P21-SE7697': 40, 'P22-SE7700': 165,
    'P23-SE7703': 55, 'P24-SE7704': 130, 'P25-SE7707': 20, 'P26-SE770A': 185,
    'P27-SE770D': 80, 'P28-SE7745': 145, 'P29-SE7748': 35, 'P30-SE7749': 170,
    'P31-SE7781': 60, 'P32-SE7786': 135, 'P33-SE7788': 15, 'P34-SE7647': 195,
    'P35-SE7648': 85, 'P36-SE7725': 155, 'P37-SE7727': 45, 'P38-SE7763': 180,
    'P39-SE7766': 75, 'P40-SE7767': 140, 'P41-SE7770': 25, 'P42-SE7804': 190,
    'P43-SE7820': 70, 'P44-SE7826': 145, 'P45-SE7833': 30, 'P46-SN8011': 175,
    'P47-8016': 65, 'P48-998073': 150, 'P49-998075': 35, 'P50-998083': 185,
    'P51-403': 80, 'P52-404': 155, 'P53-701': 40, 'P54-704': 170, 'P55-705': 60,
    'P56-1303': 135, 'P57-1304': 20, 'P58-1306': 195, 'P59-1307': 90, 'P60-1601': 160,
    'P1-SE7803': 45, 'P2-SE7805': 175, 'P3-SE7816': 70, 'P4-SK7633': 140,
    'P5-SK7634': 25, 'P6-SK7645': 190, 'P7-SK764C': 85, 'P8-SK766C': 150,
    'P9-SK766D': 30, 'P10-SK7817': 165, 'P11-SK7970': 55, 'P12-SK7972': 130,
    'P13-SK7975': 15, 'P14-SK7976': 185, 'P15-SK7978': 75, 'P16-SK7651': 145,
    'P17-SK7658': 35, 'P18-SK7659': 170, 'P19-SK765A': 65, 'P20-SK765B': 125,
    'P21-SK7702': 20, 'P22-SK7703': 195, 'P23-SK7704': 80, 'P24-SK7706': 155,
    'P25-SK770J': 40, 'P26-SK7717': 180, 'P27-SK7758': 70, 'P28-SK775A': 135,
    'P29-SK775B': 25, 'P30-SK7870': 190, 'P31-SK7873': 85, 'P32-SK7877': 160,
    'P33-SK7878': 45, 'P34-SK800A': 175, 'P35-SK800B': 60, 'P36-SK7749': 130,
    'P37-SK8011': 15, 'P38-SK8013': 185, 'P39-SK7766': 75, 'P40-SK7851': 150,
    'P41-SK7855': 35, 'P42-SL3763': 170, 'P43-SL3765': 65, 'P44-SL3767': 140,
    'P45-SL3769': 30, 'P46-SL3791': 195, 'P47-SL3823': 90, 'P48-SL3826': 155,
    'P49-SL3846': 40, 'P50-SL3899': 180, 'P51-SL3901': 70, 'P52-SL3710': 145,
    'P53-SL3719': 25, 'P54-SL3754': 190, 'P55-SL375A': 80, 'P56-SL375B': 160,
    'P57-SL375C': 45, 'P58-SL3856': 175, 'P59-SL3923': 55, 'P60-SL392B': 135
};

// Define wallpaperPatterns as an empty object to store fetched data
const wallpaperPatterns = {};

// Function to initialize the database
const initializeDatabase = async () => {
    try {
        const snapshot = await database.ref('patterns').once('value');
        if (!snapshot.exists()) {
            // If database is empty, initialize it with wallpaperPatternsLocal
            await database.ref('patterns').set(wallpaperPatternsLocal);
            Object.assign(wallpaperPatterns, wallpaperPatternsLocal);
            console.log('Database initialized with local wallpaper patterns.');
        } else {
            // If data exists, update our local object
            const firebasePatterns = snapshot.val();
            Object.assign(wallpaperPatterns, firebasePatterns);
            console.log('Database synced with Firebase patterns.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the database
    initializeDatabase().then(() => {
        // After initialization, you can perform any additional setup if needed
        console.log('Wallpaper patterns are ready.');
    });

    // Admin credentials
    const ADMIN_CREDENTIALS = {
        username: 'Admin',
        password: 'Arw@123'
    };

    // Track admin login state
    let isAdminLoggedIn = false;

    // Get modal elements
    const adminModal = document.getElementById('adminModal');
    const adminLink = document.querySelector('a[href="#"].text-\\[\\#1e3a8a\\]');
    const closeModal = document.getElementById('closeModal');
    const adminForm = document.getElementById('adminForm');

    // Function to update admin UI
    const updateAdminUI = () => {
        const adminLinkContainer = document.querySelector('.admin-link-container');
        if (isAdminLoggedIn) {
            adminLinkContainer.innerHTML = `
                <button class="text-[#1e3a8a] hover:text-[#1e4598] font-bold text-sm transition-colors duration-200" id="logoutBtn">
                    Logout
                </button>
            `;
            document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        } else {
            adminLinkContainer.innerHTML = `
                <a href="#" class="text-[#1e3a8a] hover:text-[#1e4598] font-bold text-sm transition-colors duration-200">Admin?</a>
            `;
            setupAdminLink();
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        isAdminLoggedIn = false;
        updateAdminUI();
        performSearch(); // Refresh current search results without edit controls
    };

    // Show modal when clicking Admin? link
    const setupAdminLink = () => {
        const adminLink = document.querySelector('a[href="#"].text-\\[\\#1e3a8a\\]');
        if (adminLink) {
            adminLink.addEventListener('click', (e) => {
                e.preventDefault();
                adminModal.classList.remove('hidden');
                adminModal.classList.add('flex');
            });
        }
    };

    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            adminModal.classList.remove('flex');
            adminModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside the modal content
    if (adminModal) {
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.classList.remove('flex');
                adminModal.classList.add('hidden');
            }
        });
    }

    // Handle form submission
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                isAdminLoggedIn = true;
                updateAdminUI();
                adminForm.reset();
                adminModal.classList.remove('flex');
                adminModal.classList.add('hidden');
                performSearch(); // Refresh current search results with edit controls
            } else {
                alert('Invalid credentials!');
            }
        });
    }

    // Function to update pattern quantity
    const updatePatternQuantity = async (patternCode, newQuantity) => {
        // Update local state
        wallpaperPatterns[patternCode] = newQuantity;
        
        // Also update Firebase
        try {
            await database.ref(`patterns/${patternCode}`).set(newQuantity);
            console.log(`Pattern ${patternCode} updated to quantity ${newQuantity} in Firebase.`);
        } catch (error) {
            console.error('Error updating Firebase:', error);
        }
        
        performSearch(); // Refresh the search results
    };

    // Function to create quantity controls for admin
    const createQuantityControls = (quantity, patternCode) => {
        return `
            <div class="flex items-center gap-2 mt-2">
                <button class="decrease-qty text-[#1e3a8a] hover:text-[#1e4598] font-bold px-2">-</button>
                <input type="number" class="qty-input w-16 text-center border border-[#e7edf3] rounded-md" value="${quantity}">
                <button class="increase-qty text-[#1e3a8a] hover:text-[#1e4598] font-bold px-2">+</button>
                <button class="save-qty bg-[#1e3a8a] hover:bg-[#1e4598] text-white px-2 py-1 rounded-md ml-2">Save</button>
            </div>
        `;
    };

    const searchInput = document.getElementById('pattern-search');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Function to perform the search
    const performSearch = () => {
        let searchTerm = searchInput.value.trim().toUpperCase();
        searchResults.innerHTML = '';

        if (searchTerm.startsWith('P')) {
            searchTerm = searchTerm.substring(1);
        }
        
        let foundPattern = null;
        let foundKey = null;

        for (let key in wallpaperPatterns) {
            let patternWithoutP = key.startsWith('P') ? key.substring(1) : key;
            
            if (key.toUpperCase() === searchTerm || 
                patternWithoutP.toUpperCase() === searchTerm ||
                key.toUpperCase().includes(searchTerm) ||
                patternWithoutP.toUpperCase().includes(searchTerm)) {
                foundPattern = wallpaperPatterns[key];
                foundKey = key;
                break;
            }
        }

        if (foundPattern !== null) {
            const quantity = foundPattern;
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card bg-gray-50 p-4 border border-gray-300 rounded-md mb-4';

            let statusColor = quantity > 50 ? '#4CAF50' : quantity > 0 ? '#FFA726' : '#EF5350';
            let statusText = quantity > 50 ? 'In Stock' : quantity > 0 ? 'Low Stock' : 'Out of Stock';

            resultCard.innerHTML = `
                <div class="pattern-info">
                    <span class="pattern-code font-semibold text-lg">${foundKey}</span>
                    <div class="status" style="color: ${statusColor}; font-size: 0.875rem;">
                        ${statusText}
                    </div>
                </div>
                <div class="quantity-info">
                    ${isAdminLoggedIn 
                        ? createQuantityControls(quantity, foundKey)
                        : `<span class="quantity text-md">${quantity} rolls available</span>`
                    }
                </div>
            `;

            if (isAdminLoggedIn) {
                // Add event listeners for quantity controls
                const decreaseBtn = resultCard.querySelector('.decrease-qty');
                const increaseBtn = resultCard.querySelector('.increase-qty');
                const saveBtn = resultCard.querySelector('.save-qty');
                const qtyInput = resultCard.querySelector('.qty-input');

                decreaseBtn.addEventListener('click', () => {
                    let currentValue = parseInt(qtyInput.value);
                    if (currentValue > 0) {
                        qtyInput.value = currentValue - 1;
                    }
                });

                increaseBtn.addEventListener('click', () => {
                    let currentValue = parseInt(qtyInput.value);
                    qtyInput.value = currentValue + 1;
                });

                saveBtn.addEventListener('click', () => {
                    const newQuantity = parseInt(qtyInput.value);
                    if (isNaN(newQuantity) || newQuantity < 0) {
                        alert('Please enter a valid quantity.');
                        return;
                    }
                    updatePatternQuantity(foundKey, newQuantity);
                });
            }

            searchResults.appendChild(resultCard);
        } else {
            const notFound = document.createElement('div');
            notFound.className = 'not-found p-4 bg-red-100 border border-red-400 rounded-md';
            notFound.innerHTML = `
                <p class="text-[#EF5350] text-center py-4 font-medium">
                    No pattern found with code "${searchInput.value.trim()}"
                </p>
            `;
            searchResults.appendChild(notFound);
        }
    };

    // Search button click handler
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Enter key press handler
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Initial setup
    updateAdminUI();

    // Ensure that the admin link is set up correctly
    setupAdminLink();
});
