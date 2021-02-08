import AccountProfile from '../../account/AccountProfile'
import * as ROUTES from '../../../constants/routes'
import MainPage from '../MainPage'
import CreateItem from '../CreateItem'
import TransactionsTabs from '../Transactions'
import ItemsContainer from '../ItemsContainer'

const routes = path => [
  {
    path,
    exact: true,
    component: MainPage
  },
  {
    path: `${path}${ROUTES.ACCOUNT}`,
    exact: false,
    component: AccountProfile
  },
  {
    path: `${path}${ROUTES.ITEMS}${ROUTES.CREATE_ITEM}`,
    exact: false,
    component: CreateItem
  },
  {
    path: `${path}${ROUTES.ITEMS}${ROUTES.TRANSACTIONS}`,
    exact: false,
    component: TransactionsTabs
  },
  {
    path: `${path}${ROUTES.ITEMS}`,
    exact: false,
    component: ItemsContainer
  },
  {
    path,
    exact: false,
    component: MainPage
  }
]

export default routes
