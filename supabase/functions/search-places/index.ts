import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PlaceResult {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  businessStatus?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keyword, city } = await req.json();
    
    if (!keyword || !city) {
      return new Response(
        JSON.stringify({ error: 'Keyword and city are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!apiKey) {
      console.error('GOOGLE_PLACES_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching for "${keyword}" in "${city}, Israel"`);

    // Step 1: Text Search to find places
    const textSearchUrl = 'https://places.googleapis.com/v1/places:searchText';
    const textSearchBody = {
      textQuery: `${keyword} in ${city}, Israel`,
      languageCode: 'en',
      regionCode: 'IL',
      maxResultCount: 20,
    };

    const textSearchResponse = await fetch(textSearchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.businessStatus',
      },
      body: JSON.stringify(textSearchBody),
    });

    if (!textSearchResponse.ok) {
      const errorText = await textSearchResponse.text();
      console.error('Google Places API error:', textSearchResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: `Google Places API error: ${textSearchResponse.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const textSearchData = await textSearchResponse.json();
    console.log(`Found ${textSearchData.places?.length || 0} places`);

    const places: PlaceResult[] = textSearchData.places || [];

    // Transform to our Lead format
    const leads = places.map((place: PlaceResult, index: number) => ({
      id: place.id || `lead-${index}`,
      businessName: place.displayName?.text || 'Unknown Business',
      phone: place.nationalPhoneNumber || place.internationalPhoneNumber || null,
      address: place.formattedAddress || '',
      website: place.websiteUri || null,
      rating: place.rating || null,
      reviewCount: place.userRatingCount || 0,
      category: keyword,
      googleMapsUrl: place.googleMapsUri || null,
      status: place.businessStatus || 'OPERATIONAL',
    }));

    console.log(`Returning ${leads.length} leads, ${leads.filter(l => l.phone).length} with phone numbers`);

    return new Response(
      JSON.stringify({ leads }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in search-places function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
