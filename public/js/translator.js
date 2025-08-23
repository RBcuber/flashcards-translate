export async function translateRuToEn(text) {
  const baseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://flashcards-translate.vercel.app";

  const url = `${baseUrl}/api/translate?text=${encodeURIComponent(
    text
  )}&source=ru&target=en`;

  const res = await fetch(url);
  const data = await res.json();
  return data.data?.translations?.[0]?.translatedText ?? "";
}