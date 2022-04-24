import { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Divider from '@mui/material/Divider';
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import LogoComponent from "../../components/Logo";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAndPersistToken } = useAuth();
  const localToken = localStorage.getItem("token");

  useEffect(() => {
    if (localToken) {
      navigate("/home");
    }
  }, [localToken, navigate]);

  function handleChange(prop, event) {
    setFormData({ ...formData, [prop]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.login(formData);
      setAndPersistToken(response.data.token);
      navigate("/home");     
    } catch (error) {
      alert(error.response.data);
    }
    setIsLoading(false);
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <LogoComponent />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "rgb(25, 118, 210)" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <LoadingButton
          fullWidth
          sx={{ mt: 3, mb: 2, bgcolor: "#424445" }}
          variant="contained"
          startIcon={<GitHubIcon />}
        >
          Login with GitHub
        </LoadingButton>
        
        <Divider variant="fullWidth">OU</Divider>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          autoComplete="off"
        >
          <TextField
            margin="normal"
            required
            disabled={isLoading}
            fullWidth
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event)}
            label="Email Address"
            autoComplete="disabled"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            disabled={isLoading}
            fullWidth
            id="password"
            value={formData.password}
            type={showPassword ? "text" : "password"}
            onChange={(event) => handleChange("password", event)}
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
            label="Password"
          />
          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container justifyContent="center">
            <Grid item>
              <StyledLink to={"/auth/sign-up"}>
                {"Don't have an account? Sign Up"}
              </StyledLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const StyledLink = styled(Link)`
  color: rgb(25, 118, 210);
`
