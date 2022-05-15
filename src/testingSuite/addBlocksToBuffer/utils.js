export function buildCustomBlock(customFlag) {
  const numberOfDescribeBlocks = parseInt(customFlag.slice(1));
  let [topHalf, middle, bottomHalf] = buildStringComponents(
    numberOfDescribeBlocks
  );

  for (
    let i = 0, j = numberOfDescribeBlocks - 1;
    i < numberOfDescribeBlocks;
    i++, j--
  ) {
    const indent = buildIndent(i);
    topHalf = updateTopHalf(topHalf, indent);
    middle = updateMiddle(middle, numberOfDescribeBlocks, i);
    bottomHalf = updateBottomHalf(bottomHalf, j);
  }

  return topHalf + middle + bottomHalf;
}

function buildStringComponents(numberOfDescribeBlocks) {
  let topHalf = "\n";
  let middle =
    numberOfDescribeBlocks < 2 ? "  " : buildIndent(numberOfDescribeBlocks);
  let bottomHalf = buildIndent(numberOfDescribeBlocks - 1);
  return [topHalf, middle, bottomHalf];
}

function updateTopHalf(topHalf, indent) {
  topHalf += indent;
  topHalf += "describe('', () => {\n";
  return topHalf;
}

function updateMiddle(middle, numberOfDescribeBlocks, index) {
  if (index === numberOfDescribeBlocks - 1) {
    middle += "//\n";
  }
  return middle;
}

function updateBottomHalf(bottomHalf, index) {
  bottomHalf += "});\n";
  const bottomHalfIndent = buildIndent(index - 1);
  if (index > 1) bottomHalf += bottomHalfIndent;
  return bottomHalf;
}

function buildIndent(index) {
  const singleIndent = "  ";
  let totalIndent = "";
  for (let j = 0; j < index; j++) {
    totalIndent += singleIndent;
  }
  return totalIndent;
}
