import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import FizzBuzzPage from './pages/FizzBuzzPage'

function LandingPage() {
  return (
    <main className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Hale End</h1>
      <p className="text-base-content/70">Learning project</p>
      <nav>
        <ul className="menu menu-lg bg-base-200 rounded-box w-56">
          <li>
            <Link to="/fizzbuzz">FizzBuzz Game</Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fizzbuzz" element={<FizzBuzzPage />} />
      </Routes>
    </BrowserRouter>
  )
}
