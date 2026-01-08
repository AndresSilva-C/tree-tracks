import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Login from './views/Login.jsx'
import Browse from './views/Browse.jsx'
import About from './views/About.jsx'
import References from './views/References.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<Login />} />
				<Route path="/browse" element={<Browse />} />
				<Route path="/about" element={<About />} />
				<Route path="/references" element={<References />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
