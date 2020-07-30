/** Good stocks references */ 
export default {
  roe:              (n) => n >= 10,
  netMargin:        (n) => n >= 10,
  dlPl:             (n) => n <= 0.5,
  highLiquidity:    (n) => n >= 100000000,
  mediumLiquidity:  (n) => n >= 50000000,
  lpa:              (n) => n >= 1,
  highDividends:    (n) => n >= 5,
  cagrProfits:      (n) => n >= 5,
  currentLiquidity: (n) => n >= 1,
  cheap: (price) => {
    const { minValue, maxValue, actualValue } = price
    const average = (minValue + maxValue) / 2
    return actualValue <= average
  },
  veryCheap: (price) => {
    const { minValue, maxValue, actualValue } = price
    const average = (minValue + maxValue) / 2
    const cheapRef = average - (average * 0.25)
    return actualValue <= cheapRef
  }
}