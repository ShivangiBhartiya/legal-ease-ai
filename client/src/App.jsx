import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Homepage from './pages/Homepage'

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Homepage />
      </main>
      <Footer />
    </>
  )
}

export default App
