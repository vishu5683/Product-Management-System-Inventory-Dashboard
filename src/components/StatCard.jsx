import { Card, Stack, Box, Typography } from "@mui/material";
import { Grow } from "@mui/material";

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  gradient, 
  delay = 300,
  formatValue 
}) {
  return (
    <Grow in timeout={delay}>
      <Card
        sx={{
          background: gradient,
          color: "white",
          p: { xs: 2, sm: 2.5, md: 3 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
          spacing={1}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.9, 
                mb: 0.5,
                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.875rem" },
                fontWeight: 500,
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              fontWeight={700}
              sx={{ 
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                lineHeight: 1.2,
              }}
            >
              {formatValue ? formatValue(value) : value}
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              opacity: 0.3,
            }}
          >
            <Icon sx={{ fontSize: { sm: 36, md: 42, lg: 48 } }} />
          </Box>
        </Stack>
      </Card>
    </Grow>
  );
}

