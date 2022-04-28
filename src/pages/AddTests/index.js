import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Container, CssBaseline, TextField } from "@mui/material";
import { useState } from "react";
import Header from "../Home/Header";

export default function AddTests() {
  const [testData, setTestData] = useState({
    title: "",
    pdfUrl: "",
    category: null,
    discipline: null,
    instructor: null,
  });

  function handleChange(event, name, newValue) {
    if (name) {
      return setTestData({...testData, [name]: newValue})
    }
    setTestData({ ...testData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTestData({ ...testData, [event.target.name]: event.target.value });
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
          />
          <AutocompleteComponent
            label="Discipline"
            testData={testData}
            handleChange={handleChange}
            name="discipline"
            value={testData.discipline}
          />
          <AutocompleteComponent 
            label="Instructor"
            testData={testData}
            handleChange={handleChange}
            name="instructor"
            value={testData.instructor}
          />

          <LoadingButton variant="contained" fullWidth>
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
      name={name}
      margin="normal"
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
    />
  );
}

function AutocompleteComponent({label, testData, handleChange, name, value}) {
  return (
    <Autocomplete
      disablePortal
      value={value}
      disabled={name === 'instructor' && !testData.discipline}
      onChange={(event, newValue) => handleChange(event, name, newValue) }
      fullWidth
      options={[]}
      renderInput={(params) => <TextField margin="normal" {...params} label={label} />}
    />
  );
}
