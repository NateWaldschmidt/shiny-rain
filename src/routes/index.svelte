<script lang="ts">
    import WeatherCard from '../lib/components/card-weather.svelte';

    let weatherCard: WeatherCard;

    let city: string;
    let state: string;
</script>

<main>
    <h1>Shiny Rain</h1>
    <form on:submit|preventDefault={async() => await weatherCard.weekWeatherData()}>
        <label for="sr-city">City/ Town</label>
        <input id="sr-city" type="text" bind:value={city} />
        <label for="sr-state">State/ Province</label>
        <input id="sr-state" type="text" bind:value={state} />
        <button type="submit">Load Weather</button>
    </form>
    <WeatherCard bind:this={weatherCard} bind:city={city} bind:state={state} />
</main>

<style lang="scss">
    h1 {
        margin: 0;

        font-size: 1.25rem;
    }
</style>