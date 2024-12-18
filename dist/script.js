import { products } from "./products.js";
import { formatCurrency } from "./money.js";
import { cart,addToCart } from "./cart.js";
// Toogle menu for navbar
const navDialog = document.getElementById("nav-dialog");
const toggleButton = document.getElementById("toggleButton");
const closeButton = document.getElementById("closeButton");

export function togglemenu() {
  navDialog.classList.toggle("hidden");
  toggleButton.classList.toggle("hidden");
  closeButton.classList.toggle("hidden");
}
toggleButton.addEventListener("click", togglemenu);
closeButton.addEventListener("click", togglemenu);

// Loved-Dishes Section
const lovedDishesContainer = document.getElementById("most-loved-container");

const mostLovedProducts = [
  products.find((product) => product.id === "North-butterchicken"), // Butter-Chicken
  products.find((product) => product.id === "Italian-lasagna"), // Margherita Pizza
  products.find((product) => product.id === "Mexican-tacos"), // Tacos al pastor
  products.find((product) => product.id === "South-idli"), // Tomato Uttapam
];

let lovedDishesHTML = '';
mostLovedProducts.forEach((product) => {
  lovedDishesHTML += `
        <div class="w-64 h-80 rounded-xl flex flex-col justify-center items-center border-black border-solid border-2 mb-8 bg-slate-400 font-semibold">
          <img src="${product.image}" alt="${
    product.name
  }" class="w-48 md:w-80 p-4" />
          <a href="">${product.name}</a>
          <p><i class="fa-solid fa-indian-rupee-sign"></i> ${formatCurrency(
            product.pricePaise
          )}</p>
          <button
            class="add-to-cart h-10 w-28 bg-blue-500 text-white font-semibold rounded-lg mt-2 js-add-to-cart"
            data-product-id="${product.id}"
            data-product-name="${product.name}"
            data-product-price="${product.pricePaise}"
          >
            Add to plate
          </button>
      </div>`;
});

lovedDishesContainer.innerHTML = lovedDishesHTML;

// Menu Category
const categorizedProducts = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});

let menuHTML = "";

for (const [category, products] of Object.entries(categorizedProducts)) {
  menuHTML += `
    <div class="category-section mb-8">
      <h4 class="text-2xl font-semibold mb-4">${category}</h4>
      <div class="flex flex-wrap justify-evenly gap-8">
        ${products
          .map(
            (product) => `
            <div class="flex flex-col items-center p-4 shadow-lg bg-white rounded-lg w-60">
              <img src="${product.image}" alt="${
              product.name
            }" class="w-52 h-44 rounded-sm object-cover mb-4" />
              <h5 class="text-lg font-medium">${product.name}</h5>
              <p class="text-gray-600"><i class="fa-solid fa-indian-rupee-sign"></i> ${formatCurrency(
                product.pricePaise
              )}</p>
              <button
                class="bg-yellow-700 text-white px-4 py-2 mt-2 rounded-lg hover:bg-red-800 add-to-cart js-add-to-cart"
                data-product-id="${product.id}"
                data-product-name="${product.name}"
                data-product-price="${product.pricePaise}"
              >
                Add to Plate
              </button>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;
}

document.querySelector("#menu-container").innerHTML = menuHTML;

// increase cart quantity feature

function updateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll(".js-add-to-cart")
.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);    
    updateCartQuantity(); 
    console.log('check')
  });
});

