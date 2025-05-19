
import ThemeProvider from "./components/theme"
import Spinner from "./components/ui/Spinner"
import CustomSnackbar from "./components/ui/Snackbar"
import Routes from "./routes"

function App() {
  return (
    <ThemeProvider>
      <Spinner />
      <CustomSnackbar />
      <Routes />
    </ThemeProvider>
  )
}

export default App
