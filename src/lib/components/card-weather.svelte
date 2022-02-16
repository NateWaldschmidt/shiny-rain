<script lang="ts">
    import getCoordinates      from '$lib/utilities/get-coordinates';
    import getWeatherAPIStatus from '$lib/utilities/get-weather-api-status';
    import getWeekDayString    from '$lib/utilities/get-day-string';

    /** The title of this weather card. */
    export const cardTitle = 'Weather this Week';

    /** The city we are searching for weather data from. */
    export let city = 'Geneva';

    /** The state we are searching for weather data from. */
    export let state = 'Illinois';

    /**
     * Does the API request for the weather data using
     * the city and state props. This will return back
     * one week of weather data.
     * 
     * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
     * @returns { object } The weather data from the API.
     */
    export async function weekWeatherData(): Promise<any> {
        // Sets to undefined to show the loading part.
        weatherData = undefined;

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
        weatherData = await weatherWeeklyRes.json();
    }

    /** Used to dynamically update the page based on the results. */
    let weatherData: any;
</script>

<article id="card">
    <h2 id="card-title">7-Day Forecast</h2>
        {#if weatherData == undefined}
            {#await weekWeatherData()}
                <p>Loading data for {city}, {state}...</p>
            {/await}
        {:else}
            {#each weatherData.properties.periods as day}
                {#if day.isDaytime}
                    <ul id="forecast-list">
                        <li>
                            <p class="sr-datetime">
                                <time datetime="{day.startTime}">
                                    {getWeekDayString(day.startTime)}
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
                    </ul>
                {/if}
            {/each}
        {/if}
</article>

<style lang="scss">
    #card {
        max-width: 810px;
        margin: 0 auto;
        padding: 0.5rem;
        border-radius: 3px;
        box-sizing: border-box;
        
        background-color: var(--color-bg-card);
        backdrop-filter: saturate(1500%);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

        color: var(--color-font-card);
    }

    #card-title {
        margin: 0;
        padding-bottom: 0.4rem;
        border-bottom: solid 1px rgba(255,255,255,0.28);

        font-size: 0.85rem;
        font-weight: var(--font-weight-reg);
    }

    #forecast-list {
        list-style: none;

        margin: 0;
        padding: 0;

        & > li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0.65rem;

            // Avoids a border on the last element.
            &:not(:last-of-type) {
                border-bottom: solid 1px rgba(255,255,255,0.28);
            }

            font-size: 1rem;

            & > * {
                margin: 0;
            }
        }
    }

    .sr-datetime {
        width: 7rem;
    }
    .sr-low-temp {
        width: 7rem;

        text-align: right;
        font-weight: var(--font-weight-bold);
    }
</style>