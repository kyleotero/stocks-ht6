const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
require("dotenv").config();
const fs = require("fs");
const writeStream = fs.createWriteStream("stocks.csv");

const port = process.env.PORT || 4000;

const app = express();
const symbol = "amzn";
writeStream.write(`name, price, difference, change\n`);

axios
  .get(
    `https://ca.finance.yahoo.com/quote/${symbol}?p=${symbol}&.tsrc=fin-srch`
  )
  .then((res) => {
    const $ = cheerio.load(res.data);
    $("#quote-header-info").each((index, element) => {
      const name = $(element).find("h1").text();
      const price = $(element)
        .find("fin-streamer[data-field='regularMarketPrice']")
        .text();
      const difference = $(element)
        .find("fin-streamer[data-field='regularMarketChange']")
        .text();
      const change = $(element)
        .find("fin-streamer[data-field='regularMarketChangePercent']")
        .text();
      writeStream.write(
        `Name: ${name}, \nPrice: ${price}, \nDifference: ${difference}, \nChange: ${change}`
      );
    });
  })
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server Established and  running on Port ${port}`);
});
