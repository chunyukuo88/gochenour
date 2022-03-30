
/**
⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
⎪ Scenarios where `debug` should be deleted:  ⎪
⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
function render(){}
//0. Single destructured `debug`:
 render(1);
//==============================
//1. Single destructured `debug` followed by an invoked function:
 render(1);

//==============================
//2. Single destructured `debug` with indent:
 render(1);
//==============================
//3. Destructured `debug` with other destructured function before it:
const { component } = render(2);
//==============================
//4. Destructured `debug` with other destructured function after it:
const { component } = render(3);
//==============================
//5. Destructured `debug` with other destructured functions around it:
const { component, getByRole } = render(4);

//==============================
//6. An invoked "debug" with an argument given to it:

//==============================
//7. An invoked "debug" without an argument given to it:

//==============================
//8. An invoked "debug" without an argument given to it or a semicolon:


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
//11. Includes `describe`, `describe`, `test`, and `test`:
describe('GIVEN: Something', ()=>{
  describe('WHEN: Something else', ()=>{
    test('THEN: Something happens.', ()=>{
      //
    })
    test('AND: Something else happens.', ()=>{
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
