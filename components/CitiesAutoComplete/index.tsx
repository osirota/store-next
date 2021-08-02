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

const DeviceAutocomplete = () => {
  const { setFieldValue } = useFormikContext();
  const [cities, setCities] = useState([]);

  const handleSelect = async (_: any, value: any) => {
    if (value && value.length >= 3) {
      const body = JSON.stringify({
        city: value,
      });
      const response = await fetch('/api/cities', {
        method: 'POST',
        body,
      });
      const {
        data: { data },
      } = await response.json();
      setCities(data);
      setFieldValue('city', value);
    }
  };

  const renderOptions = (options: any) =>
    options.map(
      (option: { DescriptionRu: any; AreaDescriptionRu: any }) =>
        `${option.DescriptionRu} - ${option.AreaDescriptionRu}`
    );

  const renderInput = (params: { InputProps: any }) => (
    <Field
      {...params}
      name="city"
      label="Город"
      InputProps={{
        ...params.InputProps,
        placeholder: 'Введите название города',
      }}
      onBlur={null}
      onChange={null}
      fullWidth
    />
  );

  return (
    <AutocompleteWithStyles
      onInputChange={handleSelect}
      options={renderOptions(cities)}
      renderInput={renderInput}
      blurOnSelect
      clearOnEscape
      filterSelectedOptions
      freeSolo
    />
  );
};

export default DeviceAutocomplete;
