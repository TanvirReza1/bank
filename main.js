const pin = 1234;
const account_no = "01797421860";
const transactionData = [];

// reusable functions
function getInputValues(id) {
  return Number(document.getElementById(id).value);
}
function getInnerText(id) {
  return Number(document.getElementById(id).innerText);
}
function setInnerText(value) {
  document.getElementById("money").innerText = value;
}
function toggle(value) {
  const forms = document.getElementsByClassName("form");
  for (let form of forms) {
    form.style.display = "none";
  }
  document.getElementById(value).style.display = "block";
}
function handleButtonToggle(id) {
  const formBtns = document.getElementsByClassName("form-btn");
  for (const btn of formBtns) {
    btn.classList.remove("border-blue-500", "bg-blue-100");
    btn.classList.add("border-gray-300");
  }
  document.getElementById(id).classList.remove("border-gray-300");
  document.getElementById(id).classList.add("border-blue-500", "bg-blue-100");
}

// ✅ Event Delegation for Main Menu Buttons
document.querySelector(".grid").addEventListener("click", function (e) {
  const target = e.target.closest(".form-btn"); // only respond to form buttons
  if (!target) return;

  const id = target.id;

  if (id === "add_money_btn") {
    toggle("addMoneySection");
    handleButtonToggle(id);
  } else if (id === "cashOutBtn") {
    toggle("cashOutSection");
    handleButtonToggle(id);
  } else if (id === "transfer-money-btn") {
    toggle("transfer-money-parent");
    handleButtonToggle(id);
  } else if (id === "get-bonus-btn") {
    toggle("get-bonus-parent");
    handleButtonToggle(id);
  } else if (id === "pay-bill-btn") {
    toggle("pay-bill-parent");
    handleButtonToggle(id);
  } else if (id === "transactions-btn") {
    toggle("transactions-parent");
    handleButtonToggle(id);

    // render transactions
    const container = document.getElementById("transaction-container");
    container.innerHTML = "";
    for (const data of transactionData) {
      const div = document.createElement("div");
      div.innerHTML = `
        <section class="bg-white rounded-xl p-3 flex justify-between items-center mt-3">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-[#f4f5f7]">
              <img src="./assets/wallet1.png" alt="" class="mx-auto">
            </div>
            <div class="ml-3">
              <h2>${data.name}</h2>
              <p>${data.date}</p>
            </div>
          </div>
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </section>
      `;
      container.appendChild(div);
    }
  }
});

// ✅ Add Money (only one listener)
document.getElementById("add-money-btn").addEventListener("click", function (event) {
  event.preventDefault();
  const bank_name = document.getElementById("bank").value;
  const account_number = document.getElementById("ac-number").value;
  const add_amount = getInputValues("amount");

  if (add_amount <= 0) {
    alert("invalid amount");
    return;
  }
  const get_pin = getInputValues("pin");
  if (pin !== get_pin) {
    alert("wrong pin");
    return;
  }
  if (account_no !== account_number || account_number.length !== 11) {
    alert("wrong account number");
    return;
  }

  const saved_money = getInnerText("money");
  const add_money = add_amount + saved_money;
  setInnerText(add_money);

  transactionData.push({
    name: "add money",
    date: new Date().toLocaleTimeString(),
  });
});

// ✅ Cash Out
document.getElementById("cash-out-btn").addEventListener("click", function (event) {
  event.preventDefault();
  const withdraw_amount = getInputValues("withdraw_money");
  const saved_money = getInnerText("money");

  if (!withdraw_amount || withdraw_amount <= 0) {
    alert("Enter a valid amount");
    return;
  }
  if (withdraw_amount > saved_money) {
    alert("Not enough balance");
    return;
  }

  const withdraw_taka = saved_money - withdraw_amount;
  setInnerText(withdraw_taka);

  transactionData.push({
    name: "cash out",
    date: new Date().toLocaleTimeString(),
  });
});
