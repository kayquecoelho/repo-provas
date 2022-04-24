import { Box, Divider, TextField } from "@mui/material";
import LogoComponent from "../../../components/Logo";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({ logout }) {
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
        label="Pesquise por disciplina"
      />
      <Divider
        sx={{ width: "100%", height: 2, mt: 4, mb: 4 }}
        variant="middle"
      />
    </>
  );
}
