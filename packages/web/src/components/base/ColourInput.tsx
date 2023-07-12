import React from 'react'
import { MuiColorInput } from 'mui-color-input';

export type ColourInputProps = {
  value:string,
  setValue: Function
};

export default function ColourInput(props: ColourInputProps) {
  const {
    value, setValue
  } = props;
  const handleChange = (newValue:string) => {
    setValue(newValue)
  }

  return <MuiColorInput value={value} onChange={handleChange} />
}
