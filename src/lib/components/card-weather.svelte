<script lang="ts">
    import getCoordinates      from '$lib/utilities/get-coordinates';
    import getWeatherAPIStatus from '$lib/utilities/get-weather-api-status';

    /** The title of this weather card. */
    export const cardTitle = 'Weather this Week';

    /** The city we are searching for weather data from. */
    export const city = 'Geneva';

    /** The state we are searching for weather data from. */
    export const state = 'Illinois'

    /**
     * Does the API request for the weather data using
     * the city and state props. This will return back
     * one week of weather data.
     * 
     * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
     * @returns { object } The weather data from the API.
     */
    let weekWeatherData = async function (): Promise<any> {
        // Ensures everything is gucci.
        await getWeatherAPIStatus();

        /** Object with properties lat and lon. */
        const coords = await getCoordinates(city, state);

        // Finds the weather grid associated with the lat and long.
        const weatherGridRes = await fetch(`https://api.weather.gov/points/${coords.lat},${coords.lon}`);
        if (weatherGridRes.status !== 200) {
            throw new Error(`(${weatherGridRes.status}) Weather Grid API returned an error.`);
        }
        const weatherGridData = await weatherGridRes.json();

        // Does the request for the forecast data.
        const weatherWeeklyRes = await fetch(weatherGridData.properties.forecast);
        if (weatherWeeklyRes.status !== 200) {
            throw new Error(`(${weatherWeeklyRes.status}) Weather API returned an error.`);
        }
        const weatherWeeklyData = await weatherWeeklyRes.json();

        console.log(weatherWeeklyData);

        return weatherWeeklyData;
    }
</script>

<article>
    <ul>
        {#await weekWeatherData()}
            <li>Loading weather data...</li>
        {:then weatherData}
            {#each weatherData.properties.periods as day}
                <li>
                    <p class="sr-datetime">
                        <time datetime="{day.startTime}">
                            {day.name}
                        </time>
                    </p>
                    <p class="sr-conditions" data-day-time="{day.isDaytime}">
                        {day.shortForecast}
                    </p>
                    <p class="sr-low-temp">
                        {day.temperature} &#176;{day.temperatureUnit}
                    </p>
                    <!-- <p class="sr-high-temp">{day.temperature} &#176;F</p> -->
                </li>
            {/each}
        {:catch err}
                <li>({err}) Error loading weather data...</li>
        {/await}
    </ul>
</article>