/**
 * CORS Middleware pro Cloudflare Pages Functions
 * 
 * Automaticky přidává CORS hlavičky ke všem API endpointům
 * Dokumentace: https://developers.cloudflare.com/pages/platform/functions/middleware/
 */

export async function onRequest(context) {
  const response = await context.next()
  
  // Přidání CORS headers
  const newHeaders = new Headers(response.headers)
  newHeaders.set('Access-Control-Allow-Origin', '*')
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  })
}
