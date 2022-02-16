<script lang="ts">
    import WeatherCard from '../lib/components/card-weather.svelte';

    let weatherCard: WeatherCard;

    let city: string;
    let state: string;
</script>

<main>
    <header>
        <h1>Shiny Rain</h1>

        <form on:submit|preventDefault={async() => await weatherCard.loadForecast()}>
            <label for="sr-city">
                City/ Town
                <input id="sr-city" type="text" bind:value={city} />
            </label>
            <label for="sr-state">
                State/ Province
                <input id="sr-state" type="text" bind:value={state} />
            </label>
            <button type="submit">Load Weather</button>
        </form>
    </header>
    <WeatherCard bind:this={weatherCard} bind:city={city} bind:state={state} />
</main>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0.125rem;
        margin-bottom: 0.5rem;

        form {
            display: flex;
            gap: 1rem;
        }

        label {
            display: flex;
            flex-direction: column;

            font-size: 0.8rem;
            font-weight: var(--font-weight-bold);
        }

        input {
            background-color: transparent;
            border: 1px solid var(--color-bg-card);
            border-radius: 3px;

            font-family: var(--font-primary);
        }

        [type=submit] {
            cursor: pointer;

            border: none;
            border-radius: 3px;

            background-color: rgba(0,0,0,0.25);
            backdrop-filter: saturate(1200%);

            font-family: var(--font-primary);
        }
    }

    h1 {
        margin: 0 0 0 0.5rem;

        font-size: 1.25rem;
    }
</style>