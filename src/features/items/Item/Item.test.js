import React from 'react'
import { fireEvent, wait } from '@testing-library/react'
import { render, currentUser } from '../../../services/test-service'
import Item from './index'

const donorItem = {
  id: 'KlYH2A8gw3SFcjpqOxcY',
  name: 'rower',
  imgStoragePath: '',
  donor: currentUser,
  description: 'fajny',
  category: {
    id: 2,
    label: 'Motors'
  },
  createdAt:
    'Tue Dec 01 2020 14:28:20 GMT+0100 (Central European Standard Time)',
  imgURL: ''
}

const itemToTake = {
  id: 'KlYH2A8gw3SFcjpqOxcY',
  name: 'rower',
  imgStoragePath: '',
  description: 'fajny',
  donor: { displayName: 'donor', email: 'donor@donor.com' },
  category: {
    id: 2,
    label: 'Motors'
  },
  createdAt:
    'Tue Dec 01 2020 14:28:20 GMT+0100 (Central European Standard Time)',
  imgURL: ''
}

const itemWithNulls = {
  id: 'KlYH2A8gw3SFcjpqOxcY',
  name: null,
  imgStoragePath: '',
  donor: null,
  description: null,
  category: {
    id: 2,
    label: null
  },
  createdAt: null,
  imgURL: ''
}

describe('Item component tests', () => {
  it('Should render Item component with proper item data', () => {
    const { getByText } = render(<Item item={donorItem} />)
    const name = new RegExp(donorItem.name)
    const description = new RegExp(donorItem.description)
    const category = new RegExp(donorItem.category.label)
    const donorDisplayName = new RegExp(donorItem.donor.displayName)

    expect(getByText(name)).toBeInTheDocument()
    expect(getByText(description)).toBeInTheDocument()
    expect(getByText(category)).toBeInTheDocument()
    expect(getByText(donorDisplayName)).toBeInTheDocument()
  })

  it('should render remove button for donor', () => {
    const { getByTestId } = render(<Item item={donorItem} />)
    const button = getByTestId('removeIcon')
    expect(button).toBeInTheDocument()
  })

  it('should render take button for user which is not donor', () => {
    const { getByTestId } = render(<Item item={itemToTake} />)
    const button = getByTestId('confirmIcon')
    expect(button).toBeInTheDocument()
  })

  it('Should not render Item component with not proper item data', () => {
    const item = render(<Item item={itemWithNulls} />)
    expect(item.firstChild).toBeUndefined()
  })

  it('should dispatch state method when remove button has been clicked', () => {
    const { getByTestId, store } = render(<Item item={donorItem} />)
    store.dispatch = jest.fn()
    const button = getByTestId('removeIcon')
    fireEvent.click(button)
    const buttonToRemove = getByTestId('buttonToRemove')
    fireEvent.click(buttonToRemove)
    wait(() => {
      expect(store.dispatch).toHaveBeenCalled()
    })
  })
})
