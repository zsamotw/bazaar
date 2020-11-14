import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Controller } from 'react-hook-form'

export default ({ name, menuItems, control, label, error }) => (
  <FormControl
    variant="outlined"
    error={Boolean(error)}
    style={{ width: '100%', marginBottom: '20px' }}
  >
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Controller
      as={
        <Select>
          {menuItems.map(({ id, value }) => (
            <MenuItem key={id} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      }
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: 'Required' }}
    />
  </FormControl>
)
