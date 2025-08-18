const front = document.getElementById("in");
const back = document.getElementById("out");
const container = document.getElementById("container");
const clear = document.getElementById("clear");
const input = document.getElementById("input");
const show = document.getElementById("show");
const qwe = document.getElementById("qwe");

let flipped = false;

document.getElementById("btn").onclick = async () => {
  if (input.value.trim() === "") {
    return;
  }
  let cards = JSON.parse(localStorage.getItem("cards")) || [];

  for (let i = 0; i < cards.length; i++) {
    if (input.value == cards[i].f) {
      alert("Такое Слово уже добавлено");
      return;
    }
  }
  
  const frontValue = input.value;
  input.value = "";
  let a = encodeURIComponent(frontValue);
  const url = `https://api.mymemory.translated.net/get?q=${a}&langpair=ru%7Cen`;
  const res = await fetch(url);
  const data = await res.json();
  const backValue = data.responseData.translatedText;

  back.textContent = backValue;
  front.textContent = frontValue;

  container.classList.add("visible");
  container.classList.remove("is-flipped");

  addCard(frontValue, backValue);
};

function addCard(f, b) {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.push({ f, b });
  localStorage.setItem("cards", JSON.stringify(cards));
}

clear.onclick = () => {
  localStorage.clear();
};

container.addEventListener("click", () => {
  container.classList.toggle("is-flipped");

});

document.addEventListener("click", (e) => {
  const wrapper = e.target.closest(".wrapper");
  if (!wrapper) return;
  wrapper.classList.toggle("is-flipped");
});

show.addEventListener("click", () => {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  qwe.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    qwe.innerHTML += `
    <div id="wrapper" class="wrapper">
      <div id="in1" class="in in1">${cards[i].f}</div>
      <div id="out1" class="out">${cards[i].b}</div>
    </div>`;
  }
});
