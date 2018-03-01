const CONSTANTS = require('../../src/common/constants');
const { makeInterval, makeDescription } = require('../../src/common/utilities');

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

        it('should convert string representation to number', () => {
            // string to value map of tests
            const tests = {
                '1m': 60000,
                '1h': (60000 * 60)
            };

            // compare result to value from map
            Object.keys(tests).map((v) => expect(makeInterval(v)).toBe(tests[v]));
        });
    });

    /**
     * makeDescription()
     */
    describe('makeDescription()', () => {
        // create valid desc object
        const mockProps = CONSTANTS.CHECK_DESCRIPTION_PROPERTIES.reduce((map, prop) => {
            map[prop] = 'test';
            return map;
        }, {});

        it('should return a valid description object', () => {
            const desc = makeDescription(mockProps);
            expect(desc).toEqual(mockProps);
        });

        it('should throw error on missing properties', () => {
            const tests = [{}];

            tests.map(props => {
                const mkObj = () => makeDescription(props);
                expect(mkObj).toThrow();
            });
        });
    });
});

