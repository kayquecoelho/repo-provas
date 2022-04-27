import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import api from "../../../services/api";

export default function Test({ category }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  async function increaseViewCount(testId, pdfUrl) {
    try {
      await api.increaseViewCount(token, testId);
      navigate(pdfUrl)
    } catch (error) {
      alert(error.response.data);
    }
  }

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
            sx={{
              textDecoration: "none",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.5rem",
              color: "#969696",
              cursor: "pointer"
            }}
            onClick={() => increaseViewCount(test.id, test.pdfUrl)}
          >
            {`${test.termNumber} - ${test.name} (${
              test.disciplineName || test.teacher
            }) ${test.viewsCount} views`} 
          </Link>
        </Typography>
      ))}
    </>
  );
}
