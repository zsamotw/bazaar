import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Controller } from 'react-hook-form'

export default ({ name, menuItems, control, inputLabel, error }) => (
  <FormControl
    variant="outlined"
    error={Boolean(error)}
    style={{ width: '100%', marginBottom: '20px' }}
  >
    <InputLabel htmlFor={name}>{inputLabel}</InputLabel>
    <Controller
      as={
        <Select>
          {menuItems.map(({ id, label }) => (
            <MenuItem key={id} value={id}>
              {label}
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
