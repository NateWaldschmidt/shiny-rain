import type { RequestHandler } from "@sveltejs/kit";

/**
 * Makes the API request to AccuWeather to get 
 * location information, primarily the 
 * LocationKey which is used to get the 5-day 
 * forecast.
 * 
 * @author Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 */
export const get: RequestHandler = async(event) => {
    /** The city being used in the request. */
    const city = event.url.searchParams.get('city')

    /** The state being used in the request. */
    const state = event.url.searchParams.get('state');

    /** The endpoint for getting the location data. */
    const cityAddr = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    /** Makes the request using the passed in data. */
    const results = await fetch(`${cityAddr}?apikey=${import.meta.env.VITE_AW_API_KEY}&q=${city}%2C%20${state}`);
    const resultsJSON = await results.json();

    /** The data to send back to the user. */
    const retBody = {
        results: [],
    };

    // Loops the results and gets the data required for weather information.
    resultsJSON.forEach((result: any, index: number) => {
        retBody.results[index] = {
            Key: result.Key,
            Type: result.Type,
            CityName: result.LocalizedName,
            PostalCode: result.PrimaryPostalCode,
            RegionName: result.Region.LocalizedName,
            CountryName: result.Country.LocalizedName,
            AdministrativeArea: {
                Type: result.AdministrativeArea.LocalizedType,
                NameAbbreviated: result.AdministrativeArea.ID,
                Name: result.AdministrativeArea.LocalizedName,
            },
            GeoPosition: {
                Latitude: result.GeoPosition.Latitude,
                Longitude: result.GeoPosition.Longitude
            },
        };
    });

    return {
        status: 200,
        body: retBody
    }
}