import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import { Controller } from 'react-hook-form'

export default ({
  id,
  labelId,
  name,
  menuItems,
  control,
  inputLabel,
  error
}) => (
  <FormControl error={error} style={{ width: '100%'}}>
    <Controller
      as={
        <>
          <InputLabel id={labelId}>{inputLabel}</InputLabel>
          <Select labelId={labelId} id={id}>
            {menuItems.map(({ id: menuItemId, label }) => (
              <MenuItem key={menuItemId} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </>
      }
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: 'Required' }}
    />
    {error && <FormHelperText>{error.message}</FormHelperText>}
  </FormControl>
)
