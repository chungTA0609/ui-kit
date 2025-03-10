"use client"

import type React from "react"
import { useState } from "react"
import { Container, Grid, Typography, Paper, Box, Divider } from "@mui/material"
import {
  Search as SearchIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import {
  Google as GoogleIcon,
  Twitter as TwitterIcon,
  // Discord as DiscordIcon,
  Bookmark as BookmarkIcon,
  Save as SaveIcon,
} from "@mui/icons-material"

// Import our UI components
import {
  Button,
  IconButton,
  Input,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Select,
  Switch,
  Slider,
  ProgressBar,
  Badge,
  ButtonGroup,
  SplitButton,
} from "../ui"

// Dummy Input components for demonstration
const UsernameInput: React.FC<{ placeholder: string }> = ({ placeholder }) => <Input placeholder={placeholder} />

const SearchInput: React.FC<{ placeholder: string; iconPosition?: "start" | "end" }> = ({
  placeholder,
  iconPosition,
}) => <Input placeholder={placeholder} />

const UIElementsShowcase: React.FC = () => {
  // State for form elements
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>(["option1"])
  const [radioValue, setRadioValue] = useState("option1")
  const [selectValue, setSelectValue] = useState("")
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([])
  const [switchValue, setSwitchValue] = useState(false)
  const [sliderValue, setSliderValue] = useState<number>(50)
  const [rangeValue, setRangeValue] = useState<number[]>([20, 80])

  // Options for select and radio components
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        UI Elements
      </Typography>

      {/* Buttons Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Default Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button>Submit</Button>
              <Button disabled>Disabled</Button>
              <Button buttonStyle="text">Link</Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Severities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="info">Info</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="help">Help</Button>
              <Button variant="danger">Danger</Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Text Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button variant="primary" buttonStyle="text">
                Primary
              </Button>
              <Button variant="secondary" buttonStyle="text">
                Secondary
              </Button>
              <Button variant="success" buttonStyle="text">
                Success
              </Button>
              <Button variant="info" buttonStyle="text">
                Info
              </Button>
              <Button variant="warning" buttonStyle="text">
                Warning
              </Button>
              <Button variant="help" buttonStyle="text">
                Help
              </Button>
              <Button variant="danger" buttonStyle="text">
                Danger
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Outlined Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button variant="primary" buttonStyle="outlined">
                Primary
              </Button>
              <Button variant="secondary" buttonStyle="outlined">
                Secondary
              </Button>
              <Button variant="success" buttonStyle="outlined">
                Success
              </Button>
              <Button variant="info" buttonStyle="outlined">
                Info
              </Button>
              <Button variant="warning" buttonStyle="outlined">
                Warning
              </Button>
              <Button variant="help" buttonStyle="outlined">
                Help
              </Button>
              <Button variant="danger" buttonStyle="outlined">
                Danger
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Rounded Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button variant="primary" rounded>
                Primary
              </Button>
              <Button variant="secondary" rounded>
                Secondary
              </Button>
              <Button variant="success" rounded>
                Success
              </Button>
              <Button variant="info" rounded>
                Info
              </Button>
              <Button variant="warning" rounded>
                Warning
              </Button>
              <Button variant="help" rounded>
                Help
              </Button>
              <Button variant="danger" rounded>
                Danger
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Icon Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <IconButton icon={<StarIcon />} variant="primary" />
              <IconButton icon={<BookmarkIcon />} variant="secondary" />
              <IconButton icon={<SearchIcon />} variant="success" />
              <IconButton icon={<DeleteIcon />} variant="danger" />
              <IconButton icon={<FavoriteIcon />} variant="warning" />
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Outlined Icon Buttons</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
              <IconButton icon={<StarIcon />} variant="primary" buttonStyle="outlined" />
              <IconButton icon={<BookmarkIcon />} variant="secondary" buttonStyle="outlined" />
              <IconButton icon={<SearchIcon />} variant="success" buttonStyle="outlined" />
              <IconButton icon={<DeleteIcon />} variant="danger" buttonStyle="outlined" />
              <IconButton icon={<FavoriteIcon />} variant="warning" buttonStyle="outlined" />
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Icon Button Sizes</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1, alignItems: "center" }}>
              <IconButton icon={<StarIcon />} variant="primary" size="small" />
              <IconButton icon={<StarIcon />} variant="primary" />
              <IconButton icon={<StarIcon />} variant="primary" size="large" />
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Buttons with Icons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button icon={<StarIcon />} iconPosition="only" variant="primary" />
              <Button icon={<BookmarkIcon />} variant="primary">
                Bookmark
              </Button>
              <Button icon={<BookmarkIcon />} iconPosition="right" variant="primary">
                Bookmark
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Split Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <SplitButton
                variant="secondary"
                onClick={() => console.log("Main click")}
                onSplitClick={() => console.log("Split click")}
              >
                Save
              </SplitButton>
              <SplitButton
                variant="success"
                onClick={() => console.log("Main click")}
                onSplitClick={() => console.log("Split click")}
              >
                Save
              </SplitButton>
              <SplitButton
                variant="info"
                onClick={() => console.log("Main click")}
                onSplitClick={() => console.log("Split click")}
              >
                Save
              </SplitButton>
              <SplitButton
                variant="warning"
                onClick={() => console.log("Main click")}
                onSplitClick={() => console.log("Split click")}
              >
                Save
              </SplitButton>
              <SplitButton
                variant="danger"
                onClick={() => console.log("Main click")}
                onSplitClick={() => console.log("Split click")}
              >
                Save
              </SplitButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <SplitButton variant="secondary" disabled>
                Save
              </SplitButton>
              <SplitButton variant="success" loading>
                Save
              </SplitButton>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Button Group
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ButtonGroup variant="primary">
              <Button icon={<SaveIcon />}>Save</Button>
              <Button icon={<DeleteIcon />}>Delete</Button>
              <Button>Cancel</Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <ButtonGroup variant="secondary">
              <Button icon={<CheckIcon />}>Save</Button>
              <Button icon={<DeleteIcon />}>Delete</Button>
              <Button icon={<CloseIcon />}>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Template Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button template="google" icon={<GoogleIcon />}>
                Google
              </Button>
              <Button template="twitter" icon={<TwitterIcon />}>
                Twitter
              </Button>
              {/* <Button template="discord" icon={<DiscordIcon />}>
                Discord
              </Button> */}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Loading Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button loading icon={<SearchIcon />}>
                Search
              </Button>
              <Button loading variant="secondary">
                Loading
              </Button>
              <Button loading variant="info" rounded>
                Processing
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Loading States
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {/* Search input with loading state */}
              <Input type="search" placeholder="Search" loading={true} className="w-[200px]" />

              {/* Search button with loading spinner */}
              <Button variant="primary" loading={true} icon={<SearchIcon />} loadingText="Search">
                Search
              </Button>

              {/* Standalone search button */}
              <Button variant="primary" loading={true}>
                Search
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button loading variant="secondary" loadingText="Loading">
                Submit
              </Button>
              <Button loading variant="success">
                Processing
              </Button>
              <Button loading variant="info" buttonStyle="outlined">
                Saving
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Input Fields */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Input Fields
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Input Text
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Input placeholder="Default" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Invalid" error helperText="This field is required" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Icons
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <UsernameInput placeholder="Username" />
              <SearchInput placeholder="Search" iconPosition="start" />
              <SearchInput placeholder="Search" iconPosition="end" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Float Label
            </Typography>
            <Input label="Username" float fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Textarea
            </Typography>
            <Input multiline rows={4} placeholder="Your Message" fullWidth />
          </Grid>
        </Grid>
      </Paper>

      {/* Checkbox & Radio */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Checkbox & Radio Buttons
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Single Checkbox
            </Typography>
            <Checkbox
              label="Accept terms and conditions"
              checked={checkboxValue}
              onChange={(e) => setCheckboxValue(e.target.checked)}
              helperText="This is a single checkbox"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Checkbox Group
            </Typography>
            <CheckboxGroup
              label="Select options"
              options={options}
              value={checkboxGroupValue}
              onChange={setCheckboxGroupValue}
              helperText="This is a checkbox group"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Radio Group (Vertical)
            </Typography>
            <RadioGroup
              label="Select one option"
              options={options}
              value={radioValue}
              onChange={setRadioValue}
              helperText="This is a vertical radio group"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Radio Group (Horizontal)
            </Typography>
            <RadioGroup
              label="Select one option"
              options={options}
              value={radioValue}
              onChange={setRadioValue}
              row
              helperText="This is a horizontal radio group"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Select Dropdown */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Select Dropdown
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Single Select
            </Typography>
            <Select
              label="Select an option"
              options={options}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value as string)}
              helperText="This is a single select dropdown"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Multi Select
            </Typography>
            <Select
              label="Select multiple options"
              options={options}
              multiple
              value={multiSelectValue}
              onChange={(e) => setMultiSelectValue(e.target.value as string[])}
              helperText="This is a multi-select dropdown"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Toggle Switch */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Toggle Switch
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Basic Switch
            </Typography>
            <Switch
              label="Enable notifications"
              checked={switchValue}
              onChange={(e) => setSwitchValue(e.target.checked)}
              helperText="This is a toggle switch for on/off states"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Disabled Switch
            </Typography>
            <Switch label="Disabled option" disabled helperText="This is a disabled toggle switch" />
          </Grid>
        </Grid>
      </Paper>

      {/* Slider */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Slider
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Basic Slider
            </Typography>
            <Slider
              label="Volume"
              value={sliderValue}
              onChange={(_, value) => setSliderValue(value as number)}
              min={0}
              max={100}
              showValue
              helperText="This is a basic slider for single value selection"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Range Slider
            </Typography>
            <Slider
              label="Price Range"
              value={rangeValue}
              onChange={(_, value) => setRangeValue(value as number[])}
              min={0}
              max={100}
              showValue
              helperText="This is a range slider for selecting a range of values"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Progress Bar */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Progress Bar
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Linear Progress (Determinate)
            </Typography>
            <ProgressBar
              variant="linear"
              value={75}
              label="Loading"
              showValue
              helperText="This is a linear progress bar with a known value"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Linear Progress (Indeterminate)
            </Typography>
            <ProgressBar
              variant="linear"
              label="Loading"
              helperText="This is a linear progress bar with an unknown value"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Circular Progress (Determinate)
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ProgressBar
                variant="circular"
                value={75}
                label="Loading"
                showValue
                size={80}
                helperText="This is a circular progress bar with a known value"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Circular Progress (Indeterminate)
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ProgressBar
                variant="circular"
                label="Loading"
                size={80}
                helperText="This is a circular progress bar with an unknown value"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Badge */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Badge
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Badge with Icon
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Badge badgeContent={4} variant="primary">
                <IconButton icon={<StarIcon />} aria-label="stars" />
              </Badge>

              <Badge badgeContent={12} variant="secondary">
                <IconButton icon={<FavoriteIcon />} aria-label="favorites" />
              </Badge>

              <Badge badgeContent="New" variant="error">
                <IconButton icon={<AddIcon />} aria-label="add" />
              </Badge>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Standalone Badges
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Badge standalone variant="primary" label="Primary" />
              <Badge standalone variant="secondary" label="Secondary" />
              <Badge standalone variant="success" label="Success" />
              <Badge standalone variant="error" label="Error" />
              <Badge standalone variant="warning" label="Warning" />
              <Badge standalone variant="info" label="Info" />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default UIElementsShowcase

