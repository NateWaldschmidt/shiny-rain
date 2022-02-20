import celciusToFahrenheit from "./celcius-to-fahrenheit";

export default describe('celcius to fahrenheit', () => {
    test('10C is 50F', () => {
        expect(celciusToFahrenheit(10)).toBe(50);
    });

    test('0C is 32F', () => {
        expect(celciusToFahrenheit(0)).toBe(32);
    });

    test('-10C is 14', () => {
        expect(celciusToFahrenheit(-10)).toBe(14);
    });

    test('10.1C is 50F', () => {
        expect(celciusToFahrenheit(10.1)).toBe(50);
    })
});