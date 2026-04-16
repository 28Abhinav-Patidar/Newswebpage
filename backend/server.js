import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/news", async (req, res) => {
  try {
    const { category = "general", page = 1, pageSize = 10 } = req.query;

    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});