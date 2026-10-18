 
const shoes = [
    { brand: "Nike Air Max", condition: "New", price: 5000, stock: 5 },
    { brand: "Gucci Sneakers", condition: "Used", price: 3500, stock: 2 },
    { brand: "Adidas Ultraboost", condition: "New", price: 6200, stock: 4 },
    { brand: "Puma Runner", condition: "New", price: 4200, stock: 3 },
    { brand: "Reebok Classic", condition: "Used", price: 2800, stock: 1 },
    { brand: "Jordan Retro", condition: "New", price: 7500, stock: 2 },
    { brand: "Converse All Star", condition: "New", price: 2900, stock: 6 },
    { brand: "New Balance 574", condition: "Used", price: 3200, stock: 3 }
];

const cart = [];

function loadShoes() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    shoes.forEach((shoe, index) => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="shoe-icon">👟</div>
            <h3>${shoe.brand}</h3>
            <span class="condition">${shoe.condition}</span>
            <p class="price">₹${shoe.price.toLocaleString("en-IN")}</p>
            <p class="stock">Available stock: ${shoe.stock}</p>
            <button type="button" ${shoe.stock === 0 ? "disabled" : ""}
                onclick="buy(${index})">
                ${shoe.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
        `;

        productList.appendChild(card);
    });
}

function buy(index) {
    const shoe = shoes[index];

    if (shoe.stock <= 0) {
        alert("Sorry, this shoe is out of stock.");
        return;
    }

    shoe.stock--;

    const existing = cart.find(item => item.index === index);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            index: index,
            brand: shoe.brand,
            price: shoe.price,
            quantity: 1
        });
    }

    loadShoes();
    alert(shoe.brand + " added to your cart!");
}

document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Please add at least one shoe to your cart first.");
        return;
    }

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const bill = document.getElementById("bill");

    const orderItems = cart.map(item =>
        `<li>${item.brand} × ${item.quantity} — ₹${(
            item.price * item.quantity
        ).toLocaleString("en-IN")}</li>`
    ).join("");

    bill.innerHTML = `
        <div class="bill-card">
            <h2>Order Summary</h2>
            <p><strong>Customer:</strong> ${escapeHTML(name)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Delivery Address:</strong> ${escapeHTML(address)}</p>
            <h3>Items Ordered</h3>
            <ul>${orderItems}</ul>
            <h3>Total: ₹${total.toLocaleString("en-IN")}</h3>
            <p>Thank you for shopping with Om SmartSole!</p>
            <p><small>Demo order only — no payment has been processed.</small></p>
        </div>
    `;

    cart.length = 0;
    this.reset();
    loadShoes();

    bill.scrollIntoView({ behavior: "smooth", block: "start" });
});

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

loadShoes();
