import React, { useState, useEffect } from 'react';
import { useFormikContext, FormikProps } from 'formik';
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

interface FormikValues {
  city: string;
}

const WarehousesAutoComplete = () => {
  const {
    setFieldValue,
    values,
  }: FormikProps<FormikValues> = useFormikContext();
  const [cities, setCities] = useState([]);

  const handleSelect = async (_: any, value: any) => {
    if (value && value.length >= 3) {
      setFieldValue('warehouses', value);
    }
  };
  const fetchList = async () => {
    try {
      const [city] = values.city.split('-');
      const body = JSON.stringify({
        city,
      });
      const response = await fetch('/api/warehouses', {
        method: 'POST',
        body,
      });
      const {
        data: { data },
      } = await response.json();
      setCities(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (values.city.length > 3) {
      fetchList();
    }
  }, [values.city]);

  const renderOptions = (options: any) =>
    options.map(
      (option: { DescriptionRu: any; AreaDescriptionRu: any }) =>
        `${option.DescriptionRu}`
    );

  const renderInput = (params: { InputProps: any }) => (
    <Field
      {...params}
      name="warehouses"
      label="Отделение Новой почты"
      InputProps={{
        ...params.InputProps,
        placeholder: 'Введите отделение новой почты',
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

export default WarehousesAutoComplete;
