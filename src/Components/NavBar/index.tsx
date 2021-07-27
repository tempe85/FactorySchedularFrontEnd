import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon, Language } from "@material-ui/icons";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { LoginModal } from "../Login";

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
}

export function NavBar(props: IProps) {
  const [language, setLanguage] = useState("English");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

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
          <Button color="inherit">Home Page</Button>
          <Typography variant="h6" className={classes.title}></Typography>
          <Button color="inherit" onClick={openLoginModal}>
            Log Out
          </Button>
          <Button color="inherit">Schedule</Button>
          <Button color="inherit" title="View current Work Area schedules">
            Work Areas
          </Button>
          <Button
            variant="contained"
            color="primary"
            aria-controls="language-menu"
            aria-haspopup="true"
            onClick={handleClick}
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
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>English</MenuItem>
            <MenuItem onClick={handleClose}>Spanish</MenuItem>
            <MenuItem onClick={handleClose}>French</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <LoginModal isOpen={isLoginModalOpen} toggle={toggleLoginModal} />
      {props.children}
    </>
  );
}

export default NavBar;
