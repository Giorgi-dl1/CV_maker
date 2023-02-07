export const formatNumber = (str: string) => {
  let number = str
  if (number.length === 13) {
    number = `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(
      7,
      9,
    )} ${number.slice(9, 11)} ${number.slice(11)}`
  }
  return number
}
