import { LoadingButton } from "@mui/lab";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function GithubButton({ isLoading }) {
  return (
    <LoadingButton
      fullWidth
      sx={{ mt: 3, mb: 2, bgcolor: "#424445" }}
      variant="contained"
      startIcon={<GitHubIcon />}
      loading={isLoading}
    >
      Login with GitHub
    </LoadingButton>
  );
}
