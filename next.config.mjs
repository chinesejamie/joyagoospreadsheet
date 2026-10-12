// next.config.mjs
/** @type {import('next').NextConfig} */

const imageHosts = [
  'si.geilicdn.com',
  'img.alicdn.com',
  'cbu01.alicdn.com',
  'gw.alicdn.com',
  'gd1.alicdn.com',
  'gd2.alicdn.com',
  'gd3.alicdn.com',
  'gd4.alicdn.com',
  'global-img-cdn.1688.com',
  'i.imgur.com',
  'i.postimg.cc',
  'images.stockx.com',
  'images-wp.stockx.com',
  'images.soleretriever.com',
  'www.soleretriever.com',
  'www.basetao.com',
  'foooound.com',
];

const toArticles = (source) => ({ source, destination: '/articles', permanent: true });

const nextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: 'https', hostname, pathname: '/**' })),
  },
  rewrites() {
    return [
      { source: '/uploads/:path*', destination: 'http://217.154.115.9:4501/uploads/:path*' },
      { source: '/assets/profilePicture/:path*', destination: 'http://217.154.115.9:4501/assets/profilePicture/:path*' },
      { source: '/assets/productImages/:path*', destination: 'http://217.154.115.9:4501/assets/productImages/:path*' },
      { source: '/assets/images/:path*', destination: 'http://217.154.115.9:4501/assets/images/:path*' },
    ];
  },
  async headers() {
    const immutable = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }];
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      { source: '/staticImages/(.*)', headers: immutable },
      { source: '/images/(.*)', headers: immutable },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.joyagoospreadsheet.com' }],
        destination: 'https://joyagoospreadsheet.com/:path*',
        permanent: true,
      },
      { source: '/features/finds-of-the-week', destination: '/joyagoo-spreadsheet?sort=newest', permanent: true },
      { source: '/features/joyagoo-qc-images', destination: '/articles/how-to-buy-on-joyagoo#qc-photos', permanent: true },
      { source: '/features/qc-images', destination: '/articles/how-to-buy-on-joyagoo#qc-photos', permanent: true },
      { source: '/features/report-dead-link', destination: '/features/dead-link', permanent: true },
      { source: '/feature-soon', destination: '/', permanent: true },
      { source: '/signup', destination: '/', permanent: true },
      { source: '/features/request-product', destination: '/features/dead-link', permanent: true },
      { source: '/articles/joyagoo-coupons', destination: '/articles/joyagoo-coupons-2026', permanent: true },
      ...[
        '/articles/joyagoo-review',
        '/articles/joyagoo-coupon-code',
        '/articles/how-to-use-joyagoo',
        '/articles/how-to-shop-with-joyagoo',
        '/articles/joyagoo-vs-wegobuy',
        '/articles/how-to-use-joyagoo-spreadsheet',
        '/articles/joyagoo-agent-review',
      ].map(toArticles),
    ];
  },
};

export default nextConfig;
