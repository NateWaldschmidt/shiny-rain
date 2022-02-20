import getDateObject from "../get-date-object";

/**
 * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 * @param   weatherData The Map that the data is to be saved to.
 * @param   weatherJSON Unformatted weather API data.
 * @returns             Returns back the passed in weatherData with the apparent temps.
 */
export default function setMinMaxApparentTemps(weatherData: Map<number, any>, weatherJSON: any): Map<number, any> {
    // Loops the apparent temperature array.
    weatherJSON.properties.apparentTemperature.values.forEach((tempObj: any) => {
        /** The date object for this day. */
        const date = getDateObject(tempObj.validTime);

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

        // Checks if this apparent temp is lower than the previously recorded min.
        const minApparentTemp = weatherData.get(dayNum).minApparentTemp
        if (!minApparentTemp || tempObj.value < minApparentTemp) {
            weatherData.get(dayNum).minApparentTemp = Math.round(tempObj.value);
        }

        // Checks if this apparent temp is higher than the previously record high.
        const maxApparentTemp = weatherData.get(dayNum).maxApparentTemp
        if (!maxApparentTemp || tempObj.value > maxApparentTemp) {
            weatherData.get(dayNum).maxApparentTemp = Math.round(tempObj.value);
        }
    });

    return weatherData;
}