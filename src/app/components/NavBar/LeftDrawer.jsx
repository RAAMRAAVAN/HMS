import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export const LeftDrawer = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  const menuItems = [
    { text: 'Dashboard', route: '/' },
    { text: 'Admin Module', route: '/admin' },
    { text: 'Master Module', route: '/master' },
    { text: 'Appointment Module', route: '/appointment' },
    { text: 'OPD Module', route: '/opd' },
    { text: 'IPD Module', route: '/pages/IPDModule' },
    { text: 'IPD List', route: '/ipd-list' },
    { text: 'OT Module', route: '/ot' },
    { text: 'LAB Module', route: '/lab' },
    { text: 'Pharmacy Module', route: '/pharmacy' },
    { text: 'Nurse Module', route: '/nurse' },
    { text: 'HR Module', route: '/hr' },
    { text: 'Cafeteria Module', route: '/cafeteria' },
    { text: 'Store Module', route: '/store' },
    { text: 'Accounts Module', route: '/accounts' },
    { text: 'Voucher Module', route: '/voucher' },
    { text: 'Website Module', route: '/website' },
    { text: 'Report Module', route: '/report' },
    { text: 'System Module', route: '/system' },
    { text: 'Logout', route: '/logout' },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => router.push(item.route)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Switch 
        color="secondary" 
        checked={open} 
        onChange={(e) => toggleDrawer(e.target.checked)()} 
      />
      <Drawer open={open} onClose={toggleDrawer(false)} sx={{top: '64px'}}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
