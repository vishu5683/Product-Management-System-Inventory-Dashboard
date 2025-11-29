import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Chip,
  Stack,
  alpha,
} from "@mui/material";
import { Edit, Delete, Inventory } from "@mui/icons-material";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "background.default",
              "& th": {
                fontWeight: 700,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "text.secondary",
                borderBottom: "2px solid",
                borderColor: "divider",
                py: { xs: 1.5, sm: 2 },
                px: { xs: 1, sm: 2 },
              },
            }}
          >
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Product</TableCell>
            <TableCell sx={{ display: { xs: "table-cell", md: "table-cell" } }}>Product</TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right" sx={{ display: { xs: "none", lg: "table-cell" } }}>Stock</TableCell>
            <TableCell align="center" sx={{ width: { xs: 80, sm: 120 } }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => {
            const isLowStock = product.stock < 10;
            return (
              <TableRow
                key={product.id}
                hover
                sx={{
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: alpha("#6366f1", 0.04),
                    transform: "scale(1.01)",
                  },
                  "& td": {
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    py: 2.5,
                  },
                }}
              >
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
                      <Box
                        sx={{
                          p: 0.75,
                          borderRadius: 1.5,
                          backgroundColor: alpha("#6366f1", 0.1),
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Inventory sx={{ fontSize: 18 }} />
                      </Box>
                      <Typography 
                        variant="body1" 
                        fontWeight={600}
                        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      >
                        {product.name}
                      </Typography>
                    </Stack>
                    {product.description && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          ml: 4.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.description}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: "table-cell", md: "none" } }}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                      <Box
                        sx={{
                          p: 0.5,
                          borderRadius: 1,
                          backgroundColor: alpha("#6366f1", 0.1),
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Inventory sx={{ fontSize: 14 }} />
                      </Box>
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        sx={{ 
                          fontSize: "0.875rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "150px"
                        }}
                      >
                        {product.name}
                      </Typography>
                    </Stack>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        backgroundColor: alpha("#6366f1", 0.1),
                        color: "primary.main",
                        fontWeight: 600,
                        border: "1px solid",
                        borderColor: alpha("#6366f1", 0.3),
                        fontSize: "0.7rem",
                        height: "20px",
                      }}
                    />
                    <Chip
                      icon={<Inventory sx={{ fontSize: 12 }} />}
                      label={`${product.stock} units`}
                      size="small"
                      sx={{
                        ml: 0.5,
                        backgroundColor: isLowStock
                          ? alpha("#f59e0b", 0.1)
                          : alpha("#10b981", 0.1),
                        color: isLowStock ? "warning.dark" : "success.dark",
                        fontWeight: 600,
                        border: "1px solid",
                        borderColor: isLowStock
                          ? alpha("#f59e0b", 0.3)
                          : alpha("#10b981", 0.3),
                        fontSize: "0.7rem",
                        height: "20px",
                        "& .MuiChip-icon": {
                          color: isLowStock ? "warning.dark" : "success.dark",
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
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
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  <Chip
                    icon={<Inventory sx={{ fontSize: 14 }} />}
                    label={`${product.stock} units`}
                    size="small"
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
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "inline-flex", gap: { xs: 0.25, sm: 0.5 } }}>
                    <Tooltip title="Edit Product" arrow>
                      <IconButton
                        onClick={() => onEdit(product)}
                        size="small"
                        sx={{
                          backgroundColor: alpha("#6366f1", 0.1),
                          color: "primary.main",
                          width: { xs: 32, sm: 36 },
                          height: { xs: 32, sm: 36 },
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s",
                        }}
                      >
                        <Edit sx={{ fontSize: { xs: 16, sm: 18 } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product" arrow>
                      <IconButton
                        onClick={() => onDelete(product.id, product.name)}
                        size="small"
                        sx={{
                          backgroundColor: alpha("#ef4444", 0.1),
                          color: "error.main",
                          width: { xs: 32, sm: 36 },
                          height: { xs: 32, sm: 36 },
                          "&:hover": {
                            backgroundColor: "error.main",
                            color: "white",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s",
                        }}
                      >
                        <Delete sx={{ fontSize: { xs: 16, sm: 18 } }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
