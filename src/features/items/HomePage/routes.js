import AccountProfile from '../../account/AccountProfile'
import * as ROUTES from '../../../constants/routes'
import MainPage from '../MainPage'
import AddItem from '../AddItem'
import ItemsList from '../ItemsList'
import TransactionsTabs from '../Transactions'

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
    path: `${path}${ROUTES.ADD_ITEM}`,
    exact: false,
    component: AddItem
  },
  {
    path: `${path}${ROUTES.ITEMS}`,
    exact: false,
    component: ItemsList
  },
  {
    path: `${path}${ROUTES.TRANSACTIONS}`,
    exact: false,
    component: TransactionsTabs
  },
  {
    path,
    exact: false,
    component: MainPage
  }
]

export default routes
