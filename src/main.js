const nameRef = document.getElementById("name");
const symbolRef = document.getElementById("symbol");
const priceRef = document.getElementById("price");
const diffRef = document.getElementById("difference");
const changeRef = document.getElementById("change");
const symbol = document.getElementById("inputSymbol");
const search = document.getElementById("search");
const error = document.getElementById("error");

const url = "http://localhost:3000/post";

function typing() {
  if (symbol.value) {
    error.classList.add("invisible");
    search.classList.remove("invisible");
  } else search.classList.add("invisible");
}

function load() {
  symb = symbol.value;
  $.post(
    url +
      "?data=" +
      JSON.stringify({
        input: symbol.value,
      }),
    response
  );
  document.getElementById("bar").classList.remove("mt-80");
  symbol.value = "";
  typing();
}

function response(data) {
  var response = JSON.parse(data);
  const symbols = response["name"].split("(");
  const symbolz = symbols[1].split(")");

  if (symbolz[0].trim() == symb.toUpperCase().trim()) {
    symbolRef.innerHTML = symbolz[0].trim();
    symbolRef.setAttribute("href", response["link"]);

    nameRef.innerHTML = symbols[0].trim();

    priceRef.innerHTML = "$" + response["price"];

    if (response["difference"].charAt(0) == "+") {
      diffRef.classList.remove("text-red");
      changeRef.classList.remove("text-red");
      diffRef.classList.add("text-green");
      changeRef.classList.add("text-green");
    } else {
      diffRef.classList.remove("text-green");
      changeRef.classList.remove("text-green");
      diffRef.classList.add("text-red");
      changeRef.classList.add("text-red");
    }

    diffRef.innerHTML = response["difference"];
    changeRef.innerHTML = response["change"];
  } else {
    error.classList.remove("invisible");
  }
}
