import { Box, Divider, TextField, Typography } from "@mui/material";
import LogoComponent from "../../../components/Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function Header({ setSearch, search, hideInput }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <>
      <Box
        sx={{
          mt: 4,
          mb: 4,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: 2,
        }}
      >
        <Box sx={{ maxWidth: "250px" }}>
          <LogoComponent />
        </Box>

        <LogoutIcon
          onClick={() => {
            logout();
            navigate("/");
          }}
          sx={{ fontSize: "35px", cursor: "pointer" }}
        />
        
      </Box>
      {!hideInput ? (
        <TextField
          fullWidth
          sx={{ maxWidth: "400px" }}
          label={
            pathname === "/home"
              ? "Search for discipline"
              : "Search for instructor"
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      ) : (
        <Typography component="h1" variant="h5">
          Add a test
        </Typography>
      )}
      <Divider
        sx={{ width: "100%", height: 2, mt: 4, mb: 4 }}
        variant="middle"
      />
    </>
  );
}
