const cars = [
    {
        id: 1,
        name: "BYD Dolphin",
        brand: "BYD",
        type: "Hatch",
        price: "R$ 149.800",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500"
        ],
        desc: "Compacto 100% elétrico com excelente autonomia urbana e tecnologia de ponta."
    },
    {
        id: 2,
        name: "Haval H6 GT",
        brand: "GWM",
        type: "SUV",
        price: "R$ 315.000",
        images: [
            "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500"
        ],
        desc: "SUV Coupé híbrido/elétrico com design esportivo e desempenho surpreendente."
    },
    {
        id: 3,
        name: "Volvo EX30",
        brand: "Volvo",
        type: "SUV",
        price: "R$ 229.950",
        images: [
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500"
        ],
        desc: "O menor SUV da Volvo com a maior aceleração e foco total em sustentabilidade."
    },
    {
        id: 4,
        name: "Porsche Taycan",
        brand: "Porsche",
        type: "Esportivo",
        price: "R$ 660.000",
        images: [
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500",
            "https://images.unsplash.com/photo-1611245141725-d0d1e34f41b2?w=500"
        ],
        desc: "Esportivo elétrico de altíssima performance, conforto premium e design icônico."
    }
];

// Elementos
const carGrid = document.getElementById("car-grid");
const brandFilter = document.getElementById("brand-filter");
const typeFilter = document.getElementById("type-filter");
const themeBtn = document.getElementById("toggle-theme");
const incFontBtn = document.getElementById("increase-font");
const decFontBtn = document.getElementById("decrease-font");

const modal = document.getElementById("car-modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalTypeBrand = document.getElementById("modal-type-brand");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-description");
const modalGallery = document.getElementById("modal-gallery");

let currentFontSize = 16;

// Renderizar carros
function renderCars() {
    carGrid.innerHTML = "";
    const selectedBrand = brandFilter.value;
    const selectedType = typeFilter.value;

    const filtered = cars.filter(car => {
        const matchBrand = selectedBrand === "all" || car.brand === selectedBrand;
        const matchType = selectedType === "all" || car.type === selectedType;
        return matchBrand && matchType;
    });

    filtered.forEach(car => {
        const card = document.createElement("div");
        card.className = "car-card";
        card.innerHTML = `
            <img src="${car.images[0]}" alt="${car.name}">
            <div class="car-card-info">
                <h3>${car.name}</h3>
                <p>${car.brand} | ${car.type}</p>
                <p class="price">${car.price}</p>
            </div>
        `;
        card.addEventListener("click", () => openCarModal(car));
        carGrid.appendChild(card);
    });
}

// Modal
function openCarModal(car) {
    modalTitle.textContent = car.name;
    modalTypeBrand.textContent = `Marca: ${car.brand} | Tipo: ${car.type}`;
    modalPrice.textContent = car.price;
    modalDesc.textContent = car.desc;
    
    modalGallery.innerHTML = "";
    car.images.forEach(imgUrl => {
        const img = document.createElement("img");
        img.src = imgUrl;
        modalGallery.appendChild(img);
    });

    modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));

// Filtros
brandFilter.addEventListener("change", renderCars);
typeFilter.addEventListener("change", renderCars);

// Acessibilidade: Modo Escuro/Claro
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeBtn.textContent = isDark ? "Modo Claro" : "Modo Escuro";
});

// Acessibilidade: Fonte
incFontBtn.addEventListener("click", () => {
    if (currentFontSize < 22) {
        currentFontSize += 2;
        document.documentElement.style.setProperty("--base-font", `${currentFontSize}px`);
    }
});

decFontBtn.addEventListener("click", () => {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.setProperty("--base-font", `${currentFontSize}px`);
    }
});

// Inicialização
renderCars();
