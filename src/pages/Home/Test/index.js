import { Typography } from "@mui/material";
import styled from "styled-components";
import useAuth from "../../../hooks/useAuth";
import api from "../../../services/api";

export default function Test({ category }) {
  const { token } = useAuth();

  async function increaseViewCount(testId, pdfUrl) {
    try {
      await api.increaseViewCount(token, testId);
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
            href={test.pdfUrl}
            target="_blank"
            onClick={() => increaseViewCount(test.id, test.pdfUrl)}
          >
            {`${test.name} - (${test.disciplineName || test.teacher}) ${
              test.viewsCount
            } views`}
          </Link>
        </Typography>
      ))}
    </>
  );
}

const Link = styled.a`
  text-decoration: none;
  font-family: "Poppins", "sans-serif";
  font-weight: 500;
  font-size: "1rem";
  line-height: "1.5rem";
  color: #969696;
  cursor: pointer;
`;
