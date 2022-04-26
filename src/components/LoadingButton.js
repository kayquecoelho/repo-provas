import LoadingButton from "@mui/lab/LoadingButton";

export default function Button({ children, isLoading }) {
  return (
    <LoadingButton
      type="submit"
      loading={isLoading}
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {children}
    </LoadingButton>
  );
}
