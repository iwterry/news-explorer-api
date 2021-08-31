const devNames = ['dev', 'development'];

if (!process.env.NODE_ENV || devNames.includes(process.env.NODE_ENV.toLowerCase())) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.PORT = process.env.PORT || 3000;
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/news_explorer_api_dev';
  process.env.TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret';
}
