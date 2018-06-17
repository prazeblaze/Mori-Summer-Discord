// prazeblazeeeeeee was here
// you have no power >:)

//lib
const axios = require('axios'),
         qs = require('querystring'),
          $ = require('cheerio');

cleanString = (string) => {
  return string.replace(/(\r\n\t|\n|\r\t)/gm, "").trim();
}

const MAL = {
  // get popular titles
  getPopular: (domain, listCount, callback) => {
    // check if listCount is a number
    if(!isNaN(parseInt(listCount))){
      // create request
      axios
        .get(`${domain}/topanime.php`)
        .then((res) => {
          let list = [];

          $(res.data).find('.top-ranking-table a.hoverinfo_trigger.fl-l.fs14.fw-b').slice(0, listCount).each((index, element) => {
            let el = $(element);
            list.push({
              id: el.attr('id').substr(5),
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

  search: (domain, options, callback) => {
    // check if listCount is a number
    if(!isNaN(parseInt(options.listCount))){
      // create request
      axios
        .get(`${domain}/anime.php?q=${encodeURIComponent(options.searchQuery)}&type=0&score=0&status=0&p=0&r=0&sm=0&sd=0&sy=0&em=0&ed=0&ey=0&c%5B%5D=a&c%5B%5D=b&c%5B%5D=c&c%5B%5D=f&gx=0`)
        .then((res) => {
          let list = [];

          $(res.data).find('table .hoverinfo_trigger.fw-b.fl-l').slice(0, options.listCount).each((index, element) => {
            let el = $(element);
            list.push({
              id: el.attr('id').substr(5),
              title: el.text(),
              href: el.attr('href'),
              type: cleanString(el.closest('tr').find('td:nth-of-type(3)').text()),
              eps: cleanString(el.closest('tr').find('td:nth-of-type(4)').text()),
              score: cleanString(el.closest('tr').find('td:nth-of-type(5)').text())
            });
          });

          callback(null, list);
        })
        .catch((err) => {
          callback('GENERIC_ERROR', err);
        });
    } else {
      callback('BASIC_ERROR', `Excuse me, but aren't you supposed to input a valid integer as the list length limit? 🤔`);
    }
  },

  getAnimeDetails: (domain, animeId, callback) => {
    // check if anime id is a number
    if(!isNaN(parseInt(animeId))){
      // make request
      axios
        .get(`${domain}/anime/${animeId}`)
        .then((res) => {
          const page = $(res.data);

          const altTitleArray = page.find('#content > table > tbody > tr > td:first-of-type').find('.spaceit_pad');
          let altTitle = '';

          altTitleArray.each((index, element) => {
            altTitle += $(element).text().trim()
            if(index < altTitleArray.length - 1){
              altTitle += '\n';
            }
          });

          extractAnimeInformation = (page, string) => {
            const regexp = new RegExp(string);
            const text = page.find(`span:contains(${string})`).parent().text();
            const cleanedText = text.replace(regexp, '').replace(/  +/g, ' ').trim();

            return cleanedText;
          }

          const animeInfo = {
            id:         page.find('#myinfo_anime_id').val(),
            title:      page.find('[itemprop]').first().text(),
            altTitle:   altTitle,
            url:        page.find('[itemprop]').eq(16).attr('href'),
            type:       extractAnimeInformation(page, 'Type:'),
            episodes:   extractAnimeInformation(page, 'Episodes:'),
            status:     extractAnimeInformation(page, 'Status:'),
            aired:      extractAnimeInformation(page, 'Aired:'),
            premiered:  extractAnimeInformation(page, 'Premiered:'),
            broadcast:  extractAnimeInformation(page, 'Broadcast:'),
            producers:  extractAnimeInformation(page, 'Producers:'),
            licensors:  extractAnimeInformation(page, 'Licensors:'),
            studios:    extractAnimeInformation(page, 'Studios:'),
            source:     extractAnimeInformation(page, 'Source:'),
            genres:     extractAnimeInformation(page, 'Genres:'),
            duration:   extractAnimeInformation(page, 'Duration:'),
            rating:     extractAnimeInformation(page, 'Rating:'),
            score:      page.find('[itemprop]').eq(3).text(),
            scoreCount: page.find('[itemprop]').eq(4).text(),
            summary:    page.find('[itemprop]').eq(19).text(),
            cover:      page.find('[itemprop="image"]').attr('src')
          };

          callback(null, animeInfo);
        })
        .catch((err) => {
          if(err.response.status == 404){
            callback('BASIC_ERROR', `Oops, I can't find any anime with the ID you're looking for. Maybe try another one? 😟`)
          }
          callback('GENERIC_ERROR', err);
        });
    } else {
      callback('BASIC_ERROR', `Excuse me, but aren't you supposed to input a valid integer as the manga ID? 🤔`);
    }
  }
}

module.exports = MAL;