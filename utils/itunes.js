export const searchApp = (term, country, entity, limit) => {
  console.log('Search Params:', {
    term,
    country,
    entity,
    limit
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://itunes.apple.com/search',
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

export const getTopApps = (country, limit) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://rss.marketingtools.apple.com/api/v2/${country}/apps/top-free/${limit}/apps.json`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data.feed && res.data.feed.results) {
          const apps = res.data.feed.results;
          const ids = apps.map(app => app.id).join(',');

          wx.request({
            url: 'https://itunes.apple.com/lookup',
            data: {
              id: ids,
              country: country
            },
            method: 'GET',
            success: (lookupRes) => {
              if (lookupRes.statusCode === 200) {
                resolve(lookupRes.data);
              } else {
                reject(lookupRes);
              }
            },
            fail: (err) => {
              reject(err);
            }
          });
        } else {
          reject(new Error('Failed to fetch RSS feed'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};