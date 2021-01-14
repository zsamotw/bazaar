import React from 'react'
import { cleanup } from '@testing-library/react'
import { render } from '../../../services/test-service'
import AddItem from './index'

describe('Test Add Item component', () => {
  afterEach(cleanup)

  it('should render all controls', () => {
    const { getByPlaceholderText, getByLabelText, getByTestId } = render(
      <AddItem />
    )
    const nameInput = getByPlaceholderText('addItem.inputs.name.placeholder')
    const descriptionInput = getByPlaceholderText(
      'addItem.inputs.description.placeholder'
    )
    const categorySelect = getByLabelText('addItem.inputs.category.label')
    const fileUploadIcon = getByTestId('file-upload-button')

    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(categorySelect).toBeInTheDocument()
    expect(fileUploadIcon).toBeInTheDocument()
  })

  it('should not handle addItem function when form is not filled', () => {
    const addItemMock = jest.fn()
    render(<AddItem addItem={addItemMock} />)

    expect(addItemMock).not.toHaveBeenCalled()
  })
})
