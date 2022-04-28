import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";

import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GithubButton from "../../components/GithubButton";
import Divider from "@mui/material/Divider";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import LogoComponent from "../../components/Logo";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import Button from "../../components/LoadingButton";
import Footer from "../../components/Footer";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
            errorFeedback={{ error: false, message: "" }}
            isLoading={isLoading}
          />

          <Button isLoading={isLoading}>Sign In</Button>

          <Footer link={"/auth/sign-up"}>Don't have an account? Sign Up</Footer>
        </Box>
      </Box>
    </Container>
  );
}
