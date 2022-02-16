import getDateObject from "../get-date-object";

/**
 * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 * @param   weatherData The Map that the data is to be saved to.
 * @param   weatherJSON Unformatted weather API data.
 * @returns             Returns back the passed in weatherData with the values processed.
 */
export default function setMinMaxTemps(weatherData: Map<number, any>, weatherJSON: any): Map<number, any> {
    // Loops the temperature array.
    weatherJSON.properties.temperature.values.forEach((tempObj: any) => {
        /** The date object for this day. */
        const date = getDateObject(tempObj.validTime);

        /** The day of the month. */
        const dayNum = date.getDate();

        // Checks if the date has been set in the map yet.
        if (!weatherData.has(dayNum)) {
            /** Weather object to initalize with. */
            const weatherObj = {
                // Removes the time from the string.
                date: date.toISOString().substring(0, 10),
            };
            weatherData.set(dayNum, weatherObj);

        }

        // Checks if this temp is lower than previously recorded min.
        const prevMinTemp = weatherData.get(dayNum).minTemp;
        if (!prevMinTemp || tempObj.value < prevMinTemp) {
            weatherData.get(dayNum).minTemp = tempObj.value;
        }

        // Checks if this temp is high than previously record high.
        const prevMaxTemp = weatherData.get(dayNum).maxTemp;
        if (!prevMaxTemp || tempObj.value > prevMaxTemp) {
            weatherData.get(dayNum).maxTemp = tempObj.value;
        }
    });

    return weatherData;
}