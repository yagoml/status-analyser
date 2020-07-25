import Stock from './models/Stock'

export default {
  Query: {
    stocks: () => Stock.find(),
    stock: (_, { code }) => Stock.findById(code),
    goodStocks: async () => {
      const stocks = await Stock.find()
      return stocks.filter(data => {
        const { roe, netMargin, dlPl, dailyLiquidity } = data
        return roe >= 15 && netMargin >= 15 && dlPl <= 0.5 && dailyLiquidity >= 100000000
      })
    }
  }
}

