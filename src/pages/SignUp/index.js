import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import LogoComponent from "../../components/Logo";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import Button from "../../components/LoadingButton";
import GithubButton from "../../components/GithubButton";
import Footer from "../../components/Footer";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorFeedback, setErrorFeedback] = useState({
    error: false,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
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

    if (formData.confirmPassword !== formData.password) {
      return setErrorFeedback({
        error: true,
        message: "As senhas não coincidem",
      });
    }

    setErrorFeedback({ error: "", message: "" });
    setIsLoading(true);
    const { email, password } = formData;

    try {
      await api.signUp({ email, password });

      navigate("/");
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
        marginBottom: 4,
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
          Sign up
        </Typography>

        <GithubButton isLoading={isLoading} />

        <Divider sx={{ width: "100%" }} variant="fullWidth">
          OU
        </Divider>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          autoComplete="off"
        >
          <EmailInput
            id="email"
            label="Email Address"
            isLoading={isLoading}
            handleChange={handleChange}
            value={formData.email}
          />

          <PasswordInput
            id="password"
            label="Password"
            value={formData.password}
            handleChange={handleChange}
            errorFeedback={errorFeedback}
            isLoading={isLoading}
          />

          <PasswordInput
            id="confirm-password"
            label="Confirm Password"
            value={formData.confirmPassword}
            handleChange={handleChange}
            errorFeedback={errorFeedback}
            isLoading={isLoading}
          />

          <Button isLoading={isLoading}>Sign Up</Button>

          <Footer link={"/"}>Already have an account? Sign in</Footer>
        </Box>
      </Box>
    </Container>
  );
}
