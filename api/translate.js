export default async function handler(req, res) {
  const { text, source = "ru", target = "en" } = req.query;

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source, target, format: "text" }),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
