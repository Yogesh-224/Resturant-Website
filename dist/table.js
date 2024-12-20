// Form Validation
const form= document.querySelector('.form');

form.addEventListener("submit", function(event) {
    const mobileInput = document.getElementById("mobile");
    const mobile = mobileInput.value;
    const nameInput = document.getElementById("username");
    const name = nameInput.value;
    const guestCountInput = document.getElementById("usercount");
    const guestCount = parseInt(guestCountInput.value);

    let isValid = true;

    // Check if mobile is valid (10 digits)
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        mobileInput.focus();
        isValid = false;
    }

    // Validate that name is not empty
    if (name.trim() === "") {
        alert("Please enter your full name.");
        nameInput.focus();
        isValid = false;
    }

    // Check guest count
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 20) {
        alert("Please enter a valid guest count between 1 and 20.");
        guestCountInput.focus();
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});
// toggle function for small screen
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
