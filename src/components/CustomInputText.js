import React from 'react';
import {Input} from 'react-native-elements';
export default function CustomInputText(props) {
  return (
    <Input
      value={props.form && props.name && `${props.form.values[props.name]}`}
      errorMessage={
        props.form &&
        props.name &&
        props.form.touched[props.name] &&
        props.form.errors[props.name]
      }
      onChangeText={
        props.form && props.name && props.form.handleChange(props.name)
      }
      onBlur={props.form && props.name && props.form.handleBlur(props.name)}
      {...props}
    />
  );
}
