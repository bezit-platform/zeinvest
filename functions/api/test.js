/**
 * Test endpoint pro ověření, že Cloudflare Pages Functions fungují
 * 
 * URL: /api/test
 * 
 * Použití:
 * curl https://your-site.pages.dev/api/test
 */

export async function onRequest() {
  return new Response(JSON.stringify({
    success: true,
    message: 'ZE Invest API is working! 🌬️',
    timestamp: new Date().toISOString(),
    environment: {
      hasResendKey: !!process.env.RESEND_API_KEY,
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
