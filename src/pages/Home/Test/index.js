import { Link, Typography } from "@mui/material";

export default function Test({ category }) {
  console.log(category);
  return (
    <>
      <Typography
        variant="h5"
        component="h6"
        color="rgba(0, 0, 0, 0.8)"
        sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "500" }}
      >
        {category[0]}
      </Typography>
      {category[1].map((test, index) => (
        <Typography key={index}>
          <Link
            href={test.pdfUrl}
            sx={{
              textDecoration: "none",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.5rem",
              color: "#969696",
            }}
          >
            {`${test.termNumber} - ${test.name} (${
              test.disciplineName || test.teacher
            })`}
          </Link>
        </Typography>
      ))}
    </>
  );
}
