import {
  Box,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  TextField,
} from "@mui/material";

import LogoComponent from "../../components/Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import { TabContext, TabList } from "@mui/lab";
import { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import api from "../../services/api";

export default function Home() {
  const array = ["p", "p2", "p3", "p4", "p5"];
  const [value, setValue] = useState("1");
  const [currentItem, setCurrentItem] = useState(null);
  const [data, setData] = useState(null);

  const handleClick = (item) => {
    if (currentItem === item) {
      setCurrentItem(null);
    } else if (currentItem === null) {
      setCurrentItem(item);
    } else {
      setCurrentItem(item);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const data = await api.teste();
      setData(data.data);
    } catch (error) {
      alert(error.response.data);
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="100%"
        sx={{
          //bgcolor: "red",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        //fixed
      >
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

          <LogoutIcon sx={{ fontSize: "35px" }} />
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
        <Box>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </TabContext>
        </Box>

        <List sx={{ width: "100%", maxWidth: 700 }}>
          {data.map((d, index) => (
            <ListItem
              {...d}
              currentItem={currentItem}
              index={index}
              handleClick={handleClick}
            />
          ))}
        </List>
        <Box></Box>
      </Container>
    </>
  );
}

function ListItem({ handleClick, index, currentItem, number, disciplines }) {
  return (
    <>
      <ListItemButton onClick={() => handleClick(index)}>
        <ListItemText primary={number} />
        {currentItem === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentItem === index} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}

