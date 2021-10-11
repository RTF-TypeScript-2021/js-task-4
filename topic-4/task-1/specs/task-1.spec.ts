const { tokenChoice } = require('../index');

test('Method works fine', () => {
    expect(tokenChoice([{ month: 11, year: 2022 }])).toEqual("ETH");
    //expect(tokenChoice([{month: 3,year: 2022},{ month: 11, year: 2022 }])).toEqual("ETH");
});
