import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../Home/Header";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

export default function AddTests() {
  const { token } = useAuth();

  const [testData, setTestData] = useState({
    title: "",
    pdfUrl: "",
    category: null,
    discipline: null,
    instructor: null,
  });
  const [categories, setCategories] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    if (!categories.length && !disciplines.length){
      getCategoriesAndDisciplines();
    }

    if (testData.discipline){
      getTeachers();
    }

    //eslint-disable-next-line
  }, [testData, categories, disciplines])

  async function getCategoriesAndDisciplines(){
    try {
      const categories = await api.getCategories(token);
      const disciplines = await api.getDisciplines(token);

      setCategories(categories.data);
      setDisciplines(disciplines.data);
    } catch (error) {
      alert(error.response.data); 
    }
  }

  async function getTeachers() {
    try {
      const instructors = await api.getInstructors(token, testData.discipline.id);
      setInstructors(instructors.data);
    } catch (error) {
      alert(error.response.data);
    }
  }

  function handleChange(event, name, newValue) {
    if (name) {
      return setTestData({ ...testData, [name]: newValue });
    }
    setTestData({ ...testData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: testData.title,
      pdfUrl: testData.pdfUrl,
      categoryId: testData.category.id,
      disciplineId: testData.discipline.id,
      teacherId: testData.instructor.id
    }

    try {
      await api.createTest(token, data);
    } catch (error) {
      alert(error.response.data);
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
        <Header hideInput={true} />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 4,
            mb: 4,
            maxWidth: 700,
          }}
        >
          <Input
            label={"Test title"}
            value={testData.title}
            handleChange={handleChange}
            name="title"
          />
          <Input
            label="Test PDF"
            value={testData.pdfUrl}
            handleChange={handleChange}
            name="pdfUrl"
          />
          <AutocompleteComponent
            label="Categories"
            testData={testData}
            handleChange={handleChange}
            name="category"
            value={testData.category}
            options={categories}
          />
          <AutocompleteComponent
            label="Discipline"
            testData={testData}
            handleChange={handleChange}
            name="discipline"
            value={testData.discipline}
            options={disciplines}
          />
          <AutocompleteComponent
            label="Instructor"
            testData={testData}
            handleChange={handleChange}
            name="instructor"
            value={testData.instructor}
            options={instructors}
          />

          <LoadingButton type="submit" variant="contained" fullWidth>
            Send
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
}

function Input({ label, value, handleChange, name }) {
  return (
    <TextField
      required
      name={name}
      margin="normal"
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
    />
  );
}

function AutocompleteComponent({ label, testData, handleChange, name, value, options }) {
  const mappedOptions = options.map(option => ({label: option.name, id: option.id}));

  return (
    <Autocomplete
      disablePortal
      value={value}
      loading={true}
      disabled={name === "instructor" && !testData.discipline}
      onChange={(event, newValue) => handleChange(event, name, newValue)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth
      options={mappedOptions}
      renderInput={(params) => (
        <TextField required margin="normal" {...params} label={label} />
      )}
    />
  );
}
