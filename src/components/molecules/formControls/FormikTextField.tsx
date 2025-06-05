// src/components/molecules/formControls/FormikTextField.tsx
import React from 'react'
import { useField, type FieldHookConfig } from 'formik'
import TextField, { type TextFieldProps } from '@mui/material/TextField'

// Combine Formik's FieldHookConfig with MUI's TextFieldProps,
// but make 'name' required from FieldHookConfig and omit conflicting props from TextFieldProps.
type FormikTextFieldProps = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'helperText'
> &
  FieldHookConfig<string> // Assuming the field value is string

const FormikTextField: React.FC<FormikTextFieldProps> = ({ label, type = 'text', ...props }) => {
  const [field, meta] = useField(props) // 'props' here includes 'name'

  return (
    <TextField
      {...field} // Spreads name, value, onChange, onBlur
      type={type}
      label={label}
      fullWidth
      margin="normal" // You can make this a prop if needed
      variant="outlined" // Or make this a prop
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error ? meta.error : props.helperText || ' '} // Provide default empty space for layout consistency
      {...props} // Spreads any other TextFieldProps like 'multiline', 'rows', 'InputProps', etc.
    />
  )
}

export default FormikTextField
