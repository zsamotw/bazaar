import React from 'react'
import { cleanup } from '@testing-library/react'
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

describe('Item component tests', () => {
  afterEach(cleanup)
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

  it('Should not render Item component with not proper item data: id as null', () => {
    const itemWithNullName = {
      id: null,
      name: 'name',
      imgStoragePath: '',
      donor: {},
      description: 'description',
      category: {
        id: 2,
        label: 'label'
      },
      createdAt: new Date(),
      imgURL: ''
    }
    const Wrapper = () => (
      <div>
        <Item item={itemWithNullName} />
      </div>
    )
    const wrapper = render(<Wrapper />)
    expect(wrapper.queryByText(itemWithNullName.name)).toBeNull()
  })

  it('Should not render Item component with not proper item data: donor as undefined', () => {
    const itemWithNullName = {
      id: '1234',
      name: 'name',
      imgStoragePath: '',
      donor: undefined,
      description: 'description',
      category: {
        id: 2,
        label: 'label'
      },
      createdAt: new Date(),
      imgURL: ''
    }
    const Wrapper = () => (
      <div>
        <Item item={itemWithNullName} />
      </div>
    )

    const wrapper = render(<Wrapper />)
    expect(wrapper.queryByText(itemWithNullName.name)).toBeNull()
  })

  it('Should not render Item component with not proper item data: donor email as undefined', () => {
    const itemWithNullName = {
      id: '1234',
      name: 'name',
      imgStoragePath: '',
      donor: {},
      description: 'description',
      category: {
        id: 2,
        label: 'label'
      },
      createdAt: new Date(),
      imgURL: ''
    }
    const Wrapper = () => (
      <div>
        <Item item={itemWithNullName} data-testid="item" />
      </div>
    )
    const wrapper = render(<Wrapper />)
    expect(wrapper.queryByTestId('item')).toBeNull()
  })

  it('Should not render Item component with not proper item data: description as undefined', () => {
    const itemWithNullName = {
      id: '1234',
      name: 'name',
      imgStoragePath: '',
      donor: { email: 'email' },
      category: {
        id: 2,
        label: 'label'
      },
      createdAt: new Date(),
      imgURL: ''
    }
    const Wrapper = () => (
      <div>
        <Item item={itemWithNullName} data-testid="item" />
      </div>
    )
    const wrapper = render(<Wrapper />)
    expect(wrapper.queryByTestId('item')).toBeNull()
  })

  it('Should not render Item component with not proper item data: category as null', () => {
    const itemWithNullName = {
      id: '1234',
      name: 'name',
      imgStoragePath: '',
      donor: { email: 'email' },
      description: 'description',
      createdAt: new Date(),
      imgURL: ''
    }
    const Wrapper = () => (
      <div>
        <Item item={itemWithNullName} data-testid="item" />
      </div>
    )
    const wrapper = render(<Wrapper />)
    expect(wrapper.queryByTestId('item')).toBeNull()
  })
})
