import { Box, Divider, TextField } from "@mui/material";
import LogoComponent from "../../../components/Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation } from "react-router-dom";

export default function Header({ logout, setSearch, search }) {
  const { pathname } = useLocation();

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
          onClick={logout}
          sx={{ fontSize: "35px", cursor: "pointer" }}
        />
      </Box>
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
      <Divider
        sx={{ width: "100%", height: 2, mt: 4, mb: 4 }}
        variant="middle"
      />
    </>
  );
}
