import React from 'react'
import { cleanup } from '@testing-library/react'
import { render } from '../../../services/test-service'
import CreateItem from './index'

describe('Test Create Item component', () => {
  afterEach(cleanup)

  it('should render all controls', () => {
    const { getByPlaceholderText, getByLabelText, getByTestId } = render(
      <CreateItem />
    )
    const nameInput = getByPlaceholderText('createItem.inputs.name.placeholder')
    const descriptionInput = getByPlaceholderText(
      'createItem.inputs.description.placeholder'
    )
    const categorySelect = getByLabelText('createItem.inputs.category.label')
    const fileUploadIcon = getByTestId('file-upload-button')

    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(categorySelect).toBeInTheDocument()
    expect(fileUploadIcon).toBeInTheDocument()
  })

  it('should not handle createItem function when form is not filled', () => {
    const createItemMock = jest.fn()
    render(<CreateItem createItem={createItemMock} />)

    expect(createItemMock).not.toHaveBeenCalled()
  })
})
