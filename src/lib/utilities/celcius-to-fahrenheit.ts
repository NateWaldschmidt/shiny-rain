/**
 * Converts from Celcius to Fahrenheit.
 * 
 * @author Nathaniel Waldschmidt <Nathaniel.Waldsch@gmail.com>
 */
export default function celciusToFahrenheit(temp: number) {
    return Math.round((temp * 1.8) + 32);
}