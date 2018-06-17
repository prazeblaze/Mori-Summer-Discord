// prazeblazeeeeeee was here
// you have no power >:)

//lib
const axios = require('axios'),
         qs = require('querystring'),
          $ = require('cheerio');

let mangaFox = {

  // get new titles
  getNew: (domain, listCount, callback) => {
    // check if listCount is a number
    if(!isNaN(parseInt(listCount))){
      // create request
      axios
        .get(`${domain}/directory/new/`)
        .then((res) => {
          let list = [];
           
          $(res.data).find('.manga_text .title').slice(0, listCount).each((index, element) => {
            let el = $(element);
            list.push({
              id: el.attr('rel'),
              title: el.text(),
              href: el.attr('href')
            });
          });

          callback(null, list);
        })
        .catch((error) => {
          callback('GENERIC_ERROR', error);
        });
    } else {
      callback('BASIC_ERROR', `Excuse me, but aren't you supposed to input a valid integer as the list length limit? 🤔`);
    }
  },

  // get popular titles
  getPopular: (domain, listCount, callback) => {
    // check if listCount is a number
    if(!isNaN(parseInt(listCount))){
      // create request
      axios
        .get(`${domain}/directory/`)
        .then((res) => {
          let list = [];

          $(res.data).find('.manga_text .title').slice(0, listCount).each((index, element) => {
            let el = $(element);
            list.push({
              id: el.attr('rel'),
              title: el.text(),
              href: el.attr('href')
            });
          });

          callback(null, list);
        })
        .catch((error) => {
          callback('GENERIC_ERROR', error);
        });
    } else {
      callback('BASIC_ERROR', `Excuse me, but aren't you supposed to input a valid integer as the list length limit? 🤔`);
    }
  },

  // get recent titles
  getRecent: (domain, listCount, callback) => {
    // check if listCount is a number
    if(!isNaN(parseInt(listCount))){
      // create request
      axios
        .get(`${domain}/releases`)
        .then((res) => {
          let list = [];
            
          $(res.data).find('#updates .series_preview').slice(0, listCount).each((index, element) => {
            let el = $(element);
            list.push({
              id: el.attr('rel'),
              title: el.text(),
              href: el.attr('href')
            });
          });
          callback(null, list);
        })
        .catch((error) => {
          callback('GENERIC_ERROR', error);
        });
    } else {
      callback('BASIC_ERROR', `Excuse me, but aren't you supposed to input a valid integer as the list length limit? 🤔`);
    }
  },

  getMangaDetails: (domain, mangaId, callback) => {
    // check if mangaId is a number
    if(!isNaN(parseInt(mangaId))){
      axios
        .post(`${domain}/ajax/series.php`, qs.stringify({sid: mangaId}))
        .then((res) => {
          if(res.data){
            const mangaInfo = {
              title: res.data[0],
              altTitle: res.data[1],
              url: `${domain}/manga/${res.data[0].toLowerCase().replace(/\W+/g, '_')}`,
              genre: res.data[2],
              author: res.data[3],
              artist: res.data[4],
              rank: res.data[5],
              rating: res.data[7],
              releaseDate: res.data[8],
              summary: res.data[9].replace(/&quot;/g,' ').replace(/<br \/>/g,'').replace(/\n/g, ''),
              cover: res.data[10]
            };
            callback(null, mangaInfo);
          } else {
            callback('BASIC_ERROR', `Oops, I can't find any manga with the ID you're looking for. Maybe try another one? 😟`);
          }
        })
        .catch((err) => {
          callback('GENERIC_ERROR', err);
        });
    } else {
      callback('BASIC_ERROR', `Excuse me, but aren't you supposed to input a valid integer as the manga ID? 🤔`);
    }
  }
};

module.exports = mangaFox;