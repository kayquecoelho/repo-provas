import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../../../hooks/useSearch";
import useAuth from "../../../hooks/useAuth";

import { Box, Divider, TextField, Typography, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import LogoComponent from "../../../components/Logo";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({ setCurrentListItem, setData, hideInput }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const { search, setSearch } = useSearch();
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

      <Navigation setCurrentListItem={setCurrentListItem} setData={setData} />
    </>
  );
}

function Navigation({ setCurrentListItem, setData }) {
  const { setSearch } = useSearch();
  const { pathname } = useLocation();
  const [value, setValue] = useState(pathname);
  const navigate = useNavigate();

  function handleChange(event, newValue) {
    if (newValue === "/home") {
      navigate("/home");
    } else if (newValue === "/teachers") {
      navigate("/teachers");
    } else {
      navigate("/add");
    }

    if (pathname !== "/add") {
      setData([]);
      setSearch("");
      setCurrentListItem(null);
    }
    setValue(newValue);
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label="lab API tabs example">
        <Tab label="Disciplines" value="/home" />
        <Tab label="Instructor" value="/teachers" />
        <Tab label="Add" value="/add" />
      </TabList>
    </TabContext>
  );
}
