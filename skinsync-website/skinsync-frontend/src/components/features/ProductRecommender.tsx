import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const ProductRecommender = () => {
  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5">Product Recommendations</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Recommendations will appear here</Typography>
      </Box>
    </Paper>
  );
};

export default ProductRecommender;