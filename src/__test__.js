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
const { debug, garbage } = render(2);
//==============================
//4. Destructured `debug` with other destructured function after it:
const { garbage, debug } = render(3);
//==============================
//5. Destructured `debug` with other destructured functions around it:
const { garbage, debug, trash } = render(4);
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