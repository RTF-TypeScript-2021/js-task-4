const { Hamburger } = require('../index');



test('Method works fine', () => {
    const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
    hamburger.addTopping(Hamburger.TOPPING_MAYO);
    expect(hamburger.calculateCalories()).toEqual(45)
    expect(hamburger.calculatePrice()).toEqual(80)
});



test('Recalculate is works', () => {
    const newHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
    newHamburger.addTopping(Hamburger.TOPPING_MAYO);
    newHamburger.addTopping(Hamburger.TOPPING_SPICE);
    expect(newHamburger.calculatePrice()).toEqual(95)
    expect(newHamburger.getSize() === Hamburger.SIZE_LARGE).toEqual(false)
})



test('Remove something', () => {
    const newHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
    newHamburger.addTopping(Hamburger.TOPPING_MAYO);
    newHamburger.addTopping(Hamburger.TOPPING_SPICE);
    expect(newHamburger.getToppings().length).toEqual(2)
    newHamburger.removeTopping(Hamburger.TOPPING_SPICE);
    expect(newHamburger.getToppings().length).toEqual(1);
})



test('Wrong arguments', () => {
    expect(() => new Hamburger( Hamburger.STUFFING_CHEESE, Hamburger.SIZE_SMALL)).toThrow();
    const newHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
    expect(() => newHamburger.addTopping(Hamburger.STUFFING_CHEESE)).toThrow();
    expect(() => newHamburger.removeTopping(Hamburger.STUFFING_CHEESE)).toThrow();
}
)