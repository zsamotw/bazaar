import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { render, currentUser } from '../../../services/test-service'
import Dialogs from './Dialogs'

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

describe('Test Dialog component', () => {
  afterEach(cleanup)
  it('should handle remove method when remove button has been clicked', () => {
    const handleRemoveItem = jest.fn()
    const { getByTestId } = render(
      <Dialogs
        item={donorItem}
        handleRemoveItem={handleRemoveItem}
        openRemoveDialog
        openConfirmDialog={false}
      />
    )

    const buttonToRemove = getByTestId('buttonToRemove')
    expect(buttonToRemove).toBeInTheDocument()
    fireEvent.click(buttonToRemove)

    expect(handleRemoveItem).toHaveBeenCalled()
  })

  it('should handle set recipient method when confirmation button has been clicked', () => {
    const handleSetRecipient = jest.fn()
    const { getByTestId } = render(
      <Dialogs
        item={donorItem}
        handleSetRecipient={handleSetRecipient}
        openConfirmDialog
        openRemoveDialog={false}
      />
    )

    const buttonToConfirm = getByTestId('buttonToConfirm')
    expect(buttonToConfirm).toBeInTheDocument()
    fireEvent.click(buttonToConfirm)

    expect(handleSetRecipient).toHaveBeenCalled()
  })
})
