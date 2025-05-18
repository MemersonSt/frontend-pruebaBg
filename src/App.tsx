import ThemeProvider from "./components/theme"
import Routes from "./routes"

function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  )
}

export default App
