// // import React, { useState } from "react";
// // import Button from "@mui/material/Button";
// // import {
// //   AppBar,
// //   Toolbar,
// //   IconButton,
// //   Drawer,
// //   List,
// //   ListItem,
// //   TextField,
// //   Box,
// //   Container,
// // } from "@mui/material";
// // import {
// //   Menu as MenuIcon,
// //   Search as SearchIcon,
// //   ShoppingCart as CartIcon,
// //   Favorite as FavoriteIcon,
// //   AccountCircle as ProfileIcon,
// // } from "@mui/icons-material";
// // import { Link } from "react-router-dom";


// // const Header = () => {
// //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// //   const [isSearchOpen, setIsSearchOpen] = useState(false);

// //   const toggleDrawer = () => {
// //     setIsDrawerOpen(!isDrawerOpen);
// //   };

// //   const toggleSearch = () => {
// //     setIsSearchOpen(!isSearchOpen);
// //   };

// //   return (
// //     <>
// //       <AppBar
// //         position="static"
// //         sx={{ backgroundColor: "#5B3EEF" }}
// //         color="default"
// //       >
// //         <Container maxWidth="xl">
// //           <Toolbar
// //             disableGutters
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
// //             className="container"
// //           >
// //             {/* Logo */}
// //             <Box sx={{ display: "flex", alignItems: "center" }}>
// //               <a href="/"><img
// //                 src="https://genshinfans.com/cdn/shop/files/logogenshin_shop.png?v=1693905358&width=300"
// //                 alt="Brand Logo"
// //                 style={{
// //                   height: "18px",
// //                   display: { xs: "block", md: "block" },
// //                 }}
// //               /></a>
// //             </Box>

// //             {/* Search Bar (Desktop) */}

// //             <Box
// //               sx={{
// //                 flexGrow: 1,
// //                 display: { xs: "none", md: "flex" },
// //                 justifyContent: "center",
// //                 mx: 2,
// //               }}
// //             >
// //               <TextField
// //                 variant="outlined"
// //                 placeholder="Search..."
// //                 size="small"
// //                 sx={{
// //                   width: "400px",
// //                   backgroundColor: "white",
// //                   "& .MuiOutlinedInput-root": {
// //                     borderRadius: "0px", // Make it round
// //                     "& fieldset": {
// //                       borderRadius: "0px", // Also ensure the fieldset is round
// //                     },
// //                   },
// //                 }}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
// //                       <SearchIcon sx={{ color: "black" }} />
// //                     </Box>
// //                   ),
// //                 }}
// //               />
// //             </Box>

// //             <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
// //               <Button
// //                 sx={{
// //                   backgroundColor: "white",
// //                   color: "#5B3EEF",
// //                   "&:hover": { backgroundColor: "lightgray" },
// //                   mr: 1, // Add margin to the right of the login button
// //                 }}
// //                 variant="contained"
// //               >
// //                 Login
// //               </Button>
// //             </Box>
// //             {/* Mobile Search Icon */}
// //             <Box
// //               sx={{
// //                 display: { xs: "flex", md: "none" },
// //                 alignItems: "center",
// //               }}
// //             >
// //               <IconButton onClick={toggleSearch}>
// //                 <SearchIcon sx={{ color: "white" }} />
// //               </IconButton>
// //             </Box>

// //             {/* Right Icons */}
// //             <Box
// //               sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
// //             >
// //               <IconButton>
// //                 <Link to="/products/cart"><CartIcon  sx={{ color: "white" }} /></Link>
// //               </IconButton>
// //               <IconButton>
// //                 <Link to="/products/wishlist"><FavoriteIcon sx={{ color: "white" }} /></Link>
// //               </IconButton>
// //               <IconButton>
// //                 <Link to="/profile"><ProfileIcon sx={{ color: "white" }} /></Link>
// //               </IconButton>
// //             </Box>

// //             {/* Mobile Menu Toggle */}
// //             <Box sx={{ display: { xs: "flex", md: "none" } }}>
// //               <IconButton onClick={toggleDrawer}>
// //                 <MenuIcon sx={{ color: "white" }} />
// //               </IconButton>
// //             </Box>
// //           </Toolbar>
// //         </Container>
// //       </AppBar>

// //       {/* Mobile Search Drawer */}
// //       {isSearchOpen && (
// //         <Box
// //           sx={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             width: "100%",
// //             zIndex: 1300,
// //             bgcolor: "white",
// //             p: 2,
// //           }}
// //         >
// //           <Box sx={{ display: "flex", alignItems: "center" }}>
// //             <TextField
// //               fullWidth
// //               variant="outlined"
// //               placeholder="Search..."
// //               size="small"
// //               sx={{ mr: 1 }}
// //             />
// //             <IconButton onClick={toggleSearch}>
// //               <SearchIcon />
// //             </IconButton>
// //           </Box>
// //         </Box>
// //       )}

// //       {/* Mobile Side Drawer */}
// //       <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
// //         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
// //           <List>
// //             <ListItem>
// //               <IconButton>
// //                 <ProfileIcon /> Profile
// //               </IconButton>
// //             </ListItem>
// //             <ListItem>
// //               <IconButton>
// //                 <FavoriteIcon /> Favorites
// //               </IconButton>
// //             </ListItem>
// //             <ListItem>
// //               <IconButton>
// //                 <CartIcon /> Cart
// //               </IconButton>
// //             </ListItem>
// //           </List>
// //         </Box>
// //       </Drawer>
// //     </>
// //   );
// // };

// // export default Header;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   TextField,
//   Box,
//   Container,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   ShoppingCart as CartIcon,
//   Favorite as FavoriteIcon,
//   AccountCircle as ProfileIcon,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import useFetch from "../useFetch";

// const Header = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const { data, loading } = useFetch(
//     "https://e-commerce-backend-two-mu.vercel.app/products"
//   );

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const toggleSearch = () => {
//     setIsSearchOpen(!isSearchOpen);
//   };

//   const handleSearch = (e) => {
//     if ((e.type === 'click') || (e.key === 'Enter')) {
//       e.preventDefault();
//       if (!searchTerm.trim() || loading) return;
      
//       if (data) {
//         const searchQuery = searchTerm.toLowerCase().trim();
//         const filteredProducts = data.filter(product => 
//           product.productName.toLowerCase().includes(searchQuery) ||
//           (product.description && product.description.toLowerCase().includes(searchQuery))
//         );
        
//         navigate('/search', { 
//           state: { 
//             searchResults: filteredProducts,
//             searchTerm: searchTerm.trim()
//           }
//         });
        
//         setSearchTerm('');
//         if (isSearchOpen) {
//           toggleSearch();
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <AppBar position="static" sx={{ backgroundColor: "#5B3EEF" }} color="default">
//         <Container maxWidth="xl">
//           <Toolbar
//             disableGutters
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//             className="container"
//           >
//             {/* Logo */}
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Link to="/">
//                 <img
//                   src="https://genshinfans.com/cdn/shop/files/logogenshin_shop.png?v=1693905358&width=300"
//                   alt="Brand Logo"
//                   style={{
//                     height: "18px",
//                     display: { xs: "block", md: "block" },
//                   }}
//                 />
//               </Link>
//             </Box>

//             {/* Search Bar (Desktop) */}
//             <Box
//               sx={{
//                 flexGrow: 1,
//                 display: { xs: "none", md: "flex" },
//                 justifyContent: "center",
//                 mx: 2,
//               }}
//             >
//               <TextField
//                 variant="outlined"
//                 placeholder="Search..."
//                 size="small"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') handleSearch(e);
//                 }}
//                 sx={{
//                   width: "400px",
//                   backgroundColor: "white",
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "0px",
//                     "& fieldset": {
//                       borderRadius: "0px",
//                     },
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <IconButton 
//                       onClick={handleSearch}
//                       size="small"
//                       sx={{ mr: 1 }}
//                     >
//                       <SearchIcon sx={{ color: "black" }} />
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Box>

//             {/* Rest of the header components remain the same */}
//             <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
//               <Button
//                 sx={{
//                   backgroundColor: "white",
//                   color: "#5B3EEF",
//                   "&:hover": { backgroundColor: "lightgray" },
//                   mr: 1,
//                 }}
//                 variant="contained"
//               >
//                 Login
//               </Button>
//             </Box>

//             {/* Mobile Search Icon */}
//             <Box
//               sx={{
//                 display: { xs: "flex", md: "none" },
//                 alignItems: "center",
//               }}
//             >
//               <IconButton onClick={toggleSearch}>
//                 <SearchIcon sx={{ color: "white" }} />
//               </IconButton>
//             </Box>

//             {/* Right Icons */}
//             <Box
//               sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
//             >
//               <IconButton>
//                 <Link to="/products/cart">
//                   <CartIcon sx={{ color: "white" }} />
//                 </Link>
//               </IconButton>
//               <IconButton>
//                 <Link to="/products/wishlist">
//                   <FavoriteIcon sx={{ color: "white" }} />
//                 </Link>
//               </IconButton>
//               <IconButton>
//                 <Link to="/profile">
//                   <ProfileIcon sx={{ color: "white" }} />
//                 </Link>
//               </IconButton>
//             </Box>

//             {/* Mobile Menu Toggle */}
//             <Box sx={{ display: { xs: "flex", md: "none" } }}>
//               <IconButton onClick={toggleDrawer}>
//                 <MenuIcon sx={{ color: "white" }} />
//               </IconButton>
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Mobile Search Drawer */}
//       {isSearchOpen && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             zIndex: 1300,
//             bgcolor: "white",
//             p: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Search..."
//               size="small"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleSearch(e);
//               }}
//               sx={{ mr: 1 }}
//             />
//             <IconButton onClick={handleSearch}>
//               <SearchIcon />
//             </IconButton>
//           </Box>
//         </Box>
//       )}

//       {/* Mobile Side Drawer */}
//       <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
//           <List>
//             <ListItem>
//               <IconButton component={Link} to="/profile">
//                 <ProfileIcon /> Profile
//               </IconButton>
//             </ListItem>
//             <ListItem>
//               <IconButton component={Link} to="/products/wishlist">
//                 <FavoriteIcon /> Favorites
//               </IconButton>
//             </ListItem>
//             <ListItem>
//               <IconButton component={Link} to="/products/cart">
//                 <CartIcon /> Cart
//               </IconButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  TextField,
  Box,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    "https://e-commerce-backend-two-mu.vercel.app/products"
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    if ((e.type === 'click') || (e.key === 'Enter')) {
      e.preventDefault();
      if (!searchTerm.trim() || loading) return;
      
      if (data) {
        const searchQuery = searchTerm.toLowerCase().trim();
        const filteredProducts = data.filter(product => 
          product.productName.toLowerCase().includes(searchQuery) ||
          (product.description && product.description.toLowerCase().includes(searchQuery))
        );
        
        navigate('/search', { 
          state: { 
            searchResults: filteredProducts,
            searchTerm: searchTerm.trim()
          }
        });
        
        setSearchTerm('');
        if (isSearchOpen) {
          toggleSearch();
        }
      }
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#5B3EEF" }} color="default">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="container"
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/">
                <img
                  src="https://genshinfans.com/cdn/shop/files/logogenshin_shop.png?v=1693905358&width=300"
                  alt="Brand Logo"
                  style={{
                    height: "18px",
                    display: { xs: "block", md: "block" },
                  }}
                />
              </Link>
            </Box>

            {/* Search Bar (Desktop) */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                mx: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch(e);
                }}
                sx={{
                  width: "400px",
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    "& fieldset": {
                      borderRadius: "0px",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <IconButton 
                      onClick={handleSearch}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <SearchIcon sx={{ color: "black" }} />
                    </IconButton>
                  ),
                }}
              />
            </Box>

            {/* Login Button */}
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#5B3EEF",
                  "&:hover": { backgroundColor: "lightgray" },
                  mr: 1,
                }}
                variant="contained"
                onClick={() => {
                  if (isLoggedIn) {
                    alert("You're already logged in");
                  } else {
                    // Perform login logic here
                    setIsLoggedIn(true);
                  }
                }}
              >
                {isLoggedIn ? "Logged In" : "Login"}
              </Button>
            </Box>

            {/* Mobile Search Icon */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
              }}
            >
              <IconButton onClick={toggleSearch}>
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>

            {/* Right Icons */}
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <IconButton>
                <Link to="/products/cart">
                  <CartIcon sx={{ color: "white" }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link to="/products/wishlist">
                  <FavoriteIcon sx={{ color: "white" }} />
                </Link>
              </IconButton>
              <IconButton>
                <Link to="/profile">
                  <ProfileIcon sx={{ color: "white" }} />
                </Link>
              </IconButton>
            </Box>

            {/* Mobile Menu Toggle */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Search Drawer */}
      {isSearchOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1300,
            bgcolor: "white",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(e);
              }}
              sx={{ mr: 1 }}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Mobile Side Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem>
              <IconButton component={Link} to="/profile">
                <ProfileIcon /> Profile
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton component={Link} to="/products/wishlist">
                <FavoriteIcon /> Favorites
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton component={Link} to="/products/cart">
                <CartIcon /> Cart
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;