import { cart, removeFromCart } from "./cart.js";
import { products } from "./products.js";

// Generate the cart summary HTML dynamically
let cartSummaryHTML = "";
let totalAmount = 0; // Initialize total amount variable

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  // Find the matching product details
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const productTotal = (matchingProduct.pricePaise / 100) * cartItem.quantity;
  totalAmount += productTotal; // Add the product's total cost to the total amount

  // Generate cart item HTML
  cartSummaryHTML += ` 
    <div class="flex items-center justify-between border-b pb-4 
    js-cart-item-container-${matchingProduct.id}">
      <div class="flex items-center space-x-4">
        <img src="${
          matchingProduct.image
        }" alt="Dish Image" class="h-16 w-16 rounded object-cover" />
        <div>
          <h3 class="text-lg font-semibold">${matchingProduct.name}</h3>
          <p class="text-sm text-gray-500">Quantity: ${cartItem.quantity}</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <p class="text-lg font-bold">&#8377;${productTotal.toFixed(2)}</p>
        <button class="text-red-600 js-delete-link" data-product-id="${
          matchingProduct.id
        }">
          <i class="fa-solid fa-circle-minus"></i>
        </button>
      </div>
    </div>`;
});

// Update the cart summary section in the HTML
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// Update the delivery summary dynamically
const taxes = 50; // Set a fixed delivery charge (if any)
const totalWithDelivery = totalAmount + taxes;

document.querySelector(".js-delivery-summary").innerHTML = `
  <div class="flex justify-between mb-2">
    <p class="text-sm text-gray-500">Total Amount:</p>
    <p class="text-lg font-bold">&#8377;${totalAmount.toFixed(2)}</p>
  </div>
  <div class="flex justify-between mb-2">
    <p class="text-sm text-gray-500">Taxes (GST+Resturant Charges):</p>
    <p class="text-lg font-bold">&#8377;${taxes.toFixed(2)}</p>
  </div>
  <div class="flex justify-between border-t pt-2">
    <p class="text-sm text-gray-800 font-semibold">Grand Total:</p>
    <p class="text-lg font-bold text-green-600">&#8377;${totalWithDelivery.toFixed(2)}</p>
  </div>
`;

// Add event listeners for removing items from the cart
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    // Remove the item from the DOM
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();

    // Recalculate the total amount and update the delivery summary
    const updatedCart = cart.filter((item) => item.productId !== productId);
    let newTotalAmount = 0;

    updatedCart.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      newTotalAmount += (product.pricePaise / 100) * item.quantity;
    });

    const updatedTotalWithDelivery = newTotalAmount + deliveryCharge;

    document.querySelector(".js-delivery-summary").innerHTML = `
      <div class="flex justify-between mb-2">
        <p class="text-sm text-gray-500">Total Amount:</p>
        <p class="text-lg font-bold">&#8377;${newTotalAmount.toFixed(2)}</p>
      </div>
      <div class="flex justify-between mb-2">
        <p class="text-sm text-gray-500">Delivery Charge:</p>
        <p class="text-lg font-bold">&#8377;${deliveryCharge.toFixed(2)}</p>
      </div>
      <div class="flex justify-between border-t pt-2">
        <p class="text-sm text-gray-800 font-semibold">Grand Total:</p>
        <p class="text-lg font-bold text-green-600">&#8377;${updatedTotalWithDelivery.toFixed(2)}</p>
      </div>
    `;
  });
});

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