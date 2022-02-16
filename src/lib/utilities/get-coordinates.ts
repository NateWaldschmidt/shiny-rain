/**
 * Does a request with city and state to get the 
 * latitutde and longitutde coordinates for that
 * location.
 * 
 * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 * @param   { string } city  City for the coordinates.
 * @param   { string } state State to be used in conjuction with the city for coordinates.
 * @returns { object }       Returns the lat and lon.
 */
export default async function getCoordinates(city: string, state: string): Promise<{lat: number, lon: number}> {
    // Looks up the lat and long for the provided city and state.
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/?city=${city}&state=${state}&format=json&limit=1`);
    if (geoRes.status !== 200) {
        throw new Error(`(${geoRes.status}) Geo Coding API is not working properly.`);
    }
    const geoData = await geoRes.json();

    return {
        lat: geoData[0].lat,
        lon: geoData[0].lon
    };
}