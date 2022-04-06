import { describe, test, it, vi } from 'vitest';

/**
 ⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
 ⎪ Scenarios where `debug` should be deleted:  ⎪
 ⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
function render(){
  return {
    debug: ()=>{},
    component: 'something',
    getByRole: ()=>{},
  };
}
//0. Single destructured `debug`. No indents:
it('', ()=>{
  const { debug } = render(1);
});

//==============================
//1. Single destructured `debug` followed by an invoked function. No indents:
it('', ()=> {
  const { debug } = render(1);
  debug()
});

//==============================
//2. Single destructured `debug` with indent:
it('', ()=> {
  const { debug } = render(1);
});

//==============================
//3. Destructured `debug` with other destructured function before it:
it('', ()=> {
  const { component, debug } = render(2);
});

//==============================
//4. Destructured `debug` with other destructured function after it:
it('', ()=> {
  const { debug, component } = render(2);
});

//==============================
//5. Destructured `debug` with other destructured functions around it:
it('', ()=> {
  const { getByRole, debug, component } = render(2);
});

//==============================
//6. An invoked "debug" with an argument given to it:
it('', ()=> {
  const Subcomponent = document.querySelector('.something');
  debug(Subcomponent);
});

//==============================
//7. An invoked "debug" without an argument given to it:
it('', ()=> {
  debug();
});

//==============================
//8. An invoked "debug" without an argument given to it or a semicolon:
it('', ()=> {
  debug()
});

/**
 ⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
 ⎪ Scenarios where `debug` should NOT be deleted: ⎪
 ⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
//9. Just the word "debug" alone, which should not be deleted:
it('', ()=> {
  function debug(){}
  debug
});
//==============================
//10. Where "debug" appears as part of some variable, which should not be deleted:
it('', ()=> {

  const debugSomething = vi.fn();
  debugSomething();
});
/**
 ⌌一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌍
 ⎪ Scenarios where `only()` and `skip()` methods SHOULD be deleted:  ⎪
 ⌎一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一⌏
 */
//11. Includes `describe`, `describe`, `test`, and `test`:
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
const someObject = { only: vi.fn(), skip: vi.fn() };
const result = someObject.only('data');
const output = someObject.skip('something');
