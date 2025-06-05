// src/components/molecules/formControls/FormikSwitchField.tsx
import React from 'react'
import { useField, type FieldHookConfig } from 'formik'
import Switch, { type SwitchProps } from '@mui/material/Switch'
import FormControlLabel, { type FormControlLabelProps } from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

type FormikSwitchFieldProps = Omit<SwitchProps, 'name' | 'value' | 'checked' | 'onChange'> &
  FieldHookConfig<boolean> & {
    // Value is boolean
    label: React.ReactNode // Label for FormControlLabel
    formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>
  }

const FormikSwitchField: React.FC<FormikSwitchFieldProps> = ({
  label,
  formControlLabelProps,
  ...props // Contains 'name' for useField
}) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' }) // useField for type="checkbox" expects boolean

  return (
    <FormControl error={meta.touched && Boolean(meta.error)} fullWidth margin="normal">
      <FormControlLabel
        control={
          <Switch
            {...field}
            checked={field.value} // field.value should be boolean
            // onChange is handled by field
            color="primary" // Or make this a prop
          />
        }
        label={label}
        {...formControlLabelProps}
      />
      {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  )
}

export default FormikSwitchField
