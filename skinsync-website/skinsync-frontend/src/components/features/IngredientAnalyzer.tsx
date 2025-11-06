import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface IngredientAnalyzerProps {
  ingredients: string[];
  skinType: string;
}

const IngredientAnalyzer: React.FC<IngredientAnalyzerProps> = ({ ingredients, skinType }) => {
  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5">Ingredient Analysis</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Analysis results will appear here</Typography>
      </Box>
    </Paper>
  );
};

export default IngredientAnalyzer;