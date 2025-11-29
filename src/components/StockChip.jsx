import { Chip, alpha } from "@mui/material";
import { Inventory } from "@mui/icons-material";

export default function StockChip({ stock, size = "small" }) {
  const isLowStock = stock < 10;
  
  return (
    <Chip
      icon={<Inventory sx={{ fontSize: size === "small" ? 14 : 16 }} />}
      label={`${stock} units`}
      size={size}
      sx={{
        backgroundColor: isLowStock
          ? alpha("#f59e0b", 0.1)
          : alpha("#10b981", 0.1),
        color: isLowStock ? "warning.dark" : "success.dark",
        fontWeight: 600,
        border: "1px solid",
        borderColor: isLowStock
          ? alpha("#f59e0b", 0.3)
          : alpha("#10b981", 0.3),
        fontSize: { xs: "0.7rem", sm: "0.75rem" },
        height: size === "small" ? { xs: 20, sm: 24 } : { xs: 24, sm: 28 },
        "& .MuiChip-icon": {
          color: isLowStock ? "warning.dark" : "success.dark",
        },
      }}
    />
  );
}

