import getWeekDayString from "./get-day-string";

export default describe('get day string', () => {
    it('should be Sunday', () => {
        expect(getWeekDayString('2022-02-13')).toBe('Sunday');
    });
    it('should be Monday', () => {
        expect(getWeekDayString('2-14-2022')).toBe('Monday');
    });
    it('should be Tuesday', () => {
        expect(getWeekDayString('2/15/2022')).toBe('Tuesday');
    });
    it('should be Wednesday', () => {
        expect(getWeekDayString('2/16/2022')).toBe('Wednesday');
    });
    it('should be Thursday', () => {
        expect(getWeekDayString('2/17/2022')).toBe('Thursday');
    });
    it('should be Friday', () => {
        expect(getWeekDayString('2/18/2022')).toBe('Friday');
    });
    it('should be Saturday', () => {
        expect(getWeekDayString('2/19/2022')).toBe('Saturday');
    });
    it('should be Sun', () => {
        expect(getWeekDayString('2/13/2022', true)).toBe('Sun');
    });
    it('should be Mon', () => {
        expect(getWeekDayString('2/14/2022', true)).toBe('Mon');
    });
    it('should be Tues', () => {
        expect(getWeekDayString('2/15/2022', true)).toBe('Tues');
    });
    it('should be Wed', () => {
        expect(getWeekDayString('2/16/2022', true)).toBe('Wed');
    });
    it('should be Thurs', () => {
        expect(getWeekDayString('2/17/2022', true)).toBe('Thurs');
    });
    it('should be Fri', () => {
        expect(getWeekDayString('2/18/2022', true)).toBe('Fri');
    });
    it('should be Sat', () => {
        expect(getWeekDayString('2/19/2022', true)).toBe('Sat');
    });
});