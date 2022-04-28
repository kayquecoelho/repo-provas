import { TextField } from "@mui/material";

export default function EmailInput({
  isLoading,
  value,
  handleChange,
  label,
  id,
}) {
  return (
    <TextField
      id={id}
      margin="normal"
      required
      disabled={isLoading}
      fullWidth
      value={value}
      onChange={(event) => handleChange("email", event)}
      label={label}
      autoComplete="disabled"
      autoFocus
    />
  );
}
