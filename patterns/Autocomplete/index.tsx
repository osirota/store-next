import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Field from 'patterns/Field';

const AutocompleteWithStyles = withStyles({
  root: {
    width: '100%',
  },
  groupLabel: {
    backgroundColor: 'transparent',
    position: 'initial',
  },
  groupUl: {
    padding: '0 1rem',
  },
  inputRoot: {
    cursor: 'pointer',
  },
  input: {
    cursor: 'pointer',
  },
})(Autocomplete);

const CitiesAutoComplete = () => {
  const { setFieldValue } = useFormikContext();
  const [cities, setCities] = useState([]);

  const handleSelect = async (_: any, autocompleteValue: any) => {
    if (autocompleteValue) {
      const response = await fetch('/api/cities', {
        method: 'POST',
      }).then((res) => res.json());
      setCities(response);
      setFieldValue('city', autocompleteValue);
    }
  };

  const renderInput = (params: { InputProps: any }) => (
    <Field
      {...params}
      name="city"
      label="Device"
      InputProps={{
        ...params.InputProps,
        placeholder: 'Город',
      }}
      onBlur={null}
      onChange={null}
      fullWidth
    />
  );

  return (
    <AutocompleteWithStyles
      onChange={handleSelect}
      options={cities}
      renderInput={renderInput}
      blurOnSelect
      clearOnEscape
      filterSelectedOptions
    />
  );
};

export default CitiesAutoComplete;
