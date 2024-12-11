import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Add this import

// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState({});
  const [quantityLoadingStates, setQuantityLoadingStates] = useState({});
  const [quantities, setQuantities] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    data: cartItems,
    loading,
    error,
    refetch,
  } = useFetch("https://e-commerce-backend-two-mu.vercel.app/cart");

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setQuantityLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));

      setSnackbar({
        open: true,
        message: "Quantity updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update quantity",
        severity: "error",
      });
    } finally {
      setQuantityLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleMoveToWishlist = async (productId) => {
    setLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      const wishlistResponse = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isWishlisted: true }),
        }
      );

      if (!wishlistResponse.ok) {
        throw new Error("Failed to add to wishlist");
      }

      const cartResponse = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAddedToCart: false }),
        }
      );

      if (!cartResponse.ok) {
        throw new Error("Failed to remove from cart");
      }

      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[productId];
        return newQuantities;
      });

      setSnackbar({
        open: true,
        message: "Product moved to wishlist",
        severity: "success",
      });

      await refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to move item to wishlist",
        severity: "error",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAddedToCart: false }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from cart");
      }

      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[productId];
        return newQuantities;
      });

      setSnackbar({
        open: true,
        message: "Product removed from cart",
        severity: "success",
      });

      await refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to remove item from cart",
        severity: "error",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const calculatePriceDetails = () => {
    if (!cartItems || !Array.isArray(cartItems)) {
      return {
        subtotal: 0,
        discount: 0,
        delivery: 0,
        total: 0,
        totalItems: 0,
        totalQuantity: 0,
      };
    }

    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + (quantities[item._id] || item.quantity || 1),
      0
    );

    const subtotal = cartItems.reduce((sum, item) => {
      const itemQuantity = quantities[item._id] || item.quantity || 1;
      const itemPrice = parseFloat(item.productPrice) || 0;
      return sum + itemPrice * itemQuantity;
    }, 0);

    const discount = subtotal * 0.5;
    const delivery = subtotal > 0 ? 499 : 0;
    const total = subtotal - discount + delivery;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      delivery,
      total: parseFloat(total.toFixed(2)),
      totalItems: cartItems.length,
      totalQuantity,
    };
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

  const { subtotal, discount, delivery, total, totalItems, totalQuantity } =
    calculatePriceDetails();

  return (
    <>
      <Header />
      <main className="container py-5">
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

        <Typography variant="h4" component="h1" gutterBottom className="mb-4">
          MY CART ({totalItems} {totalItems === 1 ? "item" : "items"})
        </Typography>

        <div className="row">
          <div className="col-md-8 mb-4">
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Paper key={item._id} className="mb-4 p-4">
                  <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <Link to={`/products/${item.productName}/${item._id}`}>
                        <img
                          src={item.productImg}
                          alt={item.productName}
                          className="img-fluid rounded"
                          style={{
                            maxHeight: "200px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Link>
                    </div>

                    <div className="col-md-8">
                      <Link
                        className="text-decoration-none text-dark"
                        to={`/products/${item.productName}/${item._id}`}
                      >
                        <Typography variant="h6" gutterBottom>
                          {item.productName}
                        </Typography>
                      </Link>
                      <Box
                        sx={{ display: "flex", alignItems: "baseline", mb: 2 }}
                      >
                        <Typography
                          variant="h5"
                          component="span"
                          sx={{ fontWeight: "bold" }}
                        >
                          ₹
                          {(
                            item.productPrice *
                            (quantities[item._id] || item.quantity || 1)
                          ).toFixed(2)}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                            ml: 2,
                          }}
                        >
                          ₹
                          {(
                            item.productPrice *
                            2 *
                            (quantities[item._id] || item.quantity || 1)
                          ).toFixed(2)}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{ color: "success.main", ml: 2 }}
                        >
                          50% off
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Quantity:
                        </Typography>
                        <ButtonGroup
                          size="small"
                          sx={{ backgroundColor: "background.paper" }}
                        >
                          <Button
                            onClick={() =>
                              handleUpdateQuantity(
                                item._id,
                                (quantities[item._id] || item.quantity || 1) - 1
                              )
                            }
                            disabled={
                              quantityLoadingStates[item._id] ||
                              (quantities[item._id] || item.quantity || 1) <= 1
                            }
                          >
                            <RemoveIcon />
                          </Button>
                          <Button disabled>
                            {quantityLoadingStates[item._id] ? (
                              <CircularProgress size={20} />
                            ) : (
                              quantities[item._id] || item.quantity || 1
                            )}
                          </Button>
                          <Button
                            onClick={() =>
                              handleUpdateQuantity(
                                item._id,
                                (quantities[item._id] || item.quantity || 1) + 1
                              )
                            }
                            disabled={quantityLoadingStates[item._id]}
                          >
                            <AddIcon />
                          </Button>
                        </ButtonGroup>
                      </Box>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveFromCart(item._id)}
                          disabled={loadingStates[item._id]}
                        >
                          {loadingStates[item._id] ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Remove From Cart"
                          )}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleMoveToWishlist(item._id)}
                          disabled={loadingStates[item._id]}
                        >
                          {loadingStates[item._id] ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Move to Wishlist"
                          )}
                        </Button>
                      </Box>
                    </div>
                  </div>
                </Paper>
              ))
            ) : (
              <Paper className="p-5 text-center">
                <Typography variant="h6">Your cart is empty</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </Paper>
            )}
          </div>

          <div className="col-md-4">
            <Paper
              className="p-4"
              sx={{ position: { md: "sticky" }, top: { md: "20px" } }}
            >
              <Typography variant="h6" gutterBottom>
                PRICE DETAILS
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <div className="d-flex justify-content-between mb-2">
                  <Typography>
                    Price ({totalItems} {totalItems === 1 ? "item" : "items"},{" "}
                    {totalQuantity} {totalQuantity === 1 ? "unit" : "units"})
                  </Typography>
                  <Typography>₹{subtotal.toFixed(2)}</Typography>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <Typography>Discount</Typography>
                  <Typography color="success.main">
                    - ₹{discount.toFixed(2)}
                  </Typography>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <Typography>Delivery Charges</Typography>
                  <Typography>₹{delivery.toFixed(2)}</Typography>
                </div>
              </Box>

              <Divider sx={{ my: 2 }} />

              <div className="d-flex justify-content-between mb-3">
                <Typography variant="h6">TOTAL AMOUNT</Typography>
                <Typography variant="h6">₹{total.toFixed(2)}</Typography>
              </div>

              {discount > 0 && (
                <Typography color="success.main" gutterBottom>
                  You will save ₹{discount.toFixed(2)} on this order
                </Typography>
              )}

              <Link to="/products/checkout">
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  disabled={!Array.isArray(cartItems) || cartItems.length === 0}
                >
                  CHECKOUT
                </Button>
              </Link>
            </Paper>
          </div>
        </div>
      </main>

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
