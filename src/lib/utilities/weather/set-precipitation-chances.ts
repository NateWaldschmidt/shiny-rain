import getDateObject from "../get-date-object";

/**
 * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 * @param   weatherData The Map that the data is to be saved to.
 * @param   weatherJSON Unformatted weather API data.
 * @returns             Returns back the passed in weatherData with the apparent temps.
 */
export default function setPrecipChance(weatherData: Map<number, any>, weatherJSON: any): Map<number, any> {
    weatherJSON.properties.probabilityOfPrecipitation.values.forEach((probObj: any) => {
        /** The date object for this day. */
        const date = getDateObject(probObj.validTime);
    
        /** The day of the month. */
        const dayNum = date.getDate();
    
        // Checks if it has been set yet in the Map.
        if (!weatherData.has(dayNum)) {
            /** Weather object to initalize with. */
            const weatherObj = {
                // Removes the time from the string.
                date: date.toISOString().substring(0, 10),
            };
            weatherData.set(dayNum, weatherObj);
    
        } 

        // Checks if this precipitation chance is higher than previously recorded high.
        const prevPrecipChange = weatherData.get(dayNum).precipitationChance;
        if (!prevPrecipChange || probObj.value > prevPrecipChange) {
            weatherData.get(dayNum).precipitationChance = probObj.value;
        }
    });

    return weatherData;
}