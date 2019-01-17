import YOUTUBE_API_KEY from '../config/youtube.js';


var searchYouTube = (options, callback) => {
  console.log(options);
  // let searchTerms = options.query.split('|').join('%7C');

  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {key: YOUTUBE_API_KEY,
          videoEmbeddable: 'true',
          maxResults: options.max,
          part: 'snippet',
          q: options.query,
          type: 'video'},
    success: ((data) => {
      console.log('WE GOT HERE !!!');
      callback(data);
    }),
    error: (() => console.log('YOU MESSED UP!')),
  });
  // .done( () => { console.log('WE GOT HERE !!!')})
  // .fail( () => { console.log('YOU MESSED UP!')});
};

export default searchYouTube;


//$.ajax


// done: callback,
// error: () => console.log('GET request failed.')
