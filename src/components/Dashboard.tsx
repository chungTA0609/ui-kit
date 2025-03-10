"use client"

import { useState } from "react"
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Alert,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
} from "@mui/icons-material"

interface Todo {
  id: number
  text: string
}

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Learn TypeScript" },
    { id: 3, text: "Learn Material UI" },
  ])
  const [newTodo, setNewTodo] = useState("")

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }])
      setNewTodo("")
    }
  }

  return (
    <Grid container spacing={3} className="dashboard__container">
      <Grid item xs={12}>
        <Alert severity="info">Welcome to your dashboard! This is a simple example of Material UI components.</Alert>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={2} className="sidebar__nav">
          <List component="nav">
            <ListItem button className="sidebar__item">
              <ListItemIcon className="sidebar__item-icon">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" className="sidebar__item-text" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card className="dashboard__card">
          <CardHeader title="Todo List" className="dashboard__card-header" />
          <CardContent className="dashboard__card-content">
            <Box sx={{ display: "flex", mb: 2 }} className="dashboard__todo-form">
              <TextField
                fullWidth
                label="Add new todo"
                variant="outlined"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
                className="dashboard__todo-form-input"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddTodo}
                sx={{ ml: 1 }}
              >
                Add
              </Button>
            </Box>

            <List>
              {todos.map((todo) => (
                <ListItem key={todo.id}>
                  <ListItemText primary={todo.text} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard

