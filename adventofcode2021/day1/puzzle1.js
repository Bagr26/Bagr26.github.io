import { Report } from "puzzle1.json";
var resultParagraph = document.getElementById("result1");

resultParagraph.textContent += "This just got added";

const reportArray = Report.split(" ")
let result = 0

let i = 1
while(i < (reportArray.length - 1)) {
  if (reportArray[i] > reportArray[i - 1]) { result++ }
  i++
}
