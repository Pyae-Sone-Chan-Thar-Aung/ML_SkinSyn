import React, { useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const SkinAnalysisForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oilLevel: '',
    moisture: '',
    sensitivity: '',
    texture: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/skin-type/analyze', formData);
      // Handle the response
      console.log(response.data);
    } catch (error) {
      console.error('Error analyzing skin type:', error);
    }
    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Skin Analysis
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Oil Level"
              name="oilLevel"
              value={formData.oilLevel}
              onChange={(e) => setFormData({ ...formData, oilLevel: e.target.value })}
            />
          </Grid>
          {/* Add more form fields */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Skin Type'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SkinAnalysisForm;