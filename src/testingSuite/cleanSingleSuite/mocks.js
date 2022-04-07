export const mocks = {
  FILE_DATA_ARRAY: [
    `test.skip('', ()=>{`,
    `  const { debug } = render(Something)// this is a comment`,
    `});`,
  ],
  ORIGINAL_DOC: `test('It renders something', ()=>{\nconst { debug } = render(Component);\n});`,
  UPDATED_DOC: `test('It renders something', ()=>{\n render(Component);\n});`
};