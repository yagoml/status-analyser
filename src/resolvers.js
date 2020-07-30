import Stock from './models/Stock'

/** Good stocks references */ 
const refs = {
  roe:              (n) => n >= 15,
  netMargin:        (n) => n >= 10,
  dlPl:             (n) => n <= 0.5,
  highLiquidity:    (n) => n >= 100000000,
  mediumLiquidity:  (n) => n >= 50000000,
  lpa:              (n) => n >= 1,
  highDividends:    (n) => n >= 7,
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

const filterGoodStocks = (stocks) => {
  return stocks.filter(data => {
    const { roe, netMargin, dlPl, dailyLiquidity, lpa, cagrProfits, currentLiquidity } = data
    return (
      refs.roe(roe) &&
      refs.netMargin(netMargin) &&
      refs.dlPl(dlPl) &&
      refs.highLiquidity(dailyLiquidity) &&
      refs.lpa(lpa) &&
      refs.cagrProfits(cagrProfits) &&
      refs.currentLiquidity(currentLiquidity)
    )
  })
}

export default {
  Query: {
    stocks: () => Stock.find(),
    stock: (_, { code }) => Stock.findById(code),
    goodIndicators: async () => {
      const stocks = await Stock.find()
      return filterGoodStocks(stocks)
    },
    highDividends: async () => {
      const stocks = await Stock.find()
      return stocks.filter(data => {
        const { price, dailyLiquidity } = data
        return refs.highDividends(price.dividend) && refs.highLiquidity(dailyLiquidity)
      })
    },
    highLiquidity: async () => {
      const stocks = await Stock.find()
      return stocks.filter(data => {
        const { dailyLiquidity } = data
        return refs.highLiquidity(dailyLiquidity)
      })
    },
    cheap: async () => {
      const stocks = await Stock.find()
      return stocks.filter(data => {
        const { price, dailyLiquidity } = data
        refs.cheap(price) && refs.mediumLiquidity(dailyLiquidity)
      })
    },
    goodAndCheap: async () => {
      const stocks = await Stock.find()
      const filtered = filterGoodStocks(stocks)
      return filtered.filter(data => refs.cheap(data.price))
    }
  }
}

