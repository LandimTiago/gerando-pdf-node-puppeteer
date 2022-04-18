require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const puppeteer = require("puppeteer");

const app = express();
const env = process.env;

const passengers = [
  {
    id: 1,
    name: "TIAGO LANDIM",
    flightNumber: 7859,
    time: "18:00h",
  },
  {
    id: 2,
    name: "ALLANA LANDIM",
    flightNumber: 7859,
    time: "18:00h",
  },
  {
    id: 3,
    name: "FELIPE LANDIM",
    flightNumber: 7951,
    time: "19:30h",
  },
  {
    id: 4,
    name: "ANA MARIA LANDIM",
    flightNumber: 7951,
    time: "19:30h",
  },
  {
    id: 5,
    name: "EDSON RAFAEL LANDIM",
    flightNumber: 7951,
    time: "19:30h",
  },
];

app.get("/send-email", (req, res) => {
  res.send("Email está sendo enviado, aguarde!");
});

app.get("/get-pdf", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:3333/", {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: "Letter",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();

  res.contentType("application/pdf");
  return res.send(pdf);
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "/template/print.ejs");

  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) res.send("Erro na leitura do arquivo", err);

    return res.send(html);
  });
});

// ROTA DESATIVADA POIS SALVA O ARQUIVO EM PASTA LOCAL
// app.get("/", (req, res) => {
//   const filePath = path.join(__dirname, "/template/print.ejs");
//   ejs.renderFile(filePath, { passengers }, (err, html) => {
//     if (err) res.send("Erro na leitura do arquivo", err);

//     const options = {
//       height: "11.25in",
//       width: "8.5in",
//       header: {
//         height: "20mm",
//       },
//       footer: {
//         height: "20mm",
//       },
//     };

//     pdf.create(html, options).toFile("report.pdf", (err, result) => {
//       if (err) res.send("Erro ao gerar o arquivo", err);

//       return res.send(html);
//     });
//   });
// });

app.listen(env.PORT);
