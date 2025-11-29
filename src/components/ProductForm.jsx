import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  alpha,
} from "@mui/material";
import { Close, Inventory, Category, AttachMoney, Storage, Description } from "@mui/icons-material";

const initialState = {
  name: "",
  price: "",
  category: "",
  stock: "",
  description: "",
};

export default function ProductForm({ open, initialProduct, onClose, onSave }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (open) {
      if (initialProduct) {
        setValues({
          name: initialProduct.name ?? "",
          price: initialProduct.price?.toString() ?? "",
          category: initialProduct.category ?? "",
          stock:
            initialProduct.stock !== undefined && initialProduct.stock !== null
              ? initialProduct.stock.toString()
              : "",
          description: initialProduct.description ?? "",
        });
      } else {
        setValues(initialState);
      }
      setErrors({});
      setTouched({});
    }
  }, [open, initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, values[field]);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Product name is required";
        }
        break;
      case "category":
        if (!value.trim()) {
          error = "Category is required";
        }
        break;
      case "price":
        if (value === "" || value === null || value === undefined) {
          error = "Price is required";
        } else {
          const priceNum = Number(value);
          if (Number.isNaN(priceNum) || priceNum <= 0) {
            error = "Price must be a positive number greater than 0";
          }
        }
        break;
      case "stock":
        if (value !== "" && value !== null && value !== undefined) {
          const stockNum = Number(value);
          if (Number.isNaN(stockNum) || stockNum < 0) {
            error = "Stock must be a non-negative number";
          }
        }
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    return !error;
  };

  const validate = () => {
    const fields = ["name", "category", "price"];
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field, values[field])) {
        isValid = false;
      }
    });

    if (values.stock !== "") {
      if (!validateField("stock", values.stock)) {
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      category: true,
      price: true,
      stock: true,
    });

    if (!validate()) {
      return;
    }

    const payload = {
      name: values.name.trim(),
      category: values.category.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      stock: values.stock === "" ? 0 : Number(values.stock),
    };

    onSave(payload);
  };

  const isEditing = Boolean(initialProduct);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: alpha("#6366f1", 0.1),
                color: "primary.main",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Inventory />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              {isEditing ? "Edit Product" : "Add New Product"}
            </Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="small"
            sx={{
              "&:hover": {
                backgroundColor: alpha("#000", 0.05),
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                fullWidth
                required
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Inventory sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={() => handleBlur("category")}
                fullWidth
                required
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Category sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Price (USD)"
                name="price"
                type="number"
                value={values.price}
                onChange={handleChange}
                onBlur={() => handleBlur("price")}
                fullWidth
                required
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, step: 0.01 },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Quantity"
                name="stock"
                type="number"
                value={values.stock}
                onChange={handleChange}
                onBlur={() => handleBlur("stock")}
                fullWidth
                error={touched.stock && Boolean(errors.stock)}
                helperText={touched.stock ? errors.stock || "Optional" : "Optional"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Storage sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  inputProps: { min: 0, step: 1 },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                      <Description sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Optional - Provide a detailed description of the product"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button onClick={onClose} variant="outlined" color="inherit" size="large">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0px 8px 16px rgba(99, 102, 241, 0.4)",
              },
              transition: "all 0.3s",
            }}
          >
            {isEditing ? "Update Product" : "Create Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
