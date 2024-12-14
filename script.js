// if user enetered any non positive number, then it is changed to 1
document.getElementById("amount").addEventListener("blur", function () {
  var value = parseInt(this.value, 10);
  if (value < 1 || value == "") {
    this.value = 1;
  }
});
const dropList = document.querySelectorAll("div select"),// a list all "select" occurances inside a div 
fromCurrency = document.getElementById("amount"),// from currency
toCurrency = document.getElementById("to-curr"),// to currency
convertButton = document.getElementById("convert");
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting USD by default as FROM currency and INR as TO currency
        let selected = i == 0 ? (currency_code == "USD" ? "selected" : "") : (currency_code == "INR" ? "selected" : "");
        // creating option tag with passing currency_code as value
        let option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", option);// options are inserted into select element
    }
}


convertButton.addEventListener("click", () => {exchangeRate()})//when convert button is clicked, result is shown

function exchangeRate(){ // fetches api and does calc part
    const inp_amt = document.getElementById("amount").value,// input value
    opt_txt = document.getElementById("to-amount");// output (to be decided in the function)
    opt_txt.innerText = "Calculating...";// in case fetching api took time
    let api_url = `https://v6.exchangerate-api.com/v6/d6600c1a9305a62340e80440/latest/${fromCurrency.value}`;// url for api
    fetch(api_url).then(Response => Response.json()).then(result => { // APIs gives response in JSON format so I first converted it into a JavaScript object
        let exchange_rate = result.conversion_rates[toCurrency.value], // read the README file for more explanation (in short, name conversion_rates is checked with API-endpoint Doctumentation)
        finalExRate = (inp_amt * exchange_rate).toFixed(2);// limiting the number of decimal places to 2
        opt_txt.innerText = `${finalExRate}`;
    }).catch(() => {opt_txt.innerText = "Unknown error occured :("})//error handling
}