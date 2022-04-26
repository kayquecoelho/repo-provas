import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function PasswordInput({
  errorFeedback,
  isLoading,
  value,
  handleChange,
  label,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const name = label === "Password" ? 'password': 'confirmPassword';
  return (
    <TextField
      error={errorFeedback.error}
      helperText={errorFeedback.message}
      margin="normal"
      required
      disabled={isLoading}
      fullWidth
      id="confirm-password"
      value={value}
      type={showPassword ? "text" : "password"}
      onChange={(event) => handleChange(name, event)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      label={label}
    />
  );
}
