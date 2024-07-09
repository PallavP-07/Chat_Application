import React, { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VisualHiddenInput from "../Components/StyledInputComp";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [image, setImage] = useState("");

  const toggleLogin = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 4,
            justifyContent: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography>Login</Typography>
              <Stack>
                <ContactEmergencyIcon
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "contain",
                  }}
                />
              </Stack>
              <form>
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                  sx={{
                    marginTop: 2,
                  }}
                />
                <TextField
                  variant="outlined"
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  sx={{
                    marginTop: 2,
                  }}
                />
                <Button variant="contained" sx={{ marginTop: 4 }}>
                  Login
                </Button>
              </form>

              <Typography sx={{ paddingTop: 3 }}>
                you don't have account{" "}
                <span onClick={toggleLogin}>Register</span>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="5">Register</Typography>
              <form>
                <div>
                  <Stack
                    position={"relative"}
                    alignItems={"center"}
                    width={"10rem"}
                    margin={"auto"}
                  >
                    {image ? (
                      <div>
                          <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            style={{
                              height: "100%",
                              objectFit: "cover",
                              width:"8rem",
                              borderRadius:"6rem"
                            }}
                          />
                        <IconButton
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            color: "white",
                            bgcolor: "rgba(0, 0, 0, 0.8)",
                            ":hover": {
                              bgcolor: "rgba(0, 0, 1,1)",
                            },
                            marginRight: 4,
                            marginBottom: 1,
                          }}
                          component="label"
                        >
                          <CameraAltIcon />
                          <VisualHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </IconButton>
                      </div>
                    ) : (
                      <div>
                        <AccountCircleRoundedIcon
                          sx={{
                            width: "8rem",
                            height: "auto",
                            color: "gray",
                            objectFit: "contain",
                          }}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            color: "white",
                            bgcolor: "rgba(0, 0, 0, 0.8)",
                            ":hover": {
                              bgcolor: "rgba(0, 0, 1,1)",
                            },
                            marginRight: 4,
                            marginBottom: 1,
                          }}
                          component="label"
                        >
                          <CameraAltIcon />
                          <VisualHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </IconButton>
                      </div>
                    )}
                  </Stack>
                </div>
                <TextField
                  id="outlined-basic"
                  label="user name"
                  variant="outlined"
                  type="text"
                  required
                  fullWidth
                  sx={{
                    marginTop: 2,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  fullWidth
                  sx={{
                    marginTop: 2,
                  }}
                />
                <TextField
                  variant="outlined"
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  required
                  sx={{
                    marginTop: 2,
                  }}
                />
                <TextField
                  variant="outlined"
                  id="outlined-password-input"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  required
                  sx={{
                    marginTop: 2,
                  }}
                />

                <Button
                  sx={{
                    marginTop: 2,
                  }}
                  variant="contained"
                >
                  Register
                </Button>
              </form>
              <Typography sx={{ paddingTop: 3 }}>
                you already have account
                <span onClick={toggleLogin}> Login</span>
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Login;
