// import Header from "../Components/Header";
// import { useParams, Link } from "react-router-dom";
// import useFetch from "../useFetch";
// import { useState } from "react";

// // MUI Components
// import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Rating from "@mui/material/Rating";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";

// // MUI Icons
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
// import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// export default function ProductListing() {
//   const productId = useParams();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [loadingState, setLoadingState] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const { data, loading, error, refetch } = useFetch(
//     "https://e-commerce-backend-two-mu.vercel.app/products"
//   );

//   const clickedProduct = data?.find(
//     (product) => product._id === productId.productId
//   );

//   const handleWishlist = async () => {
//     if (!clickedProduct) return;
//     setWishlistLoading(true);

//     try {
//       const response = await fetch(
//         `https://e-commerce-backend-two-mu.vercel.app/products/${clickedProduct._id}/wishlist`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ isWishlisted: !clickedProduct.isWishlisted }),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         setSnackbar({
//           open: true,
//           message: clickedProduct.isWishlisted
//             ? "Product removed from wishlist"
//             : "Product added to wishlist successfully",
//           severity: "success",
//         });
//         await refetch();
//       } else {
//         throw new Error(result.error || "Failed to update wishlist");
//       }
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || "Failed to update wishlist",
//         severity: "error",
//       });
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   const handleQuantityChange = (operation) => {
//     if (operation === "add" && quantity < 10) {
//       setQuantity(quantity + 1);
//     } else if (operation === "subtract" && quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleSizeChange = (event, newSize) => {
//     if (newSize !== null) {
//       setSelectedSize(newSize);
//     }
//   };

//   const handleAddToCart = async () => {
//     setLoadingState(true);

//     try {
//       const response = await fetch(
//         `https://e-commerce-backend-two-mu.vercel.app/products/${clickedProduct._id}/cart`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             isAddedToCart: true,
//             quantity: quantity,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to add to cart");
//       }

//       setSnackbar({
//         open: true,
//         message: "Product added to cart successfully",
//         severity: "success",
//       });

//       await refetch();
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || "Failed to add to cart",
//         severity: "error",
//       });
//     } finally {
//       setLoadingState(false);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) return <div>Error: {error}</div>;

//   if (!clickedProduct) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const relatedProducts = data
//     .filter((product) => product._id !== clickedProduct._id)
//     .slice(0, 4);

//   return (
//     <>
//       <Header />
//       <main className="container py-5">
//         {/* Back Button */}
//         <Box mb={3}>
//           <Link
//             to="/products"
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <ArrowBackIcon sx={{ mr: 1 }} />
//             <Typography variant="body1">Back to Products</Typography>
//           </Link>
//         </Box>

//         <div className="row">
//           {/* Product Image */}
//           <div className="col-md-6 position-relative mb-4">
//             <IconButton
//               onClick={handleWishlist}
//               disabled={wishlistLoading}
//               sx={{
//                 position: "absolute",
//                 top: 10,
//                 right: 10,
//                 backgroundColor: "white",
//                 "&:hover": { backgroundColor: "white" },
//               }}
//             >
//               {wishlistLoading ? (
//                 <CircularProgress size={20} sx={{ color: "gray" }} />
//               ) : clickedProduct.isWishlisted ? (
//                 <FavoriteIcon sx={{ color: "red" }} />
//               ) : (
//                 <FavoriteBorderIcon />
//               )}
//             </IconButton>
//             <img
//               src={clickedProduct.productImg}
//               alt={clickedProduct.productName}
//               className="img-fluid"
//               style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
//             />
//           </div>

//           {/* Rest of the component remains the same... */}
//           {/* Product Info */}
//           <div className="col-md-6">
//             <Typography variant="h4" component="h1" gutterBottom>
//               {clickedProduct.productName}
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <Rating value={4.5} precision={0.5} readOnly />
//               <Typography variant="body2" sx={{ ml: 1 }}>
//                 4.5
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
//               <Typography
//                 variant="h4"
//                 component="span"
//                 sx={{ fontWeight: "bold" }}
//               >
//                 ₹{clickedProduct.productPrice * quantity}
//               </Typography>
//               <Typography
//                 variant="h6"
//                 component="span"
//                 sx={{
//                   textDecoration: "line-through",
//                   color: "text.secondary",
//                   ml: 2,
//                 }}
//               >
//                 ₹{3999 * quantity}
//               </Typography>
//               <Typography
//                 variant="h6"
//                 component="span"
//                 sx={{ color: "success.main", ml: 2 }}
//               >
//                 50% off
//               </Typography>
//             </Box>

//             {/* Quantity Selector */}
//             <Box sx={{ mb: 3 }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Quantity:
//               </Typography>
//               <ButtonGroup>
//                 <Button onClick={() => handleQuantityChange("subtract")}>
//                   <RemoveIcon />
//                 </Button>
//                 <Button disabled>{quantity}</Button>
//                 <Button onClick={() => handleQuantityChange("add")}>
//                   <AddIcon />
//                 </Button>
//               </ButtonGroup>
//             </Box>

//             {/* Size Selector */}
//             <Box sx={{ mb: 3 }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Size:
//               </Typography>
//               <ToggleButtonGroup
//                 value={selectedSize}
//                 exclusive
//                 onChange={handleSizeChange}
//               >
//                 <ToggleButton value="S">S</ToggleButton>
//                 <ToggleButton value="M">M</ToggleButton>
//                 <ToggleButton value="XL">XL</ToggleButton>
//                 <ToggleButton value="XXL">XXL</ToggleButton>
//               </ToggleButtonGroup>
//             </Box>

//             {/* Action Buttons */}
//             <Box sx={{ mb: 4 }}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{ mb: 2 }}
//                 color="primary"
//                 disabled={loadingState}
//               >
//                 {loadingState ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : (
//                   "Buy Now"
//                 )}
//               </Button>
//               <Button
//                 variant="outlined"
//                 fullWidth
//                 color="primary"
//                 onClick={handleAddToCart}
//                 disabled={loadingState || clickedProduct.isAddedToCart}
//               >
//                 {loadingState ? (
//                   <CircularProgress size={24} />
//                 ) : clickedProduct.isAddedToCart ? (
//                   "Added to Cart"
//                 ) : (
//                   "Add to Cart"
//                 )}
//               </Button>
//             </Box>

//             {/* Delivery Features */}
//             {/* ... rest of the component remains unchanged ... */}
//           </div>
//         </div>

//         {/* Related Products section */}
//         <div className="mt-5">
//           <Typography variant="h5" gutterBottom>
//             More items you may like in apparel
//           </Typography>
//           <div className="row">
//             {relatedProducts.map((product) => (
//               <div key={product._id} className="col-md-3 mb-4">
//                 <div className="card">
//                   <div className="position-relative">
//                     <IconButton
//                       sx={{
//                         position: "absolute",
//                         top: 8,
//                         right: 8,
//                         backgroundColor: "white",
//                         "&:hover": { backgroundColor: "white" },
//                       }}
//                     >
//                       {product.isWishlisted ? (
//                         <FavoriteIcon color="error" />
//                       ) : (
//                         <FavoriteBorderIcon />
//                       )}
//                     </IconButton>
//                     <Link
//                       to={`/products/${product.productName}/${product._id}`}
//                     >
//                       <img
//                         src={product.productImg}
//                         alt={product.productName}
//                         className="card-img-top"
//                         style={{ height: "200px", objectFit: "cover" }}
//                       />
//                     </Link>
//                   </div>
//                   <div className="card-body">
//                     <Typography variant="h6" gutterBottom>
//                       {product.productName}
//                     </Typography>
//                     <Typography variant="h6" color="text.primary">
//                       ₹{product.productPrice}
//                     </Typography>
//                     <Button variant="contained" fullWidth sx={{ mt: 2 }}>
//                       Add to Cart
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Feedback Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import Header from "../Components/Header";
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";

// MUI Components
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ButtonGroup from "@mui/material/ButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// MUI Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ProductListing() {
  const productId = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [loadingState, setLoadingState] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [relatedProductsLoadingStates, setRelatedProductsLoadingStates] =
    useState({});
  const [relatedWishlistLoadingStates, setRelatedWishlistLoadingStates] =
    useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data, loading, error, refetch } = useFetch(
    "https://e-commerce-backend-two-mu.vercel.app/products"
  );

  const clickedProduct = data?.find(
    (product) => product._id === productId.productId
  );

  const handleWishlist = async (productId) => {
    const targetProduct = data?.find((product) => product._id === productId);
    if (!targetProduct) return;

    const isMainProduct = productId === clickedProduct._id;
    if (isMainProduct) {
      setWishlistLoading(true);
    } else {
      setRelatedWishlistLoadingStates((prev) => ({
        ...prev,
        [productId]: true,
      }));
    }

    try {
      const response = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${productId}/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isWishlisted: !targetProduct.isWishlisted }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: targetProduct.isWishlisted
            ? "Product removed from wishlist"
            : "Product added to wishlist successfully",
          severity: "success",
        });
        await refetch();
      } else {
        throw new Error(result.error || "Failed to update wishlist");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update wishlist",
        severity: "error",
      });
    } finally {
      if (isMainProduct) {
        setWishlistLoading(false);
      } else {
        setRelatedWishlistLoadingStates((prev) => ({
          ...prev,
          [productId]: false,
        }));
      }
    }
  };

  const handleQuantityChange = (operation) => {
    if (operation === "add" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (operation === "subtract" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSelectedSize(newSize);
    }
  };

  const handleAddToCart = async () => {
    setLoadingState(true);

    try {
      const response = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${clickedProduct._id}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isAddedToCart: true,
            quantity: quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      setSnackbar({
        open: true,
        message: "Product added to cart successfully",
        severity: "success",
      });

      await refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to add to cart",
        severity: "error",
      });
    } finally {
      setLoadingState(false);
    }
  };

  const handleRelatedProductAddToCart = async (product) => {
    setRelatedProductsLoadingStates((prev) => ({
      ...prev,
      [product._id]: true,
    }));

    try {
      const response = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/products/${product._id}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isAddedToCart: true,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      setSnackbar({
        open: true,
        message: "Product added to cart successfully",
        severity: "success",
      });

      await refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to add to cart",
        severity: "error",
      });
    } finally {
      setRelatedProductsLoadingStates((prev) => ({
        ...prev,
        [product._id]: false,
      }));
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

  if (!clickedProduct) {
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

  const relatedProducts = data
    .filter((product) => product._id !== clickedProduct._id)
    .slice(0, 4);

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

        <div className="row">
          {/* Product Image */}
          <div className="col-md-6 position-relative mb-4">
            <IconButton
            className="me-2"
              onClick={() => handleWishlist(clickedProduct._id)}
              disabled={wishlistLoading}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "white" },
              }}
            >
              {wishlistLoading ? (
                <CircularProgress size={20} sx={{ color: "gray" }} />
              ) : clickedProduct.isWishlisted ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <img
              src={clickedProduct.productImg}
              alt={clickedProduct.productName}
              className="img-fluid rounded"
              style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
            />
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <Typography variant="h4" component="h1" gutterBottom>
              {clickedProduct.productName}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                4.5
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                ₹{clickedProduct.productPrice * quantity}
              </Typography>
              <Typography
                variant="h6"
                component="span"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  ml: 2,
                }}
              >
                ₹{3999 * quantity}
              </Typography>
              <Typography
                variant="h6"
                component="span"
                sx={{ color: "success.main", ml: 2 }}
              >
                50% off
              </Typography>
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Quantity:
              </Typography>
              <ButtonGroup>
                <Button
                  onClick={() => handleQuantityChange("subtract")}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </Button>
                <Button disabled>{quantity}</Button>
                <Button
                  onClick={() => handleQuantityChange("add")}
                  disabled={quantity >= 10}
                >
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Box>

            {/* Size Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Size:
              </Typography>
              <ToggleButtonGroup
                value={selectedSize}
                exclusive
                onChange={handleSizeChange}
              >
                <ToggleButton value="S">S</ToggleButton>
                <ToggleButton value="M">M</ToggleButton>
                <ToggleButton value="XL">XL</ToggleButton>
                <ToggleButton value="XXL">XXL</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mb: 4 }}>
              <Link to="/products/checkout">
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mb: 2 }}
                  color="primary"
                  disabled={loadingState}
                >
                  {loadingState ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Buy Now"
                  )}
                </Button>
              </Link>
              <Button
                variant="outlined"
                fullWidth
                color="primary"
                onClick={handleAddToCart}
                disabled={loadingState || clickedProduct.isAddedToCart}
              >
                {loadingState ? (
                  <CircularProgress size={24} />
                ) : clickedProduct.isAddedToCart ? (
                  "Added to Cart"
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </Box>

            {/* Delivery Features */}
            <Box sx={{ mb: 4 }}>
              <div className="row">
                <div className="col-6 col-md-3 text-center mb-3">
                  <AssignmentReturnOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 40 }}
                  />
                  <Typography variant="body2">10 days Returnable</Typography>
                </div>
                <div className="col-6 col-md-3 text-center mb-3">
                  <PaymentOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="body2">Pay on Delivery</Typography>
                </div>
                <div className="col-6 col-md-3 text-center mb-3">
                  <LocalShippingOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 40 }}
                  />
                  <Typography variant="body2">Free Delivery</Typography>
                </div>
                <div className="col-6 col-md-3 text-center mb-3">
                  <SecurityOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="body2">Secure Payment</Typography>
                </div>
              </div>
            </Box>

            {/* Product Description */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Description:
              </Typography>
              <ul className="list-unstyled">
                <li className="mb-2">
                  • STYLE REDEFINED: Elevate your look with our versatile Bomber
                  Jacket. Combining timeless design with modern flair, it offers
                  a cool, effortless style and long-lasting durability.
                </li>
                <li className="mb-2">
                  • ALL-WEATHER READY: Stay comfortable in any weather with its
                  wind-resistant and water-repellent features, perfect for
                  transitioning between seasons.
                </li>
                <li className="mb-2">
                  • UNPARALLELED COMFORT: Enjoy a snug, non-restrictive fit and
                  premium materials for a cozy experience year-round.
                </li>
                <li className="mb-2">
                  • VERSATILE ESSENTIAL: Ideal for any occasion, from casual
                  outings to semi-formal events. Pair it with jeans or dress it
                  up—it's a wardrobe staple.
                </li>
                <li className="mb-2">
                  • TRAVEL-FRIENDLY: Lightweight and easy to pack, it's the
                  perfect travel companion for style on the go. Redefine your
                  fashion standards with this chic, versatile jacket.
                </li>
              </ul>
            </Box>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-5">
          <Typography variant="h5" gutterBottom>
            More items you may like in apparel
          </Typography>
          <div className="row">
            {relatedProducts.map((product) => (
              <div key={product._id} className="col-md-3 mb-4">
                <div className="card">
                  <div className="position-relative">
                   
                    <IconButton
                      onClick={() => handleWishlist(clickedProduct._id)}
                      disabled={wishlistLoading}
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 20, // Changed from 10 to 20
                        backgroundColor: "white",
                        "&:hover": { backgroundColor: "white" },
                        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                        padding: 1,
                        zIndex: 1,
                      }}
                    >
                      {relatedWishlistLoadingStates[product._id] ? (
                        <CircularProgress size={20} sx={{ color: "gray" }} />
                      ) : product.isWishlisted ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                    <Link
                      to={`/products/${product.productName}/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={product.productImg}
                        alt={product.productName}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/products/${product.productName}/${product._id}`}
                    >
                      <Typography variant="h6" gutterBottom>
                        {product.productName}
                      </Typography>{" "}
                    </Link>
                    <Typography variant="h6" color="text.primary">
                      ₹{product.productPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => handleRelatedProductAddToCart(product)}
                      disabled={
                        relatedProductsLoadingStates[product._id] ||
                        product.isAddedToCart
                      }
                    >
                      {relatedProductsLoadingStates[product._id] ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : product.isAddedToCart ? (
                        "Added to Cart"
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
}
