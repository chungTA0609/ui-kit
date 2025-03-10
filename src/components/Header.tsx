"use client"

import { AppBar, Toolbar, Typography, Button, IconButton, Switch, FormControlLabel } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar className="header__toolbar">
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" className="header__menu-button">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" className="header__title">
          My App
        </Typography>
        <div className="header__actions">
          <FormControlLabel
            className="header__theme-switch"
            control={<Switch checked={darkMode} onChange={toggleDarkMode} color="default" />}
            label="Dark Mode"
          />
          <Button color="inherit">Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header

