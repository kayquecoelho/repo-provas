import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

import { Container, CssBaseline, List, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import Terms from "./Terms";
import Teachers from "./Teacher";
import Header from "./Header";

export default function Home() {
  const [currentListItem, setCurrentListItem] = useState(null);
  const [data, setData] = useState([]);
  const { pathname } = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }

    if (pathname === "/home") {
      getItems('terms');
    } else if (pathname === "/teachers") {
      getItems('teachers');
    }
    // eslint-disable-next-line
  }, [pathname]);
 
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (data[0]?.disciplineTeacher && pathname === "/home") return null;
  if (data[0]?.disciplines && pathname === "/teachers") return null;

  async function getItems(type) {
    let response;
    try {
      if (type === 'teachers') {
        response = await api.getTeachers(token);
      } else {
        response = await api.getTerms(token);
      }
      setData(response.data);
    } catch (error) {
      alert(error.response.data);
      if (error.response.status === 401) {
        logout();
      }
    }
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
        <Header logout={logout} />

        <Navigation setData={setData} />

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

function Navigation({ setData }) {
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
    setValue(newValue);
    setData([]);
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
