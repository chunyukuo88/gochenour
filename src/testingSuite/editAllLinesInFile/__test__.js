
/**
⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
⎪ Scenarios where `debug` should be deleted:  ⎪
⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
function render(){}
//0. Single destructured `debug`:
const { debug } = render(1);
//==============================
//1. Single destructured `debug` followed by an invoked function:
const { debug } = render(1);
debug();
//==============================
//2. Single destructured `debug` with indent:
  const { debug } = render(1);
//==============================
//3. Destructured `debug` with other destructured function before it:
const { debug, component } = render(2);
//==============================
//4. Destructured `debug` with other destructured function after it:
const { component, debug } = render(3);
//==============================
//5. Destructured `debug` with other destructured functions around it:
const { component, debug, getByRole } = render(4);
debug();
//==============================
//6. An invoked "debug" with an argument given to it:
debug('something');
//==============================
//7. An invoked "debug" without an argument given to it:
debug();
//==============================
//8. An invoked "debug" without an argument given to it or a semicolon:
debug()

/**
 ⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
 ⎪ Scenarios where `debug` should NOT be deleted: ⎪
 ⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
//9. Just the word "debug" alone, which should not be deleted:
debug
//==============================
//10. Where "debug" appears as part of some variable, which should not be deleted:
const debugSomething = jest.fn();
debugSomething();
/**
 ⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
 ⎪ Scenarios where `only()` and `skip()` methods should be deleted:  ⎪
 ⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
//11. Includes `describe.skip`, `describe.only`, `test.skip`, and `test.only`:
describe.only('GIVEN: Something', ()=>{
  describe.skip('WHEN: Something else', ()=>{
    test.only('THEN: Something happens.', ()=>{
      //
    })
    test.skip('AND: Something else happens.', ()=>{
      //
    })
  });
});

/**
 ⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
 ⎪ Scenarios where `only()` and `skip()` methods should NOT be deleted:   ⎪
 ⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
const someObject = { only: jest.fn(), skip: jest.fn() };
const result = someObject.only('data');
const output = someObject.skip('something');
