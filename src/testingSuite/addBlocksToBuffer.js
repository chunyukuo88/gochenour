import clipboard from 'clipboardy';

export function addBlocksToBuffer(userArgs){
  if (userArgs === 'ddd') {
    clipboard.writeSync(blocks.describeBlocks3Layers);
    console.log(`The following has been copied to your clipboard: ${blocks.describeBlocks3Layers}`);
  }
  if (userArgs === 'ddt') {
    clipboard.writeSync(blocks.describeBlocks2Test);
    console.log(`The following has been copied to your clipboard: ${blocks.describeBlocks2Test}`);
  }
}

export const blocks = {
  describeBlocks3Layers: "describe('', ()=>{\n\tdescribe('', ()=>{\n\t\tdescribe('', ()=>{\n\t\t\t//\n\t\t});\n\t});\n});",
  describeBlocks2Test: "describe('GIVEN: ', ()=>{\n\tdescribe('WHEN: ', ()=>{\n\t\ttest('THEN: ', ()=>{\n\t\t\t//\n\t\t});\n\t});\n});"
};

addBlocksToBuffer();