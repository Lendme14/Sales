
let products = JSON.parse(localStorage.getItem("products")) || [];
let totalSales = 0;
let totalProfit = 0;

function updateProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = product.name;
    productList.appendChild(option);
  });
}

function updateInventoryTable() {
  const tbody = document.querySelector("#inventory-table tbody");
  tbody.innerHTML = "";
  products.forEach(p => {
    tbody.innerHTML += \`<tr><td>\${p.name}</td><td>\${p.quantity}</td><td>₦\${p.cost}</td><td>₦\${p.sell}</td></tr>\`;
  });
}

function addProduct() {
  const name = document.getElementById("product-name").value;
  const cost = parseFloat(document.getElementById("cost-price").value);
  const sell = parseFloat(document.getElementById("selling-price").value);
  const quantity = parseInt(document.getElementById("quantity").value);
  if (!name || isNaN(cost) || isNaN(sell) || isNaN(quantity)) return alert("Fill all fields correctly.");

  products.push({ name, cost, sell, quantity });
  localStorage.setItem("products", JSON.stringify(products));
  updateProductList();
  updateInventoryTable();
}

function recordSale() {
  const index = document.getElementById("product-list").value;
  const qtySold = parseInt(document.getElementById("sold-quantity").value);
  const product = products[index];
  if (qtySold > product.quantity) return alert("Not enough stock.");
  const sale = product.sell * qtySold;
  const profit = (product.sell - product.cost) * qtySold;
  totalSales += sale;
  totalProfit += profit;
  product.quantity -= qtySold;
  localStorage.setItem("products", JSON.stringify(products));
  document.getElementById("total-sales").textContent = "Total Sales: ₦" + totalSales;
  document.getElementById("total-profit").textContent = "Total Profit: ₦" + totalProfit;
  updateInventoryTable();
}

document.getElementById("theme-toggle").onclick = () => {
  const body = document.body;
  body.className = body.className === "dark" ? "light" : "dark";
};

updateProductList();
updateInventoryTable();
