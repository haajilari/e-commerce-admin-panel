// src/components/molecules/formControls/FormikSelectField.tsx
import React from 'react'
import { useField, type FieldHookConfig } from 'formik'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

interface Option {
  value: string | number
  label: string
}

type FormikSelectFieldProps = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'helperText' | 'select' | 'children'
> &
  FieldHookConfig<string | number> & {
    // Value can be string or number
    options: Option[]
  }

const FormikSelectField: React.FC<FormikSelectFieldProps> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <TextField
      {...field}
      select
      label={label}
      fullWidth
      margin="normal"
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : props.helperText || ' '}
      {...props} // Spreads other TextFieldProps like 'required'
    >
      {options.map((option: { value: string | number; label: string }) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default FormikSelectField
