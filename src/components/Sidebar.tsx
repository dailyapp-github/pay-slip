// import { List, ListItemButton, ListItemText, Paper } from '@mui/material';

// import { Settings, People, Send } from '@mui/icons-material';

// import { useNavigate, useLocation } from 'react-router-dom';

// export default function Sidebar() {
//   const navigate = useNavigate();

//   const location = useLocation();

//   const menus = [
//     {
//       title: 'Config',
//       path: '/',
//       icon: <Settings />,
//     },

//     {
//       title: 'Recipient',
//       path: '/recipient',
//       icon: <People />,
//     },

//     {
//       title: 'Send Slip',
//       path: '/send-slip',
//       icon: <Send />,
//     },
//   ];

//   return (
//     <Paper
//       sx={{
//         width: 260,
//         borderRadius: 0,
//       }}
//     >
//       <h2
//         style={{
//           padding: 20,
//           textAlign: 'center',
//         }}
//       >
//         Pay Slip
//       </h2>

//       <List>
//         {menus.map((menu) => (
//           <ListItemButton
//             key={menu.path}
//             selected={location.pathname === menu.path}
//             onClick={() => navigate(menu.path)}
//           >
//             {menu.icon}

//             <ListItemText primary={menu.title} sx={{ ml: 2 }} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Paper>
//   );
// }

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

import { Settings, People, Send, AccountCircle } from '@mui/icons-material';

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useAuth();

  const menus = [
    {
      title: 'Config',
      path: '/',
      icon: <Settings />,
    },
    {
      title: 'Recipient',
      path: '/recipient',
      icon: <People />,
    },
    {
      title: 'Send Slip',
      path: '/send-slip',
      icon: <Send />,
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        width: 260,
        height: '100vh',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          Payroll
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Mailer
        </Typography>
      </Box>

      <Divider />

      {/* Menu */}
      <List sx={{ flex: 1, mt: 1 }}>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.path}
            selected={location.pathname === menu.path}
            onClick={() => navigate(menu.path)}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 0.5,

              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: '#fff',

                '& .MuiListItemIcon-root': {
                  color: '#fff',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
              }}
            >
              {menu.icon}
            </ListItemIcon>

            <ListItemText primary={menu.title} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* User */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar>
          <AccountCircle />
        </Avatar>

        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {user?.username}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {user?.role}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
