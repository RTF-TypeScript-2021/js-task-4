const { getSpeedy, getLazy } = require('../index');

getSpeedy().eat("apple");

test('Method works fine', () => {
    expect(getLazy().stomach.length).toBe(0);
});

test('Method works fine', () => {
    expect(getSpeedy().stomach.length).toBe(0);
});
