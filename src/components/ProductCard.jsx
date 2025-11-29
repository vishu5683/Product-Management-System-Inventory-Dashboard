import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Stack,
  alpha,
} from "@mui/material";
import { Edit, Delete, Inventory } from "@mui/icons-material";

export default function ProductCard({ product, onEdit, onDelete }) {
  const isLowStock = product.stock < 10;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: isLowStock
            ? "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)"
            : "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
        },
      }}
      elevation={2}
    >
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Chip
            label={product.category}
            size="small"
            sx={{
              backgroundColor: alpha("#6366f1", 0.1),
              color: "primary.main",
              fontWeight: 600,
              border: "1px solid",
              borderColor: alpha("#6366f1", 0.3),
            }}
          />
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              opacity: 0,
              transition: "opacity 0.2s",
              ".MuiCard-root:hover &": {
                opacity: 1,
              },
            }}
          >
            <Tooltip title="Edit Product" arrow>
              <IconButton
                size="small"
                onClick={onEdit}
                sx={{
                  backgroundColor: alpha("#6366f1", 0.1),
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s",
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Product" arrow>
              <IconButton
                size="small"
                onClick={onDelete}
                sx={{
                  backgroundColor: alpha("#ef4444", 0.1),
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "error.main",
                    color: "white",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s",
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>

        {/* Product Icon/Name */}
        <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha("#6366f1", 0.1),
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Inventory />
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
            }}
          >
            {product.name}
          </Typography>
        </Stack>

        {/* Description */}
        {product.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              minHeight: 40,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
            }}
          >
            {product.description}
          </Typography>
        )}

        {/* Footer */}
        <Box
          sx={{
            mt: "auto",
            pt: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                Price
              </Typography>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </Box>
            <Chip
              icon={<Inventory sx={{ fontSize: 16 }} />}
              label={`${product.stock} units`}
              size="medium"
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
                "& .MuiChip-icon": {
                  color: isLowStock ? "warning.dark" : "success.dark",
                },
              }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
