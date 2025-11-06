/**
 * Cloudflare Pages Function pro zpracování kontaktního formuláře
 * 
 * Cesta: /api/contact
 * Dokumentace: https://developers.cloudflare.com/pages/platform/functions/
 * 
 * Tento serverless endpoint:
 * 1. Přijímá POST požadavky s formulářovými daty
 * 2. Validuje povinná pole (email, jmeno)
 * 3. Odesílá email přes Resend API (v produkci)
 * 4. V DEV módu pouze loguje data do console
 * 
 * Environment variables (nastavit v Cloudflare Dashboard):
 * - RESEND_API_KEY: API klíč pro Resend (re_...)
 * - MAIL_TO: Email příjemce (výchozí: info@zeinvest.cz)
 * - MAIL_FROM: Email odesílatele (výchozí: onboarding@resend.dev)
 */

/**
 * POST handler - zpracování odeslaných formulářových dat
 * 
 * @param {Object} context - Cloudflare Pages context
 * @param {Request} context.request - HTTP request objekt
 * @param {Object} context.env - Environment variables
 * @returns {Promise<Response>} - JSON response
 */
export async function onRequestPost(context) {
  const { request, env } = context

  // CORS headers - povolení cross-origin requestů
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    // Parse JSON těla requestu
    const data = await request.json()
    
    console.log('Received form data:', data)

    // ===== VALIDACE POVINNÝCH POLÍ =====
    if (!data.email || !data.jmeno) {
      return new Response(
        JSON.stringify({ success: false, message: 'Chybí povinná pole' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // ===== DEV MODE vs PRODUCTION =====
    // Pokud není nastaven RESEND_API_KEY, pouze logujeme do console
    if (!env.RESEND_API_KEY || env.RESEND_API_KEY === 'placeholder') {
      console.log('DEV MODE: Email by byl odeslán s těmito daty:', data)
      return new Response(
        JSON.stringify({ success: true, message: 'DEV MODE - Email logged to console' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // ===== PRODUKČNÍ MÓD - Odeslání emailu přes Resend API =====
    
    // Email konfigurace z environment variables
    const recipientEmail = env.MAIL_TO || 'info@zeinvest.cz'
    const fromEmail = env.MAIL_FROM || 'onboarding@resend.dev'
    
    console.log('Sending to:', recipientEmail, 'from:', fromEmail)
    
    // Volání Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `ZE Invest Formulář <${fromEmail}>`,
        to: recipientEmail,
        replyTo: data.email,
        subject: `Nová poptávka od ${data.jmeno}`,
        
        // ===== HTML EMAIL TEMPLATE =====
        html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #2f6f93 0%, #3b7f2f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
      .header h1 { margin: 0; font-size: 28px; }
      .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
      .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .section-title { color: #3b7f2f; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #3b7f2f; padding-bottom: 10px; }
      .info-row { margin: 10px 0; }
      .label { font-weight: bold; color: #555; }
      .value { color: #333; }
      .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🌬️ Nová poptávka - ZE Invest</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">${new Date().toLocaleDateString('cs-CZ', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
      
      <div class="content">
        <div class="section">
          <div class="section-title">📋 Kontaktní údaje</div>
          <div class="info-row"><span class="label">Jméno:</span> <span class="value">${data.jmeno}</span></div>
          <div class="info-row"><span class="label">Email:</span> <span class="value">${data.email}</span></div>
          ${data.zprava ? `<div class="info-row"><span class="label">Zpráva:</span> <span class="value" style="white-space: pre-wrap;">${data.zprava}</span></div>` : ''}
        </div>
      </div>
      
      <div class="footer">
        <p>Tento email byl odeslán z kontaktního formuláře na <strong>zeinvest.cz</strong></p>
        <p>© ${new Date().getFullYear()} ZE Invest</p>
      </div>
    </div>
  </body>
</html>
        `,
      }),
    })

    // ===== KONTROLA ODPOVĚDI Z RESEND API =====
    const resendData = await resendResponse.json()
    
    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData)
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Nepodařilo se odeslat email',
          error: resendData 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // ===== ÚSPĚŠNÁ ODPOVĚĎ =====
    console.log('Email sent successfully:', resendData)
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email odeslán',
        id: resendData.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    // ===== ERROR HANDLING =====
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Chyba serveru',
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
}

/**
 * OPTIONS handler - pro CORS preflight requesty
 */
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
