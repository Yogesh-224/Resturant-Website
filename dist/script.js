import { products } from "./products.js";
import { formatCurrency } from "./money.js";

// Toogle menu for navbar
const navDialog = document.getElementById("nav-dialog");
const toggleButton = document.getElementById("toggleButton");
const closeButton = document.getElementById("closeButton");

function togglemenu() {
  navDialog.classList.toggle("hidden");
  toggleButton.classList.toggle("hidden");
  closeButton.classList.toggle("hidden");
}
toggleButton.addEventListener("click", togglemenu);
closeButton.addEventListener("click", togglemenu);


// Loved-Dishes Section
const lovedDishesContainer = document.querySelector("#most-loved-container");

const mostLovedProducts = [
  products.find((product) => product.id === "North-butterchicken"), // Butter-Chicken
  products.find((product) => product.id === "Italian-lasagna"), // Margherita Pizza
  products.find((product) => product.id === "Mexican-tacos"), // Tacos al pastor
  products.find((product) => product.id === "South-dosa"), // Tomato Uttapam
];

let lovedDishesHTML = "";
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
            class="add-to-cart h-10 w-28 bg-blue-500 text-white font-semibold rounded-lg mt-2"
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
                class="bg-yellow-700 text-white px-4 py-2 mt-2 rounded-lg hover:bg-red-800 add-to-cart"
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

// Popup to confirm quantity
const modalContainer = document.querySelector(".modal-container");

// Function to show the modal with dynamic product details
function showModal(productName, productPrice) {
  const modalHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div class="bg-gray-400 text-black p-6 rounded-lg w-2/3 h-auto">
        <div class="flex items-center">
          <p class="text-4xl font-extrabold">Please select the quantity</p>
          <button class="ml-auto" id="cancel-btn">
            <i class="fa-regular fa-rectangle-xmark text-4xl"></i>
          </button>
        </div>

        <p class="p-2 text-xl font-semibold font-sans border-b-2 mt-2">${productName}</p>

        <p class="p-2 text-xl font-semibold">Price: <i class="fa-solid fa-indian-rupee-sign"></i> ${formatCurrency(
          productPrice
        )}</p>

        <form action="" class="p-4 text-xl">
          <p class="p-2 font-semibold text-2xl">Choose your option</p>

          <input type="radio" id="half-plate" name="plate-size" value="half-plate" />
          <label for="half-plate" class="p-4">Half-plate (Serves 1) &nbsp; &nbsp; ${formatCurrency(
            productPrice
          )}</label>
          <br />

          <input type="radio" id="full-plate" name="plate-size" value="full-plate" />
          <label for="full-plate" class="p-4">Full-plate (Serves 2-3) &nbsp; ${formatCurrency(
            productPrice * 2
          )}</label><br />

          <input type="submit" value="Submit" id="confirm-btn" class="h-16 w-52 bg-green-800 text-white rounded-xl mt-6" />
        </form>
      </div>
    </div>
  `;

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  overlay.innerHTML = modalHTML;

  document.body.appendChild(overlay);

  const cancelBtn = overlay.querySelector("#cancel-btn");
  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
}

// Function to attach event listeners to "Add to Plate" buttons
function initializeAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get product details from the button's data attributes
      const productName = button.getAttribute("data-product-name");
      const productPrice = button.getAttribute("data-product-price");

      // Show the modal with the product details
      showModal(productName, productPrice);
    });
  });
}

// Initialize the "Add to Plate" buttons
initializeAddToCartButtons();
