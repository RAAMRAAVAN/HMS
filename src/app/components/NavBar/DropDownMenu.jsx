// DropdownMenu.js
'use client';
import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Info, InfoOutlined, Lock, LockOpen, LockOutlined, Logout, PermIdentity, Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsAsync, selectUserDetails } from '@/src/lib/features/userLoginDetails/userSlice';
import { useRouter } from 'next/navigation';
// import { signOut } from "next-auth/react";

export const DropdownMenu = (props) => {
  const {setLogin} = props
  const router = useRouter()
  const dispatch = useDispatch()
  const UserDetails = useSelector(selectUserDetails);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userName', "");
      // setLogin(false);
      handleClose();
      window.location.reload();
    }
  }

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
        {UserDetails.FirstName}
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
        <MenuItem onClick={handleLogout}> <Logout/> <Typography style={{marginLeft:"20px"}}>Logout</Typography></MenuItem>
      </Menu>
    </div>
  );
};

