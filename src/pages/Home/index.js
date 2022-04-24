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
  Typography,
} from "@mui/material";

import LogoComponent from "../../components/Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import { TabContext, TabList } from "@mui/lab";
import { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as aggregateByCategory from "../../utils/aggregateByCategory.js";

export default function Home() {
  const [value, setValue] = useState("1");
  const [currentListItem, setCurrentListItem] = useState(null);
  const [data, setData] = useState(null);
  const { pathname } = useLocation();
  const { token } = useAuth();

  useEffect(() => {
    if (pathname === "/home") {
      getTerms();
    } else if (pathname === "/teachers") {
      getTeachers();
    }
    // eslint-disable-next-line
  }, []);

  async function getTeachers() {
    try {
      const response = await api.getTeachers(token);
      setData(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function getTerms() {
    try {
      const response = await api.getTerms(token);
      setData(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleClick(item) {
    if (currentListItem === item) {
      setCurrentListItem(null);
    } else if (currentListItem === null) {
      setCurrentListItem(item);
    } else {
      setCurrentListItem(item);
    }
  }

  return (
    <>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <HomeRoot />

        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </TabContext>

        <List sx={{ width: "100%", maxWidth: 700 }}>
          {pathname === "/home" &&
            data?.map((d, index) => (
              <Terms
                key={d.id}
                {...d}
                currentListItem={currentListItem}
                index={index}
                handleClick={handleClick}
              />
            ))}

          {pathname === "/teachers" &&
            data?.map((d, index) => (
              <Teachers
                key={d.id}
                {...d}
                currentListItem={currentListItem}
                index={index}
                handleClick={handleClick}
              />
            ))}
        </List>
      </Container>
    </>
  );
}

function Teachers({
  handleClick,
  index,
  currentListItem,
  name,
  disciplineTeacher,
}) {
  const categories = aggregateByCategory.teachers(disciplineTeacher);

  return (
    <>
      <ListItemButton onClick={() => handleClick(index)}>
        <ListItemText primary={name} />
        {currentListItem === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentListItem === index} timeout="auto" unmountOnExit>
        <List component="div">
          {categories.map((category, index) => (
            <>
              <Typography variant="h5" component="h6">
                {category[0]}
              </Typography>
              {category[1].map((test, index) => (
                <Typography>
                  {`${test.name} - ${test.pdfUrl} (${test.disciplineName})`}
                </Typography>
              ))}
            </>
          ))}

          {categories.length === 0 && (
            <ListItemText primary="There are no tests!" />
          )}
        </List>
      </Collapse>
    </>
  );
}

function Terms({ handleClick, index, currentListItem, number, disciplines }) {
  const [currentDiscipline, setCurrentDiscipline] = useState(null);

  function changeDiscipline(item) {
    if (currentDiscipline === item) {
      setCurrentDiscipline(null);
    } else if (currentDiscipline === null) {
      setCurrentDiscipline(item);
    } else {
      setCurrentDiscipline(item);
    }
  }

  return (
    <>
      <ListItemButton onClick={() => handleClick(index)}>
        <ListItemText primary={number} />
        {currentListItem === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentListItem === index} timeout="auto" unmountOnExit>
        <List component="div">
          {disciplines.map((discipline, index) => (
            <Disciplines
              key={discipline.id}
              {...discipline}
              index={index}
              changeDiscipline={changeDiscipline}
              currentDiscipline={currentDiscipline}
            />
          ))}

          {disciplines.length === 0 && (
            <ListItemText primary="Não há disciplinas para este período" />
          )}
        </List>
      </Collapse>
    </>
  );
}

function Disciplines({
  changeDiscipline,
  currentDiscipline,
  index,
  name,
  classes,
}) {
  const tests = aggregateByCategory.terms(classes);

  return (
    <>
      <ListItemButton onClick={() => changeDiscipline(index)}>
        <ListItemText primary={name} />
        {currentDiscipline === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentDiscipline === index} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pl: 4, pr: 4 }}>
          {tests.map((test) => (
            <>
              <Typography variant="h5" component="h6">
                {test[0]}
              </Typography>
              {test[1].map((t) => (
                <Typography>
                  {`${t.name} - ${t.pdfUrl} (${t.teacher})`}
                </Typography>
              ))}
            </>
          ))}
          {tests.length === 0 && "não há nada aqui"}
        </List>
      </Collapse>
    </>
  );
}

function HomeRoot() {
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
    </>
  );
}
