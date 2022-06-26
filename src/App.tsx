// modules
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider, css } from 'styled-components'

// components
import ScrollToTop from 'components/common/scroll-to-top'
import Home from 'pages/home'
import Upload from 'pages/upload'

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
          <BackgroundStyle>
            <MainStyle>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
              </Routes>
            </MainStyle>
          </BackgroundStyle>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export const FlexCol = () => css`
  display: flex;
  flex-direction: column;
`

const BackgroundStyle = styled.div`
  height: 100%;
  ${FlexCol()}
  background-color: #1976d214;
`
const MainStyle = styled.main`
  @media (min-width: 510px) {
    width: 500px;
  }
  ${FlexCol()}
  margin: auto;
  padding: 20px;
  box-shadow: 0px 0px 14px 0px #95c7f8ab;
  border-radius: 5px;
  background-color: #ffff;
`
export default App
