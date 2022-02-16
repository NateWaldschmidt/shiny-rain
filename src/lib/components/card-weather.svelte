<script lang="ts">
    import getWeekDayString    from '$lib/utilities/get-day-string';
    import getForecast         from '$lib/utilities/weather/get-forecast';

    /** The title of this weather card. */
    export const cardTitle = 'Weather this Week';

    /** The city we are searching for weather data from. */
    export let city = 'Geneva';

    /** The state we are searching for weather data from. */
    export let state = 'Illinois';

    let forecastData: Map<number, any>;

    export async function loadForecast(): Promise<void> {
        // Sets to undefined to show the reload.
        forecastData = undefined;
        forecastData = await getForecast(city, state);
    }
</script>

<article id="card">
    <h2 id="card-title">7-Day Forecast</h2>
        {#if forecastData == undefined}
            {#await loadForecast()}
                <p>Loading data for {city}, {state}...</p>
            {/await}
        {:else}
            {#each [...forecastData] as [_, day]}
                <ul id="forecast-list">
                    <li>
                        <p class="sr-datetime">
                            <time datetime="{day.date}">
                                {getWeekDayString(day.date)}
                            </time>
                        </p>
                        <p class="sr-low-temp">
                            {day.minTemp} &#176;F - {day.maxTemp} &#176;F
                        </p>
                    </li>
                </ul>
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