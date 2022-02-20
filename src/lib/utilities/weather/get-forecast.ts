import getCoordinates         from "../get-coordinates";
import weatherAPIStatus       from "./get-weather-api-status";
import setMinMaxTemps         from "./set-temps";
import setMinMaxApparentTemps from "./set-apparent-temps";
import setPrecipChance        from "./set-precipitation-chances";
import setSnowfallAmounts     from "./set-snowfall-amounts";
import celciusToFahrenheit    from "../celcius-to-fahrenheit";

/**
 * @author Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 */
export default async function getForecast(city: string, state: string): Promise<Map<number, any>> {
    let weatherData = undefined;

    // Ensures everything is gucci.
    await weatherAPIStatus();

    /** Object with properties lat and lon. */
    const coords = await getCoordinates(city, state);

    // Finds the weather grid associated with the lat and long.
    const weatherGridRes = await fetch(`https://api.weather.gov/points/${coords.lat},${coords.lon}`);
    if (weatherGridRes.status !== 200) {
        throw new Error(`(${weatherGridRes.status}) Weather Grid API returned an error.`);
    }
    const weatherGridData = await weatherGridRes.json();

    // Does the request for the forecast data.
    const weatherWeeklyRes = await fetch(weatherGridData.properties.forecastGridData);
    if (weatherWeeklyRes.status !== 200) {
        throw new Error(`(${weatherWeeklyRes.status}) Weather API returned an error.`);
    }
    weatherData = await weatherWeeklyRes.json();

    // The map to return.
    let retWeatherData = new Map();

    // Gets the min and max temps.
    retWeatherData = setMinMaxTemps(retWeatherData, weatherData);

    // Apparent temps lows and highs.
    retWeatherData = setMinMaxApparentTemps(retWeatherData, weatherData);

    // Chance of precipitation.
    retWeatherData = setPrecipChance(retWeatherData, weatherData);

    // Snowfall Amount.
    retWeatherData = setSnowfallAmounts(
        retWeatherData,
        weatherData.properties.snowfallAmount.values
    );

    // Conversions.
    retWeatherData.forEach((value: any) => {
        // Converts to fahrenheit.
        value.minTemp = celciusToFahrenheit(value.minTemp);
        value.maxTemp = celciusToFahrenheit(value.maxTemp);
        value.minApparentTemp = celciusToFahrenheit(value.minApparentTemp);
        value.maxApparentTemp = celciusToFahrenheit(value.maxApparentTemp);
    });

    return retWeatherData;
}