const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

class Scraper {
  constructor(name, url, number, container, selector) {
    this.name = name;
    this.url = url;
    this.number = number;

    this.container = container;
    this.selector = selector;
    this.price = Infinity;

    this.scrape(true);
  }

  async scrape() {
    const { data } = await axios.get(this.url);

    const $ = cheerio.load(data);

    const container = $(this.container);

    const price = container.find(this.selector);

    console.log(price.text());

    const newPrice = parseFloat(
      price.text().substring(1)
    );

    if (newPrice < this.price) {
        await transporter.sendMail({
          from: `${this.name} Bot" <${process.env.EMAIL}>`,
          to: this.number,
          text: `${this.name} was $${this.price}, now $${newPrice}!\n${this.url}`,
        });
      this.price = newPrice;
    }
  }
}

module.exports = Scraper;
