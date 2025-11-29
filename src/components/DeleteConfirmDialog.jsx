import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Warning, Close } from "@mui/icons-material";

export default function DeleteConfirmDialog({ open, productName, onConfirm, onCancel }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
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
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: "error.light",
                color: "error.main",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Warning />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Confirm Deletion
            </Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onCancel}
            aria-label="close"
            size="small"
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Are you sure you want to delete this product? This action cannot be undone.
        </Typography>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "error.light",
            border: "1px solid",
            borderColor: "error.main",
          }}
        >
          <Typography variant="body2" fontWeight={600} color="error.main">
            Product: {productName}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onCancel} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          Delete Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}

