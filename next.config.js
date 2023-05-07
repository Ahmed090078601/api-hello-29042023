/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  env:{
    PGHOST:'ep-flat-wood-953024.us-east-2.aws.neon.tech',
PGDATABASE:'neondb',
PGUSER:'Ahmed090078601',
PGPASSWORD:'mCluo89BZpxa',
  }
}

module.exports = nextConfig
