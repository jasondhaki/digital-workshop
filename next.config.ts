import type { NextConfig } from "next";

/**
 * CSP note: a nonce-based strict CSP would force every page into dynamic
 * rendering (no static generation / CDN caching) per Next's own docs, which
 * conflicts with this being a fully static portfolio optimized for speed.
 * This policy keeps static generation intact while still restricting
 * scripts/images/connections to same-origin and locking down the classic
 * injection vectors (object-src, base-uri, form-action, frame-ancestors).
 * next/font self-hosts Google Fonts at build time, so no font CDN needs allowing.
 */
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  /* Move it out of 'experimental' and into the root here: */
  allowedDevOrigins: ['192.168.0.103'],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;