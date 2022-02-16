import setSnowfallAmounts from "./set-snowfall-amounts";

export default describe('set snowfall amounts', () => {
    /** Sample Map object for setting values. */
    let validMap: Map<number, any>;

    /** Sample valid snowfall data. */
    let validSnowfallData: Array<{validTime: string, value: number}>;

    beforeEach(() => {
        /** Sets the valid map each to ensure validity. */
        validMap = new Map();
        validMap.set(16, {
            date: "2022-02-16",
        });

        /** Sets the valid snowfall each time to ensure no modification. */
        validSnowfallData = [
            {validTime: "2022-02-16T12:00:00+00:00/PT6H", value: 1},
            {validTime: "2022-02-16T12:00:00+00:00/PT6H", value: 5},
            {validTime: "2022-02-16T12:00:00+00:00/PT6H", value: 3},
            {validTime: "2022-02-16T12:00:00+00:00/PT6H", value: 12},
            {validTime: "2022-02-16T12:00:00+00:00/PT6H", value: 19},
            {validTime: "2022-02-16T12:00:00+00:00/PT6H", value: 0},
        ];
    });

    it('should return a Map with snowfallAmount equal to the sum of all', () => {
        const resMap = new Map();
        resMap.set(16, {
            date: "2022-02-16",
            snowfallAmount: 40,
        });

        expect(setSnowfallAmounts(validMap, validSnowfallData)).toEqual(resMap);
    });
});