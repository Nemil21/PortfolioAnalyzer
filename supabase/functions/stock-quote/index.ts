import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// Read secrets from Deno environment variables
const FINNHUB_API_KEY = Deno.env.get("FINNHUB_API_KEY");
const FINNHUB_WEBHOOK_SECRET = Deno.env.get("FINNHUB_WEBHOOK_SECRET");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow requests from your Vercel frontend domain in production
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!FINNHUB_API_KEY || !FINNHUB_WEBHOOK_SECRET) {
      throw new Error("Finnhub API Key or Webhook Secret not configured in function environment variables.");
    }

    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get symbol from URL params
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol');

    if (!symbol) {
      return new Response(JSON.stringify({ error: 'Symbol parameter is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Make request to Finnhub API using environment variables
    const finnhubResponse = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Finnhub-Secret': FINNHUB_WEBHOOK_SECRET, // Use environment variable
        },
      }
    );

    if (!finnhubResponse.ok) {
      console.error('Finnhub API Error:', await finnhubResponse.text());
      throw new Error('Failed to fetch data from Finnhub');
    }

    const data = await finnhubResponse.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in stock-quote function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
