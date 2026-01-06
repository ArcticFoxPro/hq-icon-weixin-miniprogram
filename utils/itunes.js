const BASE_URL = 'https://itunes.apple.com/search';

export const searchApp = (term, country, entity, limit) => {
  console.log('Search Params:', { term, country, entity, limit });
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL,
      data: {
        term: term,
        country: country,
        entity: entity,
        limit: limit
      },
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
