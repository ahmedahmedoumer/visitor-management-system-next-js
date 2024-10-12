/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.prod.website-files.com',
      'files.ienetworks.co',
      'example.com',
    ],
  },
  env: {
    ORG_AND_EMP_URL: process.env.ORG_AND_EMP_URL,
    ORG_DEV_URL: process.env.ORG_DEV_URL,
    TENANT_MGMT_URL: process.env.TENANT_MGMT_URL,
    OKR_URL: process.env.OKR_URL,
    // OKR_URL_COPY: process.env.OKR_URL_COPY,


  },
};

export default nextConfig;
