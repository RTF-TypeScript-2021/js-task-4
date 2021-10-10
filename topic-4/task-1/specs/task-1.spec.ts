const {tokenChoice} = require('../index');

test('Method works fine', () => {
    expect(tokenChoice([{month: 11, year: 2022}])).toEqual("ETH");
});

test('Method works fine', () => {
    expect(tokenChoice([{month: 11, year: 2022}, {month: 1, year: 2023}, {month: 2, year: 2023}])).toEqual("ETH");
});
