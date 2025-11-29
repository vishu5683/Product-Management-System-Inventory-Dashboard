import { Chip, alpha } from "@mui/material";

export default function CategoryChip({ category, size = "small" }) {
  return (
    <Chip
      label={category}
      size={size}
      sx={{
        backgroundColor: alpha("#6366f1", 0.1),
        color: "primary.main",
        fontWeight: 600,
        border: "1px solid",
        borderColor: alpha("#6366f1", 0.3),
        fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.875rem" },
        height: size === "small" ? { xs: 20, sm: 24 } : { xs: 24, sm: 28 },
      }}
    />
  );
}

