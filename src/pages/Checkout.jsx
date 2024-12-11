import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";

// MUI Icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export default function Checkout() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka",
    streetAddress: "",
    townCity: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
    paymentMethod: "directBankTransfer",
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch addresses
  const {
    data: addressesResponse,
    loading: addressesLoading,
    error: addressesError,
    refetch: refetchAddresses,
  } = useFetch("https://e-commerce-backend-two-mu.vercel.app/addresses");

  const addresses = addressesResponse?.address || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Check that all required fields are filled (not empty)
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "streetAddress",
      "townCity",
      "province",
      "zipCode",
      "phone",
      "email",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        errors[field] = "This field is required";
      }
    });

    // Only validate format for email and phone
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      companyName: address.companyName || "",
      country: address.country,
      streetAddress: address.streetAddress,
      townCity: address.townCity,
      province: address.province,
      zipCode: address.zipCode,
      phone: address.phone,
      email: address.email,
      additionalInfo: address.additionalInfo || "",
      paymentMethod: formData.paymentMethod,
    });
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      companyName: address.companyName || "",
      country: address.country,
      streetAddress: address.streetAddress,
      townCity: address.townCity,
      province: address.province,
      zipCode: address.zipCode,
      phone: address.phone,
      email: address.email,
      additionalInfo: address.additionalInfo || "",
      paymentMethod: formData.paymentMethod,
    });
    setEditDialog(true);
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setDeleteDialog(true);
  };

  const handleEditSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(
          `https://e-commerce-backend-two-mu.vercel.app/addresses/${editingAddress._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setSnackbar({
            open: true,
            message: "Address updated successfully!",
            severity: "success",
          });
          setEditDialog(false);
          refetchAddresses();
        } else {
          throw new Error("Failed to update address");
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to update address",
          severity: "error",
        });
      }
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-backend-two-mu.vercel.app/addresses/${addressToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Address deleted successfully!",
          severity: "success",
        });
        setDeleteDialog(false);
        refetchAddresses();
        if (selectedAddress?._id === addressToDelete._id) {
          setSelectedAddress(null);
        }
      } else {
        throw new Error("Failed to delete address");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete address",
        severity: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email and phone format
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;
    
    const isEmailValid = emailRegex.test(formData.email.trim());
    const isPhoneValid = phoneRegex.test(formData.phone.replace(/\D/g, ""));
  
    if (!isEmailValid || !isPhoneValid) {
      setFormErrors({
        ...formErrors,
        email: !isEmailValid ? "Please enter a valid email address" : "",
        phone: !isPhoneValid ? "Please enter a valid 10-digit phone number" : "",
      });
      
      setSnackbar({
        open: true,
        message: "Please correct the email and phone number format",
        severity: "error",
      });
      return;
    }
  
    // Check if at least either a saved address is selected or form is filled
    const isFormFilled = formData.firstName && 
                        formData.lastName && 
                        formData.country && 
                        formData.streetAddress && 
                        formData.townCity && 
                        formData.province && 
                        formData.zipCode;
  
    if (!selectedAddress && !isFormFilled) {
      setSnackbar({
        open: true,
        message: "Please either select a saved address or fill in the form",
        severity: "error",
      });
      return;
    }
  
    try {
      // Submit new address
      const addressPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        street: formData.streetAddress,
        town: formData.townCity,
        province: formData.province,
        zip: Number(formData.zipCode),
        phoneNumber: Number(formData.phone),
        email: formData.email
      };
  
      const response = await fetch('https://e-commerce-backend-two-mu.vercel.app/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressPayload)
      });
  
      if (!response.ok) {
        throw new Error('Failed to save address');
      }
  
      // Show success message
      setSnackbar({
        open: true,
        message: "Order placed successfully!",
        severity: "success", 
      });
  
      // Clear cart and navigate after success
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          country: "Sri Lanka",
          streetAddress: "",
          townCity: "",
          province: "",
          zipCode: "",
          phone: "",
          email: "",
          additionalInfo: "",
          paymentMethod: "directBankTransfer",
        });
        navigate("/");
      }, 2000);
  
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to place order",
        severity: "error",
      });
    }
  };


  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Header />
      <Box className="container py-5">
      <Box sx={{ mb: 4 }}>
  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
    <Link
      href="/products"
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        textDecoration: "none",
      }}
    >
      Products
    </Link>
    <Typography color="text.primary">Checkout</Typography>
  </Breadcrumbs>
</Box>

        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Checkout
        </Typography>

        {/* Saved Addresses Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Saved Addresses
          </Typography>
          {addressesLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          ) : addressesError ? (
            <Alert severity="error">Failed to load addresses</Alert>
          ) : addresses.length === 0 ? (
            <Alert severity="info">No saved addresses found</Alert>
          ) : (
            <div className="row">
              {addresses.map((address) => (
                <div key={address._id} className="col-md-6 mb-3">
                  <Card
                    sx={{
                      cursor: "pointer",
                      border: selectedAddress?._id === address._id ? 2 : 1,
                      borderColor:
                        selectedAddress?._id === address._id
                          ? "primary.main"
                          : "divider",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <Box
                          onClick={() => handleAddressSelect(address)}
                          sx={{ flexGrow: 1 }}
                        >
                          {selectedAddress?._id === address._id ? (
                            <RadioButtonCheckedIcon color="primary" />
                          ) : (
                            <RadioButtonUncheckedIcon />
                          )}
                          <Typography variant="h6">
                            {address.firstName} {address.lastName}
                          </Typography>
                          <Typography variant="body2">
                            {address.streetAddress}
                          </Typography>
                          <Typography variant="body2">
                            {address.townCity}, {address.province}
                          </Typography>
                          <Typography variant="body2">
                            {address.country}, {address.zipCode}
                          </Typography>
                          <Typography variant="body2">
                            {address.phone}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton onClick={() => handleEditClick(address)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(address)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Box>

        <div className="row mt-5">
          {/* Billing Details Form */}
          <div className="col-md-8">
            <Paper className="p-4">
              <Typography variant="h5" gutterBottom>
                Billing details
              </Typography>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.lastName}
                      helperText={formErrors.lastName}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Company Name (Optional)"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <FormControl fullWidth error={!!formErrors.country}>
                      <InputLabel>Country / Region</InputLabel>
                      <Select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        label="Country / Region"
                        required
                      >
                        <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Street Address"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.streetAddress}
                      helperText={formErrors.streetAddress}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Town / City"
                      name="townCity"
                      value={formData.townCity}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.townCity}
                      helperText={formErrors.townCity}
                    />
                  </div>
                  <div className="col-12">
                    <FormControl fullWidth error={!!formErrors.province}>
                      <InputLabel>Province</InputLabel>
                      <Select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        label="Province"
                        required
                      >
                        <MenuItem value="Western Province">
                          Western Province
                        </MenuItem>
                        <MenuItem value="Central Province">
                          Central Province
                        </MenuItem>
                        <MenuItem value="Southern Province">
                          Southern Province
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="ZIP Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.zipCode}
                      helperText={formErrors.zipCode}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.phone}
                      helperText={formErrors.phone}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Additional Information"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                    />
                  </div>
                </div>
              </form>
            </Paper>
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <Paper className="p-4">
              <Typography variant="h5" gutterBottom>
                Your Order
              </Typography>
              <Box sx={{ my: 3 }}>
                <div className="d-flex justify-content-between mb-2">
                  <Typography variant="subtitle1">Product</Typography>
                  <Typography variant="subtitle1">Subtotal</Typography>
                </div>
                <Divider />
                <div className="d-flex justify-content-between my-2">
                  <Typography color="text.secondary">
                    Asgaard sofa × 1
                  </Typography>
                  <Typography>Rs. 250,000.00</Typography>
                </div>
                <Divider />
                <div className="d-flex justify-content-between my-2">
                  <Typography>Subtotal</Typography>
                  <Typography>Rs. 250,000.00</Typography>
                </div>
                <Divider />
                <div className="d-flex justify-content-between my-2">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    Rs. 250,000.00
                  </Typography>
                </div>
              </Box>

              <FormControl component="fieldset">
                <RadioGroup
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="directBankTransfer"
                    control={<Radio />}
                    label="Direct Bank Transfer"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 4, mb: 2 }}
                  >
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </Typography>

                  <FormControlLabel
                    value="cashOnDelivery"
                    control={<Radio />}
                    label="Cash On Delivery"
                  />
                </RadioGroup>
              </FormControl>

              <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <Link href="/privacy-policy" color="primary">
                  privacy policy
                </Link>
                .
              </Typography>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Place order
              </Button>
            </Paper>
          </div>
        </div>
      </Box>

      {/* Edit Address Dialog */}
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <div className="row g-3">
              <Dialog
                open={editDialog}
                onClose={() => setEditDialog(false)}
                maxWidth="md"
                fullWidth
              >
                <DialogTitle>Edit Address</DialogTitle>
                <DialogContent>
                  <Box sx={{ pt: 2 }}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          error={!!formErrors.firstName}
                          helperText={formErrors.firstName}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          error={!!formErrors.lastName}
                          helperText={formErrors.lastName}
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Company Name (Optional)"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <FormControl fullWidth error={!!formErrors.country}>
                          <InputLabel>Country / Region</InputLabel>
                          <Select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            label="Country / Region"
                            required
                          >
                            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                            <MenuItem value="India">India</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Street Address"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          required
                          error={!!formErrors.streetAddress}
                          helperText={formErrors.streetAddress}
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Town / City"
                          name="townCity"
                          value={formData.townCity}
                          onChange={handleInputChange}
                          required
                          error={!!formErrors.townCity}
                          helperText={formErrors.townCity}
                        />
                      </div>
                      <div className="col-12">
                        <FormControl fullWidth error={!!formErrors.province}>
                          <InputLabel>Province</InputLabel>
                          <Select
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            label="Province"
                            required
                          >
                            <MenuItem value="Western Province">
                              Western Province
                            </MenuItem>
                            <MenuItem value="Central Province">
                              Central Province
                            </MenuItem>
                            <MenuItem value="Southern Province">
                              Southern Province
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="ZIP Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          error={!!formErrors.zipCode}
                          helperText={formErrors.zipCode}
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          error={!!formErrors.phone}
                          helperText={formErrors.phone}
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          error={!!formErrors.email}
                          helperText={formErrors.email}
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          fullWidth
                          label="Additional Information"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          multiline
                          rows={4}
                        />
                      </div>
                    </div>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setEditDialog(false)}>Cancel</Button>
                  <Button onClick={handleEditSubmit} variant="contained">
                    Save Changes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Address</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this address?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}


// User Story:
// Home Page
// A landing page with a list of featured categories.
// If you click on any one of the categories I will be redirected to the product list page with that selected category.
// Product Listing Page
// A product listing page where all the products are listed with a section of filters.
// Multiple filters on the product listing page including.
// Category: A checkbox with various categories according to the theme.
// Ratings: A slider for ratings.
// A button to clear filters from where you can clear all the applied filters.
// On the product cards, you should see two call-to-action buttons,
// Add to Cart: "Add to Cart" primary button should be present.
// Add to Wishlist: "Add to Wishlist" secondary button or "Wishlist" secondary icon button should be present.
// 3. Sort by Price

// 1. Along with the multiple filters on the product listing page on the sidebar, add a feature to sort products by price,

// Price: A radio button to sort from low to high & high to low.

// 4. Product Detail Page

// If you click on any product you should be redirected to a single product page with all its details & the "Addto Cart" & "Add to Wishlist" buttons.
// 5. Wishlist Management

// From the navbar, you can navigate to your wishlist where all the products that you liked and wish to buy in future are mentioned.
// On the product card,
// You can remove the item from the wishlist
// Add the item to the cart
// If the cart already contains that item, it should only increasing the quantity.
// 6. Cart Management

// From the navbar, you can navigate to the cart where all the products that you want to buy are mentioned.
// On the product card,
// You can see the quantity of a particular product.
// You can Increase or Decrease the quantity of a particular product.
// Remove the product from the cart
// Add the product to the Wishlist
// You can see the price details card of the cart containing a button to checkout which will show the total price of the products with its quantity.
// 7. Address Management

// You can add multiple addresses, update or delete them.
// You can choose a single address to deliver the order.
// 8. Checkout

// Once you choose the address, you can click on the checkout button which would show the order summary.
// 9. User Profile

// You can see the user profile with details containing the name, email Id, phone number, address, etc.
// 10. Loading & Alerts

// You can see loading messages when the data i.e. the products are loading.
// You can see the acknowledgement alerts whenever you,
// Add item to the cart
// Remove Item from the cart
// Increase or Decrease item in the cart
// Move an item from the cart to the wishlist
// Add item to the wishlist
// Remove Item from the wishlist
// Move an item from wishlist to cart
// 11. Search

// You can search for an item from the product list via the input text box on the header navbar.


// Prototypes for reference:
// These prototypes are provided for reference. You can choose to modify as per your wish but the design should be clean as shown below. Refer to bootstrap for various component designs and colors.

