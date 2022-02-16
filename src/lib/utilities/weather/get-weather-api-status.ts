/**
     * Validates that the National Weather Service
     * API is functioning properly.
     * 
     * @author Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
     */
 export default async function weatherAPIStatus(): Promise<void> {
    const status = (await fetch('https://api.weather.gov/')).status;
    if (status !== 200) {
        throw new Error(`(${status}) Weather API is not working properly.`);
    }
}