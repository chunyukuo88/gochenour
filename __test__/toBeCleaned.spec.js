import { describe, test } from 'vitest';

function render(){
  return {
    debug: ()=>{},
    component: 'something',
    getByRole: ()=>{},
  };
}

//The [dot]only methods:
describe.only('', ()=>{
  describe.only('', ()=>{
    test.only('', ()=>{
      const { component, getByRole } = render(); // comment at the end of the line
    });
  });
});
//The [dot]skip methods:
describe.skip('GIVEN: ', ()=>{
  describe.skip('WHEN: ', ()=>{
    test.skip('THEN: ', ()=>{
      // comment at the end of the line
    });
  });
});