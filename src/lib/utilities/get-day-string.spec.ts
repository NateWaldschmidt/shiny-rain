import getWeekDayString from "./get-day-string";

export default describe('get day string', () => {
    it.each([
        ['2022-02-13', 'Sunday'],
        ['2022-02-14', 'Monday'],
        ['2022-02-15', 'Tuesday'],
        ['2022-02-16', 'Wednesday'],
        ['2022-02-17', 'Thursday'],
        ['2022-02-18', 'Friday'],
        ['2022-02-19', 'Saturday'],
        ['2-13-2022', 'Sunday'],
        ['2-14-2022', 'Monday'],
        ['2-15-2022', 'Tuesday'],
        ['2-16-2022', 'Wednesday'],
        ['2-17-2022', 'Thursday'],
        ['2-18-2022', 'Friday'],
        ['2-19-2022', 'Saturday'],
        ['2/13/2022', 'Sunday'],
        ['2/14/2022', 'Monday'],
        ['2/15/2022', 'Tuesday'],
        ['2/16/2022', 'Wednesday'],
        ['2/17/2022', 'Thursday'],
        ['2/18/2022', 'Friday'],
        ['2/19/2022', 'Saturday'],
    ])('%p should be %p', (date: string, dayString: string) => {
        expect(getWeekDayString(date)).toBe(dayString);
    });

    it.each([
        ['2022-02-13', 'Sun'],
        ['2022-02-14', 'Mon'],
        ['2022-02-15', 'Tues'],
        ['2022-02-16', 'Wed'],
        ['2022-02-17', 'Thurs'],
        ['2022-02-18', 'Fri'],
        ['2022-02-19', 'Sat'],
        ['2-13-2022', 'Sun'],
        ['2-14-2022', 'Mon'],
        ['2-15-2022', 'Tues'],
        ['2-16-2022', 'Wed'],
        ['2-17-2022', 'Thurs'],
        ['2-18-2022', 'Fri'],
        ['2-19-2022', 'Sat'],
        ['2/13/2022', 'Sun'],
        ['2/14/2022', 'Mon'],
        ['2/15/2022', 'Tues'],
        ['2/16/2022', 'Wed'],
        ['2/17/2022', 'Thurs'],
        ['2/18/2022', 'Fri'],
        ['2/19/2022', 'Sat'],
    ])('%p abbreviated should be %p', (date: string, dayString: string) => {
        expect(getWeekDayString(date, true)).toBe(dayString);
    });
});