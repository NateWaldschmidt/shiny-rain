/**
 * @author  Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 * @param   date The unformatted date string sent back by the Nation Weather Service API.
 * @returns      Returns back the date object.
 */
export default function getDateObject(date: string): Date {
    // Removes the unnecessary part of the date string.
    date = date.substring(0, 25);

    // Parses the date for easier creation of the Date object.
    const parsedDate = Date.parse(date);

    return new Date(parsedDate);
}