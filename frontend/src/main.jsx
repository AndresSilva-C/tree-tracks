import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { CookiesProvider } from 'react-cookie';
import './index.css'
import App from './App.jsx'
import Login from './views/Login.jsx'
import Browse from './views/Browse.jsx'
import About from './views/About.jsx'
import References from './views/References.jsx'
import TreePage from './views/TreePage.jsx';
import Search from './views/Search.jsx'
import Favorites from './views/Favorites.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<CookiesProvider defaultSetOptions={{ path: '/', expires: new Date(new Date().getTime() + 60*60*24*1000)}}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/login" element={<Login />} />
					<Route path="/browse" element={<Browse />} />
					<Route path="/about" element={<About />} />
					<Route path="/references" element={<References />} />
					<Route path="/trees/:treeId" element={<TreePage />} />
					<Route path="/search" element={<Search />} />
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
			</BrowserRouter>
		</CookiesProvider>
	</StrictMode>,
)
