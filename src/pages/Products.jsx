import * as React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import useFetch from "../useFetch";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const MAX = 300;
const MIN = 0;
const marks = [
  { value: MIN, label: "" },
  { value: MAX, label: "" },
];

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // State
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [val, setVal] = useState(MIN);
  const [state, setState] = useState({
    men: false,
    women: false,
  });
  const [sortValue, setSortValue] = useState("lowToHigh");
  const [ratingValue, setRatingValue] = useState(0);
  const [loadingStates, setLoadingStates] = useState({});
  const [wishlistLoadingStates, setWishlistLoadingStates] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // URL Generation
  const getProductUrl = () => {
    const baseUrl = "https://e-commerce-backend-two-mu.vercel.app";

    if (val > MIN) {
      return `${baseUrl}/products/prices/${val}`;
    }
    if (ratingValue) {
      return `${baseUrl}/products/ratings/${ratingValue}`;
    }
    if (filter) {
      return `${baseUrl}/products`;
    }

    if (state.men && !state.women) {
      return `${baseUrl}/products/categories/Men`;
    }
    if (state.women && !state.men) {
      return `${baseUrl}/products/categories/Women`;
    }
    if (category) {
      return `${baseUrl}/products/categories/${category}`;
    }

    switch (sortValue) {
      case "lowToHigh":
        return `${baseUrl}/products/sort/price-asc`;
      case "highToLow":
        return `${baseUrl}/products/sort/price-desc`;
      default:
        return `${baseUrl}/products`;
    }
  };

  const {
    data,
    error,
    loading: fetchLoading,
    refetch,
  } = useFetch(getProductUrl());

  // Cart Handler
  const handleAddToCart = async (productId) => {
    setLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAddedToCart: true }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (data) {
          const updatedData = data.map((product) =>
            product._id === productId
              ? { ...product, isAddedToCart: true }
              : product
          );
          setSnackbar({
            open: true,
            message: result.message || "Product added to cart successfully",
            severity: "success",
          });
          await refetch(updatedData);
        }
      } else {
        throw new Error(result.error || "Failed to add product to cart");
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

  // Wishlist Handler
  // Wishlist Handler
  const handleWishlist = async (productId) => {
    setWishlistLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      const product = data.find((p) => p._id === productId);
      const isWishlisted = product?.isWishlisted;

      const response = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isWishlisted: !isWishlisted }), // Toggle the state
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (data) {
          const updatedData = data.map((product) =>
            product._id === productId
              ? { ...product, isWishlisted: !isWishlisted }
              : product
          );
          setSnackbar({
            open: true,
            message: isWishlisted
              ? "Product removed from wishlist"
              : "Product added to wishlist successfully",
            severity: "success",
          });
          await refetch(updatedData);
        }
      } else {
        throw new Error(
          result.error ||
            `Failed to ${isWishlisted ? "remove from" : "add to"} wishlist`
        );
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update wishlist",
        severity: "error",
      });
    } finally {
      setWishlistLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleSliderChange = (_, newValue) => setVal(newValue);

  const handleCheckboxChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRatingChange = (event) => setRatingValue(event.target.value);

  const handleSortChange = (event) => setSortValue(event.target.value);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleClearFilters = () => {
    setFilter(true);
    setVal(MIN);
    setState({ men: false, women: false });
    setSortValue("lowToHigh");
    setRatingValue(0);
    navigate("/products");
  };

  if (fetchLoading) {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <main className="container py-4">
        <div className="row">
          {/* Mobile Filter Toggle */}
          <Box className="d-md-none w-100 mb-4">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              startIcon={
                isFiltersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              sx={{
                justifyContent: "space-between",
                p: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Typography>Filters</Typography>
            </Button>
          </Box>

          {/* Filters Section */}
          <div
            className={`col-md-3 ${
              isFiltersOpen ? "block" : "d-none d-md-block"
            }`}
          >
            <Box sx={{ marginBottom: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <h4>Filters</h4>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                  onClick={handleClearFilters}
                >
                  Clear
                </Typography>
              </Box>
            </Box>

            {/* Price Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <h4>Price</h4>
              <Box sx={{ width: "100%" }}>
                <Slider
                  marks={marks}
                  step={10}
                  value={val}
                  valueLabelDisplay="auto"
                  min={MIN}
                  max={MAX}
                  onChange={handleSliderChange}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="body2"
                    onClick={() => setVal(MIN)}
                    sx={{ cursor: "pointer" }}
                  >
                    ${MIN}
                  </Typography>
                  <Typography
                    variant="body2"
                    onClick={() => setVal(MAX)}
                    sx={{ cursor: "pointer" }}
                  >
                    ${MAX}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Category Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel>
                  <h4>Category</h4>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.men}
                        onChange={handleCheckboxChange}
                        name="men"
                      />
                    }
                    label="Men"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.women}
                        onChange={handleCheckboxChange}
                        name="women"
                      />
                    }
                    label="Women"
                  />
                </FormGroup>
              </FormControl>
            </Box>

            {/* Rating Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <FormControl>
                <FormLabel id="rating-label">
                  <h4>Rating</h4>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="rating-label"
                  value={ratingValue || ""}
                  name="rating"
                  onChange={handleRatingChange}
                >
                  <FormControlLabel
                    value={4}
                    control={<Radio />}
                    label="4 Stars & above"
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="3 Stars & above"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="2 Stars & above"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="1 Stars & above"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Sort Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <FormControl>
                <FormLabel id="sort-by-label">
                  <h4>Sort by</h4>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="sort-by-label"
                  value={sortValue}
                  name="sort-by"
                  onChange={handleSortChange}
                >
                  <FormControlLabel
                    value="lowToHigh"
                    control={<Radio />}
                    label="Price - Low to High"
                  />
                  <FormControlLabel
                    value="highToLow"
                    control={<Radio />}
                    label="Price - High to Low"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </div>

          {/* Products Grid */}
          <div className="col-md-9 p-4">
            <h4>Showing All Products</h4>
            <div className="row">
              <p>({data?.length} products)</p>
              {data?.map((product) => (
                <div className="col-md-4 my-3" key={product._id}>
                  <Card
                    sx={{ maxWidth: 345, position: "relative", padding: 2 }}
                  >
                    {/* Wishlist Icon */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        padding: 0.5,
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1,
                      }}
                    >
                      <IconButton
                        onClick={() => handleWishlist(product._id)}
                        disabled={wishlistLoadingStates[product._id]}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                          },
                        }}
                      >
                        {wishlistLoadingStates[product._id] ? (
                          <CircularProgress size={20} sx={{ color: "gray" }} />
                        ) : product.isWishlisted ? (
                          <FavoriteIcon
                            sx={{
                              color: "red",
                              "&:hover": {
                                color: "gray",
                              },
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            sx={{
                              color: "gray",
                              "&:hover": {
                                color: "pink",
                              },
                            }}
                          />
                        )}
                      </IconButton>
                    </Box>

                    {/* Product Image */}
                    <Link
                      to={`/products/${product.productName}/${product._id}`}
                    >
                      <CardMedia
                        component="img"
                        height="300"
                        image={product.productImg}
                        alt={product.productName}
                      />
                    </Link>

                    {/* Product Details */}
                    <CardContent>
                      <Link className="text-decoration-none text-dark"
                        to={`/products/${product.productName}/${product._id}`}
                      >
                        <Typography variant="h6" component="div" align="center">
                          {product.productName}
                        </Typography>{" "}
                      </Link>

                      <Typography
                        variant="h5"
                        component="div"
                        align="center"
                        sx={{ fontWeight: "bold", marginY: 1 }}
                      >
                        ${product.productPrice}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleAddToCart(product._id)}
                        disabled={
                          loadingStates[product._id] || product.isAddedToCart
                        }
                        sx={{
                          backgroundColor: product.isAddedToCart
                            ? "#d3d3d3"
                            : "primary.main",
                          color: product.isAddedToCart ? "black" : "white",
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: product.isAddedToCart
                              ? "#d3d3d3"
                              : "primary.dark",
                          },
                        }}
                      >
                        {loadingStates[product._id] ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : product.isAddedToCart ? (
                          "Added to Cart"
                        ) : (
                          "Add to Cart"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
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
};

export default Products;
