import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
  Grid,
  Card,
  Fade,
  Grow,
} from "@mui/material";
import {
  Search,
  GridView,
  TableRows,
  Add,
  Inventory,
  TrendingUp,
  Warning,
  AttachMoney,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "./components/ProductCard";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import StatCard from "./components/StatCard";
import useDebounce from "./hooks/useDebounce";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.05)",
    "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(99, 102, 241, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          },
        },
      },
    },
  },
});

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    category: "Electronics",
    stock: 45,
    description: "Apple's latest flagship phone with titanium body and A17 chip.",
  },
  {
    id: 2,
    name: "Noise Cancelling Headphones",
    price: 349,
    category: "Electronics",
    stock: 20,
    description: "Premium ANC headphones ideal for travel and focus time.",
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 259,
    category: "Home",
    stock: 15,
    description: "Mesh back, adjustable lumbar support, and 4D armrests.",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 139,
    category: "Sports",
    stock: 80,
    description: "Responsive cushioning designed for long distance runs.",
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 299,
    category: "Electronics",
    stock: 60,
    description: "Track workouts, sleep, temperature, and irregular heartbeats.",
  },
  {
    id: 6,
    name: "Espresso Machine",
    price: 499,
    category: "Home",
    stock: 18,
    description: "Barista-grade espresso machine with automatic milk frother.",
  },
  {
    id: 7,
    name: "4K Monitor",
    price: 429,
    category: "Electronics",
    stock: 32,
    description: "27-inch IPS display with HDR10 support and USB-C hub.",
  },
  {
    id: 8,
    name: "Yoga Mat Pro",
    price: 79,
    category: "Sports",
    stock: 120,
    description: "Extra thick mat with anti-slip grip for all workouts.",
  },
  {
    id: 9,
    name: "Desk Lamp",
    price: 69,
    category: "Home",
    stock: 55,
    description: "Adjustable brightness and color temperature with USB port.",
  },
  {
    id: 10,
    name: "Travel Backpack",
    price: 159,
    category: "Fashion",
    stock: 70,
    description: "45L carry-on compliant backpack with modular compartments.",
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    price: 119,
    category: "Electronics",
    stock: 110,
    description: "Portable waterproof speaker with 20-hour battery life.",
  },
  {
    id: 12,
    name: "Mechanical Keyboard",
    price: 189,
    category: "Electronics",
    stock: 40,
    description: "Hot-swappable switches, per-key RGB, and aluminum body.",
  },
  {
    id: 13,
    name: "Air Purifier",
    price: 249,
    category: "Home",
    stock: 22,
    description: "HEPA filtration removes 99.9% of airborne particles.",
  },
  {
    id: 14,
    name: "Graphic Tablet",
    price: 329,
    category: "Electronics",
    stock: 25,
    description: "Pen display with laminated screen and tilt recognition.",
  },
  {
    id: 15,
    name: "Camping Tent",
    price: 289,
    category: "Sports",
    stock: 35,
    description: "Four-season tent with quick setup system for 4 people.",
  },
  {
    id: 16,
    name: "Portable Projector",
    price: 379,
    category: "Electronics",
    stock: 27,
    description: "Compact projector with 1080p resolution and built-in speakers.",
  },
  {
    id: 17,
    name: "Electric Toothbrush",
    price: 99,
    category: "Home",
    stock: 95,
    description: "Pressure sensor, multiple modes, and wireless charging base.",
  },
  {
    id: 18,
    name: "Smart Thermostat",
    price: 249,
    category: "Home",
    stock: 30,
    description: "Learns your schedule and reduces energy consumption.",
  },
  {
    id: 19,
    name: "Gaming Mouse",
    price: 129,
    category: "Electronics",
    stock: 65,
    description: "High DPI wireless mouse with adjustable weights.",
  },
  {
    id: 20,
    name: "Wireless Charger",
    price: 59,
    category: "Electronics",
    stock: 150,
    description: "3-in-1 charger for phone, earbuds, and smartwatch.",
  },
  {
    id: 21,
    name: "Standing Desk",
    price: 499,
    category: "Home",
    stock: 19,
    description: "Electric height-adjustable desk with memory presets.",
  },
  {
    id: 22,
    name: "Compact Drone",
    price: 899,
    category: "Electronics",
    stock: 10,
    description: "4K aerial footage with obstacle avoidance sensors.",
  },
  {
    id: 23,
    name: "Leather Wallet",
    price: 79,
    category: "Fashion",
    stock: 90,
    description: "RFID blocking slim wallet with quick access slots.",
  },
  {
    id: 24,
    name: "Cookware Set",
    price: 369,
    category: "Home",
    stock: 28,
    description: "Tri-ply stainless steel set compatible with induction.",
  },
];

const ITEMS_PER_PAGE = 8;

function App() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null, productName: "" });

  // Debounce search query with 500ms delay
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Filter products based on debounced search
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const lowStock = products.filter((p) => p.stock < 10).length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    return { totalProducts, lowStock, totalValue, totalStock };
  }, [products]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id ? { ...editingProduct, ...productData } : item
        )
      );
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      setProducts((prev) => [{ id: Date.now(), ...productData }, ...prev]);
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    closeForm();
  };

  const handleDeleteClick = (id, name) => {
    setDeleteDialog({ open: true, productId: id, productName: name });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.productId) {
      setProducts((prev) => prev.filter((product) => product.id !== deleteDialog.productId));
      toast.success("Product deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setDeleteDialog({ open: false, productId: null, productName: "" });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, productId: null, productName: "" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          backgroundImage: "linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 0,
            py: 4,
            mb: 4,
          }}
        >
          <Container 
            maxWidth="xl"
            sx={{ px: { xs: 2, sm: 3, md: 4 } }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={{ xs: 2, sm: 2.5, md: 3 }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Inventory sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Product Management System
                  </Typography>
                  <Typography 
                variant="h4" 
                fontWeight={700}
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" }
                }}
              >
                    Inventory Dashboard
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={openAddModal}
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  width: { xs: "100%", sm: "auto" },
                  mt: { xs: 2, sm: 0 },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  Add New Product
                </Box>
                <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                  Add Product
                </Box>
              </Button>
            </Stack>
          </Container>
        </Paper>

        <Container 
          maxWidth="xl" 
          sx={{ 
            pb: { xs: 4, sm: 5, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Statistics Cards */}
          <Grid 
            container 
            spacing={{ xs: 2, sm: 2.5, md: 3 }} 
            sx={{ mb: { xs: 3, sm: 3.5, md: 4 } }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={Inventory}
                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                delay={300}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Low Stock Items"
                value={stats.lowStock}
                icon={Warning}
                gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                delay={400}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Stock"
                value={stats.totalStock}
                icon={TrendingUp}
                gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                delay={500}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Value"
                value={stats.totalValue}
                icon={AttachMoney}
                gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                delay={600}
                formatValue={(val) => `$${(val / 1000).toFixed(1)}K`}
              />
            </Grid>
          </Grid>

          {/* Search and View Toggle */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              mb: { xs: 3, sm: 3.5, md: 4 },
              borderRadius: 3,
              background: "white",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2.5 }}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
            >
              <TextField
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "text.secondary", fontSize: { xs: 18, sm: 20 } }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { sm: 300, md: 400 },
                  flex: { sm: 1, md: "none" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
                variant="outlined"
                size="medium"
              />

              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, newView) => newView && setViewMode(newView)}
                size="large"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  "& .MuiToggleButton-root": {
                    px: { xs: 2, sm: 2.5, md: 3 },
                    py: { xs: 1, sm: 1.25 },
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                    flex: { xs: 1, sm: "none" },
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="list" aria-label="list view">
                  <TableRows sx={{ mr: { xs: 0.5, sm: 1 }, fontSize: { xs: 18, sm: 20 } }} />
                  <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                    List View
                  </Box>
                  <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                    List
                  </Box>
                </ToggleButton>
                <ToggleButton value="grid" aria-label="grid view">
                  <GridView sx={{ mr: { xs: 0.5, sm: 1 }, fontSize: { xs: 18, sm: 20 } }} />
                  <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                    Grid View
                  </Box>
                  <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                    Grid
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Paper>

          {/* Products Display */}
          <Fade in timeout={500}>
            <Box>
              {filteredProducts.length === 0 ? (
                <Paper
                  sx={{
                    p: 8,
                    textAlign: "center",
                    borderRadius: 3,
                    background: "white",
                    border: "2px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Search sx={{ fontSize: 80, color: "text.secondary", mb: 2, opacity: 0.5 }} />
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    No products found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Try adjusting your search criteria or add a new product to get started.
                  </Typography>
                  <Button variant="contained" onClick={openAddModal} startIcon={<Add />}>
                    Add Your First Product
                  </Button>
                </Paper>
              ) : viewMode === "list" ? (
                <ProductTable
                  products={currentProducts}
                  onEdit={openEditModal}
                  onDelete={handleDeleteClick}
                />
              ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                },
                gap: { xs: 2, sm: 2.5, md: 3 },
              }}
            >
                  {currentProducts.map((product, index) => (
                    <Grow in timeout={300 + index * 50} key={product.id}>
                      <Box>
                        <ProductCard
                          product={product}
                          onEdit={() => openEditModal(product)}
                          onDelete={() => handleDeleteClick(product.id, product.name)}
                        />
                      </Box>
                    </Grow>
                  ))}
                </Box>
              )}

              {totalPages > 1 && (
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    mt: { xs: 3, sm: 4, md: 5 },
                    px: { xs: 1, sm: 0 },
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) => setCurrentPage(value)}
                    color="primary"
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                        minWidth: { xs: 32, sm: 36, md: 40 },
                        height: { xs: 32, sm: 36, md: 40 },
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Fade>
        </Container>

        {/* Modals */}
        <ProductForm
          open={isFormOpen}
          initialProduct={editingProduct}
          onClose={closeForm}
          onSave={handleSaveProduct}
        />

        <DeleteConfirmDialog
          open={deleteDialog.open}
          productName={deleteDialog.productName}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
