

// Profile.js
import React from "react";
import Header from "../Components/Header";
import useFetch from "../useFetch";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";

const API_URL = "https://e-commerce-backend-two-mu.vercel.app";

export default function Profile() {
  const {
    data: response,
    loading,
    error,
  } = useFetch(`${API_URL}/addresses`);

  // Debug logging
  console.log("API URL:", `${API_URL}/addresses`);
  console.log("API Response:", response);
  
  const userAddress = response?.address?.[0];
  console.log("User Address:", userAddress);

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

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading profile: {error}
          <br />
          Please check the console for more details.
        </Alert>
      </Box>
    );
  }

  if (!userAddress) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3 }}>
          <Alert severity="warning">
            No address information found. 
            <br />
            API Response: {JSON.stringify(response, null, 2)}
          </Alert>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box className="container py-5">
        {/* Welcome Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h4" component="h1">
            Welcome!{" "}
            <Typography component="span" variant="h4" color="primary">
              {userAddress.firstName} {userAddress.lastName}
            </Typography>
          </Typography>
        </Box>

        {/* Profile Information Card */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            color="primary"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Profile Information
          </Typography>

          <Grid container spacing={4}>
            {/* Personal Information Section */}
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PersonIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Personal Details</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ ml: 4 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>First Name:</strong> {userAddress.firstName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Last Name:</strong> {userAddress.lastName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {userAddress.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Phone:</strong> {userAddress.phoneNumber}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Address Information Section */}
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <HomeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Address Details</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ ml: 4 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Street:</strong> {userAddress.street}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Town:</strong> {userAddress.town}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Province:</strong> {userAddress.province}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Country:</strong> {userAddress.country}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>ZIP Code:</strong> {userAddress.zip}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Account Information */}
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Account created:{" "}
                  {new Date(userAddress.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last updated:{" "}
                  {new Date(userAddress.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}