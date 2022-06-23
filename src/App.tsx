// modules
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

// components
import ScrollToTop from 'components/common/scroll-to-top'
import Home from 'pages/home'
import Upload from 'pages/store-upload'

// styles
import GlobalStyles from 'styles/global-styles'
import { theme } from 'styles/theme'

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
