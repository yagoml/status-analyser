import CompanyData from './models/CompanyData'

export default {
  Query: {
    companiesData: () => CompanyData.find(),
    companyData: (_, { code }) => CompanyData.findById(code)
  }
}