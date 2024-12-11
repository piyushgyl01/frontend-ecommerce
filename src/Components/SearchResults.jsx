import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../Components/Header';

// MUI Components
import {
  Box,
  Typography,
  IconButton,
  Button,
  Container,
  CircularProgress,
  Grid,
} from '@mui/material';

// MUI Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function SearchResults() {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const searchTerm = location.state?.searchTerm || '';

  if (!location.state) {
    return (
      <>
        <Header />
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Please enter a search term to see results
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Search Results for "{searchTerm}"
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchResults.length} items found
          </Typography>
        </Box>

        {searchResults.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products found matching your search.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Try checking your spelling or using more general terms
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {searchResults.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Link to={`/products/${encodeURIComponent(product.productName)}/${product._id}`}>
                      <img
                        src={product.productImg}
                        alt={product.productName}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                        }}
                      />
                    </Link>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: 'white' },
                      }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ mt: 2, flexGrow: 1 }}>
                    <Link 
                      to={`/products/${encodeURIComponent(product.productName)}/${product._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {product.productName}
                      </Typography>
                    </Link>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
                      <Typography variant="h6" color="primary">
                        ₹{product.productPrice}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        ₹{Math.floor(product.productPrice * 2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Button variant="contained" fullWidth>
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}