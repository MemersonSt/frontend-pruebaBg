import { styled, TextField } from "@mui/material";

const InputTextFieldRequired = styled(TextField)(({ theme }) => ({
  ".MuiFormLabel-root": {
    "-webkitTextFillColor": theme.palette.error.main,
  },
}));

const InputNumberFieldRequired = styled(TextField)(({ theme }) => ({
  ".MuiFormLabel-root": {
    "-webkitTextFillColor": theme.palette.error.main,
  },
  ".MuiInputBase-input": {
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      display: "none",
    },
  },
}));

const InputTextField = styled(TextField)(() => ({
  ".MuiFormLabel-root": {
    "-webkitTextFillColor": "#000",
  },
}));

const InputNumberField = styled(TextField)(() => ({
  ".MuiFormLabel-root": {
    "-webkitTextFillColor": "#000",
  },
  ".MuiInputBase-input": {
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      display: "none",
    },
  },
}));

export {
  InputTextField,
  InputTextFieldRequired,
  InputNumberField,
  InputNumberFieldRequired,
};
