import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ColorModeSelect from "../theme/ColorModeSelect";
import Transition from "../ui/Transition";

const drawerWidth = 220;

const ContentHeader = styled(AppBar)(({ theme }) => ({
  height: "10vh",
  width: "100%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
}));

const ContentMain = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  // width: "100%",
  padding: theme.spacing(2),
  paddingTop: "12vh",
  backgroundColor: theme.palette.background.default,
}));

const TitleStyle = styled("h1")(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "2rem",
  margin: 0,
}));

export default function Layout() {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const location = useLocation();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const islogout = await logout();
    if (islogout) {
      navigate("/");
    }
  };

  const menuItems = [
    { text: "Productos", path: "/system/home" },
    { text: "Inventario", path: "/system/products" },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              <ListItemText
                sx={{
                  fontWeight:
                    location.pathname === item.path ? "bold" : "normal",
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {isMobile && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <ContentHeader position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <IoMenu />
              </IconButton>
            )}
            <TitleStyle
              sx={{
                fontSize: isMobile ? "1rem" : "2rem",
              }}
            >
              Mi Aplicacion
            </TitleStyle>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ColorModeSelect />

            {!isMobile && (
              <Avatar
                alt={user?.username}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56, cursor: "pointer" }}
                onClick={handleAvatarClick}
              />
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {user?.username}
                </Typography>
              </Box>
              <Divider sx={{ borderStyle: "dashed" }} />
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </ContentHeader>

      {isMobile ? (
        <Drawer
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              top: "10vh",
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.2),
              backdropFilter: "blur(8px)",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              top: "10vh",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <ContentMain
        sx={{
          width: `calc(100% - ${isMobile ? 0 : drawerWidth}px)`,
          transition: "margin-left 0.3s",
        }}
      >
        <Transition>
          <Outlet />
        </Transition>
      </ContentMain>
    </Box>
  );
}
