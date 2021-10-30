// driver code

const inputsCollection = {
  test1: "10+10",
  test2: "10+10-10",
  test3: "10+10+10/10",
  test4: "-10*8",
  test5: "√4*8",
  test6: "√4*8*8*8",
  test7: "(10+10)/2*(88-8)", // not passed
  test8: "2²",
  test9: "-10--10",
  test10: "10+-10",
  test11: "10*-10",
  test12: "10/-10",
  test13: "√4/√4", 
  test14: "-10.0001+(10*18.2)",
  test15: "100+10%",
  test16: "10%*100",
};

function splitMyText(expression) {
  let operationArray = [];
  let convertMyTextToArray = expression.split("");
  for (let i = 0; i < convertMyTextToArray.length; i++) {
    //check whether the element and the next succeeding element will result a NaN
    if (
      isNaN(parseFloat(convertMyTextToArray[i])) &&
      isNaN(parseFloat(convertMyTextToArray[i + 1])) &&
      convertMyTextToArray[i] !== ")"
    ) {
      operationArray[i] = convertMyTextToArray[i];
    }
    // check the element from, between and to the element is in this pattern:
    // is NOT a NaN, is a Nan, is NOT a NaN
    // reason:
    // pass this if statement if the pattern is a number, then a operation BUT not a period, then a number 
    if (
      !isNaN(parseFloat(convertMyTextToArray[i - 1])) &&
      isNaN(parseFloat(convertMyTextToArray[i])) &&
      convertMyTextToArray[i] !== '.' &&
      !isNaN(parseFloat(convertMyTextToArray[i + 1]))
    ) {
      operationArray[i] = convertMyTextToArray[i];
    }
    // pass this if statement if the element of the array is √
    if (
      isNaN(parseFloat(convertMyTextToArray[i])) &&
      convertMyTextToArray[i] === "√"
    ) {
      operationArray[i] = convertMyTextToArray[i];
    }
    // check if the user has an input with closed and open parenthesis as an operator
    if (
      convertMyTextToArray[i] === ")" &&
      convertMyTextToArray[i + 1] === "("
    ) {
      operationArray[i] = "*";
    }
  }

  return operationArray;
}

Object.keys(inputsCollection).forEach((key) => {
  console.log(
    key + " :",
    inputsCollection[key],
    splitMyText(inputsCollection[key])
  );
});
// console.log(inputsCollection.test1);
// console.log(splitMyText(inputsCollection.test9));
