import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/audiences">Audiences</Button>
        <Button color="inherit" component={Link} to="/campaigns">Campaigns</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
