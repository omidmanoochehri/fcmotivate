var CronJob = require("cron").CronJob;
var Crypto = require("../models/Crypto");
// const fetch = require("node-fetch");

var job = new CronJob(
  "*/20 * * * * *",
  async function () {
    const phantom = require("phantom");

    (async function () {
      const instance = await phantom.create();
      const page = await instance.createPage();
      await page.on("onResourceRequested", function (requestData) {
        // console.info('Requesting', requestData.url);
      });

      var status = await page.open("https://www.investing.com/equities/");
      var content = await page.property("content");

      const cheerio = require("cheerio");
      var $ = cheerio.load(content);
      // console.log(content);

      status = await page.open("https://www.investing.com/crypto/");
      content = await page.property("content");

      $ = cheerio.load(content);

      var keys = [];
      $(".js-top-crypto-table thead tr th").each((i, key) => {
        keys.push($(key).text().trim());
      });

      var crypto = [];
      $(".js-top-crypto-table tbody tr").each((i, tr) => {
        var tdObject = {};
        $(tr)
          .find("td")
          .each((j, td) => {
            // console.log(keys[j],j)
            if (keys[j] !== " " && keys[j] && j) {
              tdObject[keys[j].split(".")[0]] = $(td).text();
            }
          });
        crypto.push(tdObject);
      });
      // console.log(crypto);

      await instance.exit();

      if (crypto) {
        let ethereum_price = parseFloat(
          crypto
            .filter((c) => c.Symbol === "ETH")[0]
            ["Price (USD)"].split(",")
            .join("")
        );
        console.log(ethereum_price);

        var query = { symbol: "ETH" },
          update = { name: "Ethereum", symbol: "ETH", price: ethereum_price },
          options = { upsert: true, new: true, setDefaultsOnInsert: true };

        // Find the document
        Crypto.findOneAndUpdate(
          query,
          update,
          options,
          function (error, result) {
            if (error) {
              console.log(error);
            } else {
              console.log("save eth price", result);
            }
          }
        );
      }
    })();
  },
  null,
  true,
  "Asia/Tehran"
);
job.start();
