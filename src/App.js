import Header from "./Components/Header";
import Typingbox from "./Components/Typingbox";
import Footer from "./Components/Footer";
import './App.css';
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";

function App() {

  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <Header />
        <Typingbox />
        <Footer />
      </div>
    </ThemeProvider>

  );
}

export default App;
