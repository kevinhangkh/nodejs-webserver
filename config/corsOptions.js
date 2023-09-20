const whitelist = [
  'https://www.mysite.com',
  'http://127.0.0.1:3000', // TODO Remove after dev is done
  'http://localhost:3000', // TODO Remove after dev is done
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // TODO Remove !origin after dev is done
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
