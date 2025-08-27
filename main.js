const pin = 1234;
const account_no = "01797421860";
const transactionData = [];

// reuseable function to get input values in number
function getInputValues(id) {
  const inputValueInNumber = Number(document.getElementById(id).value);
  return inputValueInNumber;
}

// reuseable function to get inner Text
function getInnerText(id) {
  const innerTextValue = Number(document.getElementById(id).innerText);
  return innerTextValue;
}

// set innerText
function setInnerText(value) {
  const getInnerMoney = document.getElementById("money");
  getInnerMoney.innerText = value;
}

// toggle function
function toggle(value) {
  const forms = document.getElementsByClassName("form");
  for (let form of forms) {
    form.style.display = "none";
  }
  document.getElementById(value).style.display = "block";
}

// function to toggle style
function handleButtonToggle(id) {
  const formBtns = document.getElementsByClassName("form-btn");

  for (const btn of formBtns) {
    btn.classList.remove("border-blue-500", "bg-blue-100");
    btn.classList.add("border-gray-300");
  }

  document.getElementById(id).classList.remove("border-gray-300");
  document.getElementById(id).classList.add("border-blue-500", "bg-blue-100");
}

// add money
document
  .getElementById("add-money-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const bank_name = document.getElementById("bank").value;
    const account_number = document.getElementById("ac-number").value;
    const add_amount = getInputValues("amount");
    if(add_amount<=0){
      alert('invalid amount')
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

    const data = {
      name: "add money",
      date: new Date().toLocaleTimeString(),
    };
    transactionData.push(data);
    console.log(transactionData);
  });


// cash out
document
  .getElementById("cash-out-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const withdraw_amount = Number(
      document.getElementById("withdraw_money").value
    );
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

    // ✅ push transaction only when cash out is successful
    const data = {
      name: "cash out",
      date: new Date().toLocaleTimeString(),
    };
    transactionData.push(data);
    console.log(transactionData);
  });

// show transactions
document
  .getElementById("transactions-btn")
  .addEventListener("click", function () {
    const transactionContainerData = document.getElementById(
      "transaction-container"
    );

    // clear old data before appending again
    transactionContainerData.innerHTML = "";

    // loop through transactionData array
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

        <!-- ✅ kept inside the flex container -->
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </section>
      `;
      transactionContainerData.appendChild(div);
    }
  });

// toggle
// add money
document
  .getElementById("add_money_btn")
  .addEventListener("click", function (e) {
    // pass string id instead of variable
    toggle("addMoneySection");
    handleButtonToggle("add_money_btn");
  });

// cash out
document.getElementById("cashOutBtn").addEventListener("click", function (e) {
  // use toggle for consistency
  toggle("cashOutSection");
  handleButtonToggle("cashOutBtn");
});

// transfer money
document
  .getElementById("transfer-money-btn")
  .addEventListener("click", function (e) {
    toggle("transfer-money-parent");
    handleButtonToggle("transfer-money-btn");
  });

// get bonus
document
  .getElementById("get-bonus-btn")
  .addEventListener("click", function (e) {
    toggle("get-bonus-parent");
    handleButtonToggle("get-bonus-btn");
  });

// Pay Bill
document.getElementById("pay-bill-btn").addEventListener("click", function () {
  toggle("pay-bill-parent"); // show form
  handleButtonToggle("pay-bill-btn"); // highlight button
});

// Transactions
document
  .getElementById("transactions-btn")
  .addEventListener("click", function () {
    toggle("transactions-parent"); // show form
    handleButtonToggle("transactions-btn"); // highlight button
  });
