const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const json = require("express");
require("dotenv").config();
const fs = require("fs");
var symbol;
var name;
var price;
var difference;
var change;
var jsontext;

const app = express();

app
  .post("/post", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query["data"]));
    const z = JSON.parse(req.query["data"]);

    symbol = z["input"];

    const link = `https://ca.finance.yahoo.com/quote/${symbol}?p=${symbol}&.tsrc=fin-srch`;

    axios
      .get(link)
      .then((res) => {
        const $ = cheerio.load(res.data);
        $("#quote-header-info").each((index, element) => {
          name = $(element).find("h1").text();
          price = $(element)
            .find("fin-streamer[data-field='regularMarketPrice']")
            .text();
          difference = $(element)
            .find("fin-streamer[data-field='regularMarketChange']")
            .text();
          change = $(element)
            .find("fin-streamer[data-field='regularMarketChangePercent']")
            .text();
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        jsontext = JSON.stringify({
          symbol: symbol,
          name: name,
          price: price,
          difference: difference,
          change: change,
          link: link,
        });
        console.log(jsontext);
        res.send(jsontext);
      });
  })
  .listen(3000, () => {
    console.log(`Server Established and  running on Port 3000`);
  });
