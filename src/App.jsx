import Topbar from "./pages/global/Topbar";
import { ColorModeContext, useMode } from "./tema";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Sidebar from './pages/global/Sidebar'
import Carros from './pages/carros'



function App() {
  const [tema, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={tema}>
        <CssBaseline />
        <div className="app">
        <Sidebar/>
          <main className="content">
          <Topbar/>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/carros" element={<Carros/>} />
          </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
