// If user entered any non-positive number, then it is changed to 1
document.getElementById("amount").addEventListener("blur", function () {
  var value = parseInt(this.value, 10);
  if (value < 1 || value == "") {
    this.value = 1;
  }
});

const dropList = document.querySelectorAll("div select"); // All select elements inside a div
const fromCurrency = document.getElementById("from-curr"); // Corrected to from currency select
const toCurrency = document.getElementById("to-curr"); // To currency select
const convertButton = document.getElementById("convert"); // Convert button

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    // Ensure country_list is defined
    // Selecting USD by default as FROM currency and INR as TO currency
    let selected = "";
    if (i == 0) {
      if (currency_code == "USD") selected = "selected";
    }
    else {
      if (currency_code == "INR") selected = "selected";
    }
    // Creating option tag with passing currency_code as value
    let option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // Inserting options tag inside select tag
    dropList[i].insertAdjacentHTML("beforeend", option); // Options are inserted into select element
  }
}

convertButton.addEventListener("click", (e) => {
    exchangeRate();
});// when the event "click" happens to convertButton, function is executed

function exchangeRate() { // Fetches API and does calculation part
  const inp_amt = document.getElementById("amount").value; // Input value
  const opt_txt = document.getElementById("to-amount"); // Output element (to be decided in the function)
  opt_txt.innerText = "Calculating..."; // In case fetching API takes time
  let api_url = `https://v6.exchangerate-api.com/v6/799bbbe0e78f330e935cc924/latest/${fromCurrency.value}`; // URL for API

  fetch(api_url)
    .then((response) => response.json())
    .then((result) => {
      let exchange_rate = result.conversion_rates[toCurrency.value]; // Getting user selected TO currency rate
      let finalExRate = (inp_amt * exchange_rate).toFixed(2); // Limiting the number of decimal places to 2
      opt_txt.innerText = `${finalExRate}`;
    })
    .catch((error) => {
      opt_txt.innerText = "An unknown error occured :(";
    });
}

const exchange_curr = document.getElementById("exchange-curr");
exchange_curr.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
})// this inter-changes both currencies