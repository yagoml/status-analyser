import Stock from './models/Stock'
import refs from './stocks-refs'

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
      const filtered = stocks.filter(data => refs.highDividends(data.price.dividend))
      return filtered.sort((a, b) => {
        if (a.price.dividend > b.price.dividend) return -1
        if (a.price.dividend < b.price.dividend) return 1
        if (a.price.dividend === b.price.dividend) return 0
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

