import { useEffect } from "react";
import fetchDataFromApi from "./utils/api";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResults from "./pages/SearchResults/SearchResults";
import Explore from "./pages/Explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
	const dispatch = useDispatch();
	const { url } = useSelector((state) => state.home);
	useEffect(() => {
		fetchApiConfig();
		genresCall();
	}, []);
	const fetchApiConfig = () => {
		fetchDataFromApi("/configuration").then((response) => {
			const url = {
				backdrop: response.images.secure_base_url + "original",
				poster: response.images.secure_base_url + "original",
				profile: response.images.secure_base_url + "original",
			};
			dispatch(getApiConfiguration(url));
		});
	};

	const genresCall = async () => {
		const promises = [];
		const endPoints = ["tv", "movie"];
		const allGenres = {};
		endPoints.forEach((url) => {
			promises.push(fetchDataFromApi(`/genre/${url}/list`));
		});
		const data = await Promise.all(promises);
		// console.log(data);
		{
			data?.map(({ genres }) => {
				return genres.map((item) => (allGenres[item.id] = item));
			});
		}
		// console.log(allGenres);
		dispatch(getGenres(allGenres));
	};

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:mediaType/:id" element={<Details />} />
				<Route path="/search/:query" element={<SearchResults />} />
				<Route path="/explore/:mediaType" element={<Explore />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
