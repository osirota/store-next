import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';



const Field = (props: any) => {
  const [field, { error, touched }] = useField(props);

  return (
    <TextField 
      error={!!(touched && error)}
      helperText={touched && error}
      fullWidth
      {...field}
      value={field.value || ''}
      {...props}
    />
  )
}

export default Field;
