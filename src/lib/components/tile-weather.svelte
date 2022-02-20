<article class="tile">
    <h3 class="title">{title}</h3>
    <p class="value">{value}</p>
    <p class="sub-info">{subInfo}</p>
</article>

<script lang="ts">
    /** The title of this particular tile. */
    export let title   = 'Weather Tile';

    /** The value and unit to display for the tile. */
    export let value   = '0';

    /** Any additional information for the tile. */
    export let subInfo = '';
</script>

<style lang="scss">
    .tile {
        display: flex;
        flex-direction: column;

        width: 12rem;
        height: 12rem;
        padding: 0.5rem;
        border-radius: 3px;
        box-sizing: border-box;

        background-color: var(--color-bg-card);
        backdrop-filter: saturate(1500%);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

        color: var(--color-font-card);
    }

    .title, .sub-info {
        margin: 0;

        font-size: 0.85rem;
    }

    .title {
        padding-bottom: 0.4rem;
        border-bottom: solid 1px rgba(255,255,255,0.28);

        font-weight: var(--font-weight-reg);
    }

    .value {
        margin: 0.75rem 0;

        font-size: 3rem;
        font-weight: var(--font-weight-bold);
    }

    .sub-info {
        margin-top: auto;
    }
</style>