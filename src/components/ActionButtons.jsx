import { Box, IconButton, Tooltip, alpha } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ActionButtons({ onEdit, onDelete, size = "small" }) {
  const iconSize = size === "small" ? { xs: 16, sm: 18 } : { xs: 18, sm: 20 };
  const buttonSize = size === "small" ? { xs: 32, sm: 36 } : { xs: 36, sm: 40 };

  return (
    <Box sx={{ display: "inline-flex", gap: { xs: 0.25, sm: 0.5 } }}>
      <Tooltip title="Edit Product" arrow>
        <IconButton
          onClick={onEdit}
          size={size}
          sx={{
            backgroundColor: alpha("#6366f1", 0.1),
            color: "primary.main",
            width: buttonSize,
            height: buttonSize,
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s",
          }}
        >
          <Edit sx={{ fontSize: iconSize }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Product" arrow>
        <IconButton
          onClick={onDelete}
          size={size}
          sx={{
            backgroundColor: alpha("#ef4444", 0.1),
            color: "error.main",
            width: buttonSize,
            height: buttonSize,
            "&:hover": {
              backgroundColor: "error.main",
              color: "white",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s",
          }}
        >
          <Delete sx={{ fontSize: iconSize }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

