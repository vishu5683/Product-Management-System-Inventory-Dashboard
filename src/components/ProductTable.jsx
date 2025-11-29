import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Stack,
  alpha,
} from "@mui/material";
import { Inventory } from "@mui/icons-material";
import ActionButtons from "./ActionButtons";
import CategoryChip from "./CategoryChip";
import StockChip from "./StockChip";
import PriceDisplay from "./PriceDisplay";

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
            <TableCell>Product</TableCell>
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
                    py: { xs: 1.5, sm: 2, md: 2.5 },
                    px: { xs: 1, sm: 1.5, md: 2 },
                  },
                }}
              >
                <TableCell>
                  <Box>
                    <Stack 
                      direction="row" 
                      alignItems="center" 
                      spacing={{ xs: 1, sm: 1.5 }} 
                      mb={{ xs: 0.5, md: 0.5 }}
                    >
                      <Box
                        sx={{
                          p: { xs: 0.5, sm: 0.75 },
                          borderRadius: { xs: 1, sm: 1.5 },
                          backgroundColor: alpha("#6366f1", 0.1),
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Inventory sx={{ fontSize: { xs: 14, sm: 18 } }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography 
                          variant="body1" 
                          fontWeight={600}
                          sx={{ 
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: { xs: "nowrap", md: "normal" },
                          }}
                        >
                          {product.name}
                        </Typography>
                        {product.description && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: { xs: "none", md: "-webkit-box" },
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              mt: 0.25,
                            }}
                          >
                            {product.description}
                          </Typography>
                        )}
                        <Box 
                          sx={{ 
                            display: { xs: "flex", sm: "none" }, 
                            gap: 0.5, 
                            flexWrap: "wrap",
                            mt: 0.5,
                          }}
                        >
                          <CategoryChip category={product.category} />
                          <StockChip stock={product.stock} />
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  <CategoryChip category={product.category} />
                </TableCell>
                <TableCell align="right">
                  <PriceDisplay price={product.price} variant="body1" />
                </TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  <StockChip stock={product.stock} />
                </TableCell>
                <TableCell align="center">
                  <ActionButtons
                    onEdit={() => onEdit(product)}
                    onDelete={() => onDelete(product.id, product.name)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
