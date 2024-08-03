function getHundreds(number: number) {
  return Math.floor(number / 100) * 100;
}
function removeHundreds(number: number): number {
  return number % 100;
}
function calculateProgress(currentValue: number, totalValue: number) {
  return Math.round((currentValue / totalValue) * 100);
}

export { getHundreds, removeHundreds, calculateProgress };
