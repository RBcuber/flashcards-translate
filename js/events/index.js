const front = document.getElementById("in");
const back = document.getElementById("out");
const container = document.getElementById("container");
const clear = document.getElementById("clear");
const input = document.getElementById("input");
const show = document.getElementById("show");
let flipped = false;

document.getElementById("btn").onclick = async () => {
  const frontValue = input.value;
  let a = encodeURIComponent(frontValue);
  const url = `https://api.mymemory.translated.net/get?q=${a}&langpair=ru%7Cen`;
  const res = await fetch(url);
  const data = await res.json();
  const backValue = data.responseData.translatedText;
  back.textContent = backValue;
  back.style.display = "block";
  front.textContent = frontValue;
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
  flipped = !flipped;
  front.style.display = flipped ? "block" : "none";
  back.style.display = flipped ? "none" : "block";
});

show.addEventListener("click", () => {
  document.getElementById("qwe").textContent = JSON.stringify(
    JSON.parse(localStorage.getItem("cards")),
    null,
    2
  );
});
