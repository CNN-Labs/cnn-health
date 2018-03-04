const CONSTANTS = require('../../src/common/constants');
const { makeInterval, makeCheckDescription, makeCheck } = require('../../src/common/utilities');
const Check = require('../../src/check');
const MockCheck = require('../mocks/check');

/**
 * Tests for utility functions
 */
describe('UTILITIES', () => {
    /**
     * makeInterval()
     */
    describe('makeInterval()', () => {

        it('should fallback to DEFAULT_CHECK_INTERVAL', () => {
            expect(makeInterval(null)).toBe(CONSTANTS.DEFAULT_CHECK_INTERVAL);
        });

        it('should use number if one is provided', () => {
            const value = 60000;

            expect(makeInterval(value)).toBe(value);
        });

        // string to value map of tests
        const tests = { '1m': 60000, '1h': (60000 * 60) };
        Object.keys(tests).forEach(v => {
            it('should convert string representation to number', () => {
                expect(makeInterval(v)).toBe(tests[v])
            });
        });
    });

    /**
     * makeCheckDescription()
     */
    describe('makeCheckDescription()', () => {
        // create valid desc object
        const mockProps = CONSTANTS.CHECK_DESCRIPTION_PROPERTIES.reduce((map, prop) => {
            map[prop] = 'test';
            return map;
        }, {});

        it('should return a valid description object', () => {
            const desc = makeCheckDescription(mockProps);
            expect(desc).toEqual(mockProps);
        });

        it('should throw error on missing properties', () => {
            const tests = [{}];

            tests.forEach(props => {
                const mkObj = () => makeCheckDescription(props);
                expect(mkObj).toThrow();
            });
        });
    });

    /**
     * makeCheck()
     */
    describe('makeCheck()', () => {
        // create valid desc object
        const mockProps = CONSTANTS.CHECK_DESCRIPTION_PROPERTIES.reduce((map, prop) => {
            map[prop] = 'test';
            return map;
        }, {});

        it('should return parameter if given instance of check', () => {
            const expected = new MockCheck;
            const actual = makeCheck(expected);
            expect(actual).toBe(expected);
        });

        it('should create new instance of check if given a config object', () => {
            const actual = makeCheck({description:mockProps});
            expect(actual).toBeInstanceOf(Check);
        });
    });
});