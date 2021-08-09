import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon, Language, Colorize } from "@material-ui/icons";
import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { LoginModal } from "../Login";
import { LanguageType } from "../../Enums/LanguageType";
import { LanguageContext } from "../../Contexts/LanguageContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { withUser } from "../../HOC/withUser";
import { AuthContextPropsExtended } from "../../Interfaces/AuthContextPropsExtended";
import { IUserProps } from "../../Interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface IProps {
  children: React.ReactNode;
  language: LanguageType;
}

export function NavBar({ children, language, auth }: IProps & IUserProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const languageContext = useContext(LanguageContext);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuClicked = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuItemClicked = (language: LanguageType) => {
    languageContext.setLanguage(language);
    handleLanguageMenuClose();
  };

  const handleSignout = async () => {
    try {
      await auth.userManager.signoutRedirect("http://localhost:3000");
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const handleLogin = async () => {
    try {
      await auth.signIn();
    } catch (e) {
      toast.error(
        `Unable to login, no response from Authentication service! ${e}`,
        {
          autoClose: false,
        }
      );
    }
  };

  const isLoggedIn = auth && auth.userData;

  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">
            {" "}
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home Page
            </Link>
          </Button>
          <Typography variant="h6" className={classes.title}></Typography>
          {auth && auth.userData ? (
            <>
              <span>{auth.userData.profile.name}</span>
              <Button color="inherit" onClick={() => handleSignout()}>
                Log Out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Log In
            </Button>
          )}
          {isLoggedIn && (
            <Button color="inherit">
              {" "}
              <Link
                to="/Schedule"
                style={{ textDecoration: "none", color: "white" }}
              >
                Schedule
              </Link>
            </Button>
          )}
          <Button color="inherit" title="View current Work Area schedules">
            <Link
              to="/WorkAreas"
              style={{ textDecoration: "none", color: "white" }}
            >
              Work Areas
            </Link>
          </Button>
          <Button
            variant="contained"
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleLanguageMenuClicked}
            style={{ width: "120px" }}
          >
            <ArrowDropDownIcon />
            <Language />
            {language}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem
              onClick={() =>
                handleLanguageMenuItemClicked(LanguageType.English)
              }
            >
              English
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleLanguageMenuItemClicked(LanguageType.Spanish)
              }
            >
              Spanish
            </MenuItem>
            <MenuItem
              onClick={() => handleLanguageMenuItemClicked(LanguageType.French)}
            >
              French
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <LoginModal isOpen={isLoginModalOpen} toggle={toggleLoginModal} />
      {children}
    </>
  );
}

export default withUser(NavBar);
