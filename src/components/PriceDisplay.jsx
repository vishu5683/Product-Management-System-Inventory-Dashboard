import { Typography } from "@mui/material";

export default function PriceDisplay({ price, variant = "h5" }) {
  return (
    <Typography
      variant={variant}
      fontWeight={700}
      sx={{
        fontSize: {
          xs: variant === "h5" ? "1.25rem" : "0.875rem",
          sm: variant === "h5" ? "1.5rem" : "1rem",
          md: variant === "h5" ? "1.75rem" : "1rem",
        },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      ${price.toFixed(2)}
    </Typography>
  );
}

