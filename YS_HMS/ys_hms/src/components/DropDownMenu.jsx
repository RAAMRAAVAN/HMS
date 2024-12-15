// DropdownMenu.js
import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Info, InfoOutlined, Lock, LockOpen, LockOutlined, Logout, PermIdentity, Person } from '@mui/icons-material';

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ color: 'white' }}
      >
        Admin
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><PermIdentity/><Typography style={{marginLeft:"20px"}}>Profile</Typography></MenuItem>
        <MenuItem onClick={handleClose}><LockOpen/> <Typography style={{marginLeft:"20px"}}>Change Password</Typography></MenuItem>
        <MenuItem onClick={handleClose}> <LockOutlined/> <Typography style={{marginLeft:"20px"}}>Lock Screen</Typography></MenuItem>
        <MenuItem onClick={handleClose}> <InfoOutlined/> <Typography style={{marginLeft:"20px"}}>About</Typography></MenuItem>
        <MenuItem onClick={handleClose}> <Logout/> <Typography style={{marginLeft:"20px"}}>Logout</Typography></MenuItem>
      </Menu>
    </div>
  );
};

