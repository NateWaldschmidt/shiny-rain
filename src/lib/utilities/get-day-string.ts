/**
 * Takes in a date string and then will return back
 * the string formatted day of the week.
 * 
 * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 * @param   { string }  date   A date string.
 * @param   { boolean } abbrev Whether to show this abbreviated or not (ie. 'Mon').
 * @returns { string }         The formatted day of the week.
 */
export default function getWeekDayString(date: string, abbrev: boolean = false): string {
    // Converts to Date object with proper timezone.
    let dateObj = new Date(date);
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
    dateObj = new Date(dateObj.getTime() + timezoneOffset);

    // Returns abbreviated version.
    if (abbrev) {
        /** Abbreviated week day strings. */
        const abbrevWeekDayStrings = [
            'Sun',
            'Mon',
            'Tues',
            'Wed',
            'Thurs',
            'Fri',
            'Sat'
        ];
        return abbrevWeekDayStrings[dateObj.getDay()];
    }

    /** Full week day strings. */
    const fullWeekDayStrings = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return fullWeekDayStrings[dateObj.getDay()];
}