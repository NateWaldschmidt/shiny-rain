import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async(event) => {
    /** The endpoint for a 5-day forecast, requires the addition of a LocationKey at the end. */
    const forecastEndpoint = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

    /** The location key to use when requesting the forecast. */
    const locationKey = event.url.searchParams.get('locationKey');

    const results = await fetch(`${forecastEndpoint}${locationKey}?apikey=${import.meta.env.VITE_AW_API_KEY}`);
    const resultsJSON = await results.json();

    return {
        status: 200,
        body: {
            resultsJSON
        }
    }
}