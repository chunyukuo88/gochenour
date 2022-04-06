import { it } from 'vitest';

// Destructured `debug` with other destructured functions around it:
it('', ()=>{
  function render(){
    return {
      component: 'something',
      debug: ()=>{},
      getByRole: ()=>{},
    };
  }

  const { component, debug, getByRole } = render(4);
});

