import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import useFetch from "../useFetch";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Wishlist() {
  const { data, loading, error, refetch } = useFetch(
    "https://e-commerce-backend-two-mu.vercel.app/products"
  );
  const [loadingStates, setLoadingStates] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Filter wishlisted items
  const wishlistedItems = Array.isArray(data)
    ? data.filter((item) => item.isWishlisted)
    : [];

  const handleAddToCart = async (productId) => {
    setLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      // Add to cart
      const cartResponse = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAddedToCart: true }),
        }
      );

      const cartResult = await cartResponse.json();

      if (cartResponse.ok) {
        // Remove from wishlist
        const wishlistResponse = await fetch(
          `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/wishlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isWishlisted: false }),
          }
        );

        const wishlistResult = await wishlistResponse.json();

        if (wishlistResponse.ok) {
          setSnackbar({
            open: true,
            message: cartResult.message || "Product added to cart successfully",
            severity: "success",
          });
          refetch(wishlistedItems.filter((item) => item._id !== productId));
        } else {
          throw new Error(
            wishlistResult.error || "Failed to remove product from wishlist"
          );
        }
      } else {
        throw new Error(cartResult.error || "Failed to add product to cart");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to add product to cart",
        severity: "error",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <main className="container py-5">
        {/* Back Button */}
        <Box mb={3}>
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
            <Typography variant="body1">Back to Products</Typography>
          </Link>
        </Box>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="mb-4"
          align="center"
        >
          My Wishlist
        </Typography>

        {wishlistedItems.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              py: 5,
            }}
          >
            <Typography variant="h6">Your wishlist is empty</Typography>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Continue Shopping
              </Button>
            </Link>
          </Box>
        ) : (
          <div className="row">
            {wishlistedItems.map((item) => (
              <div key={item._id} className="col-md-3 mb-4">
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link to={`/products/${item.productName}/${item._id}`}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={item.productImg}
                      alt={item.productName}
                      sx={{ objectFit: "cover" }}
                    />
                  </Link>

                  <CardContent sx={{ flexGrow: 1 }}>
                  <Link                       className="text-decoration-none text-dark"
 to={`/products/${item.productName}/${item._id}`}>
                    <Typography variant="h6" component="div" align="center">
                      {item.productName}
                    </Typography>
                    </Link>
                    <Typography
                      variant="h5"
                      component="div"
                      align="center"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      ₹{item.productPrice}
                    </Typography>
                    {item.discountPercentage > 0 && (
                      <Box sx={{ textAlign: "center", mt: 1 }}>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                            mr: 1,
                          }}
                        >
                          ₹{item.actualPrice}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ color: "success.main" }}
                        >
                          {item.discountPercentage}% off
                        </Typography>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleAddToCart(item._id)}
                      disabled={loadingStates[item._id]}
                      sx={{
                        backgroundColor: loadingStates[item._id]
                          ? "#d3d3d3"
                          : "grey.500",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: loadingStates[item._id]
                            ? "#d3d3d3"
                            : "grey.600",
                        },
                      }}
                    >
                      {loadingStates[item._id] ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Move to Cart"
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
