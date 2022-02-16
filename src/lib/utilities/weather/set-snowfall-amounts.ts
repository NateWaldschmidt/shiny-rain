import getDateObject from "../get-date-object";

interface snowfallData {
    validTime: string,
    value: number
}

/**
 * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 * @param   weatherData  The Map that the data is to be saved to.
 * @param   snowfallData An array of snow fall data.
 * @returns              Returns back the passed in weatherData with the snowfall amounts.
 */
export default function setSnowfallAmounts(weatherData: Map<number, any>, snowfallData: Array<snowfallData>): Map<number, any> {
    snowfallData.forEach((snowObj: any) => {
        /** The date object for this day. */
        const date = getDateObject(snowObj.validTime);

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
        // Adds the amount for the day.
        if (!weatherData.get(dayNum).snowfallAmount) {
            weatherData.get(dayNum).snowfallAmount = 0;
        }
        weatherData.get(dayNum).snowfallAmount += snowObj.value;
    });

    return weatherData;
}