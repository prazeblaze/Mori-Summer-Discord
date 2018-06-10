// prazeblazeeeeeee was here
// you have no power >:)

//lib
const axios = require('axios');
const $ = require('cheerio');

//domain
const domain = "http://fanfox.net";

let mangaFox = {

  // get new titles
  getNew: (listCount = 10, callback) => {
    axios
      .get(domain)
      .then((res) => {
        let list = [];
        $(res.data).find('#new li div.nowrap a').slice(0, listCount).each((index, element) => {
          let el = $(element);
          list[index] = {
            id: el.attr('rel'),
            title: el.text(),
            href: el.attr('href')
          }
        });
        callback(list);
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      });
  },

  // get popular titles
  getPopular: (listCount = 10, callback) => {
    axios
      .get(domain)
      .then((res) => {
        let list = [];
        $(res.data).find('#popular li div.nowrap a').slice(0, listCount).each((index, element) => {
          let el = $(element);
          list[index] = {
            id: el.attr('rel'),
            title: el.text(),
            href: el.attr('href')
          }
        });
        callback(list);
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      });
  }
};

module.exports = mangaFox;