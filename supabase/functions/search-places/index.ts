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

    console.log(`Searching for "${keyword}" in "${city}, Israel" - fetching up to 60 results in Hebrew`);

    // Google Places API allows max 20 results per request
    // We'll make up to 3 requests with pagination to get up to 60 results
    const textSearchUrl = 'https://places.googleapis.com/v1/places:searchText';
    const allPlaces: PlaceResult[] = [];
    let pageToken: string | undefined = undefined;

    // Make up to 3 requests to get more results
    for (let page = 0; page < 3; page++) {
      const textSearchBody: Record<string, unknown> = {
        textQuery: `${keyword} in ${city}, Israel`,
        languageCode: 'he', // Hebrew language
        regionCode: 'IL',
        maxResultCount: 20,
      };

      // Add page token for subsequent requests
      if (pageToken) {
        textSearchBody.pageToken = pageToken;
      }

      const textSearchResponse = await fetch(textSearchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.businessStatus,nextPageToken',
        },
        body: JSON.stringify(textSearchBody),
      });

      if (!textSearchResponse.ok) {
        const errorText = await textSearchResponse.text();
        console.error('Google Places API error:', textSearchResponse.status, errorText);
        // If first page fails, return error. Otherwise, just stop pagination
        if (page === 0) {
          return new Response(
            JSON.stringify({ error: `Google Places API error: ${textSearchResponse.status}` }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        break;
      }

      const textSearchData = await textSearchResponse.json();
      const places: PlaceResult[] = textSearchData.places || [];
      allPlaces.push(...places);
      
      console.log(`Page ${page + 1}: Found ${places.length} places (total: ${allPlaces.length})`);

      // Check if there's a next page
      pageToken = textSearchData.nextPageToken;
      if (!pageToken) {
        break; // No more pages
      }

      // Small delay between pagination requests (Google recommends this)
      if (page < 2) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log(`Total places found: ${allPlaces.length}`);

    // Transform to our Lead format
    const leads = allPlaces.map((place: PlaceResult, index: number) => ({
      id: place.id || `lead-${index}`,
      businessName: place.displayName?.text || 'עסק לא ידוע',
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
