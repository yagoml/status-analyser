import Stock from './models/Stock'

export default {
  Query: {
    stocks: () => Stock.find(),
    stock: (_, { code }) => Stock.findById(code),
    goodStocks: async () => {
      const stocks = await Stock.find()
      return stocks.filter(data => {
        const {roe, netMargin, dbPl} = data
        return roe >= 10 && netMargin >= 10 && dbPl <= 0.5
      })
    }
  }
}

