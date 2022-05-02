import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

import { Container, CssBaseline, List } from "@mui/material";
import Terms from "./Terms";
import Teachers from "./Teacher";
import Header from "./Header";
import useSearch from "../../hooks/useSearch";
import sweetAlertService from "../../services/sweetAlertService";

export default function Home() {
  const [currentListItem, setCurrentListItem] = useState(null);
  const [data, setData] = useState([]);
  const { search } = useSearch();
  const { pathname } = useLocation();
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }

    if (pathname === "/home") {
      getTests("terms");
    } else if (pathname === "/teachers") {
      getTests("teachers");
    }

    setCurrentListItem(null);
    // eslint-disable-next-line
  }, [pathname]);

  if (data[0]?.disciplineTeacher && pathname === "/home") return null;
  if (data[0]?.disciplines && pathname === "/teachers") return null;

  async function getTests(groupedBy) {
    let response;
    try {
      if (groupedBy === "teachers") {
        response = await api.getTests(token, "teachers");
      } else {
        response = await api.getTests(token, "terms");
      }
      setData(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        sweetAlertService.fireAlert("Your session expired!");
        logout();
        navigate("/");
      } else {
        sweetAlertService.fireFail("Something went wrong! Try it out later!");
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

  function filterTeacherBySearch(teacher) {
    return teacher.name.toLowerCase().includes(search.toLowerCase());
  }

  function filterDisciplineBySearch(term) {
    if (search.length === 0) return term;

    const disciplines = term.disciplines;
    const filtered = disciplines.filter((discipline) =>
      discipline.name.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.length !== 0;
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
        <Header setCurrentListItem={setCurrentListItem} setData={setData} />

        <List sx={{ width: "100%", maxWidth: 700 }}>
          {pathname === "/home" &&
            data
              ?.filter(filterDisciplineBySearch)
              .map((d, index) => (
                <Terms
                  key={d.id}
                  {...d}
                  currentListItem={currentListItem}
                  index={index}
                  handleClick={handleClick}
                  search={search}
                />
              ))}

          {pathname === "/teachers" &&
            data
              ?.filter(filterTeacherBySearch)
              .map((instructor, index) => (
                <Teachers
                  key={instructor.id}
                  {...instructor}
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
