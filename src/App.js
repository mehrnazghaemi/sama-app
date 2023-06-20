import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AcademyDetails from "./routes/AcademyDetails/AcademyDetails"
import AcademyPosts from "./routes/AcademyPosts/AcademyPosts"
import UserComments from "./routes/UserComments/UserComments"
import Registration from "./routes/Registration/Registration"
import EditProfile from "./routes/EditProfile/EditProfile"
import NewsDetails from "./routes/NewsDetails/NewsDetails"
import VerifyLogin from "./routes/VerifyLogin/VerifyLogin"
import Bookmarked from "./routes/Bookmarked/Bookmarked"
import Academies from "./routes/Academies/Academies"
import NewsPage from "./routes/NewsPage/NewsPage"
import AboutUs from "./components/about/AboutUs"
import Layout from "./components/Layout/Layout"
import Account from "./routes/Account/Account"
import Signup from "./routes/SignUp/SignUp"
import Login from "./routes/Login/Login"
import LastPage from "./sorry/LastPage"
import Home from "./routes/Home/Home"
import Map from "./routes/Map/Map"
import Sorry from './sorry/Sorry'
import NotFound from './404/404'
import AcademyGroups from "./routes/Academies/academyFields/AcademyGroups"
import AcademyFields from "./routes/Academies/academyFields/AcademyFields"
import AcademyPostDetail from "./components/AcademyPost/AcademyPostCard/AcademyPostDetail"

function App() {

	return <>
	<RouterProvider router={router} /> </>

}

const router = createBrowserRouter(
	
	[
	{
		element: <Layout />,
		
		children: [
		
			{ path: "/home", element: <Home /> },
		
			{ path: "/account", element: <Account /> },
		
			{ path: "/map", element: <Map /> },
		
			{ path: "/news", element: <NewsPage /> },
		
			{ path: "/news/:id", element: <NewsDetails /> },
		
			{ path: "/academies", element: <Academies /> },

			// { path: "/academies/:id", element: <AcademyDetails /> },
		
			{ path: "/academies/:id/comments", element: <UserComments /> },
		
			{ path: "/academies/:id/posts", element: <AcademyPosts /> },

			// { path: "/academies/:id/posts/:postid", element: <AcademyPostDetail /> },  //new
		
			{ path: "/account/bookmarked", element: <Bookmarked /> },

			{path:'*' , element: <NotFound/>},

			{path:'sorry' , element: <Sorry/>},

			{path:'about' , element: <AboutUs/>},
			
		
		],
	
	},
	
	{ path: "/account/edit", element: <EditProfile /> },

	{ path: "/academies/:id", element: <AcademyDetails /> },
	
	{ path: "/login", element: <Login /> },
	
	{path: "/registration", element: <Registration />,},
	
	{ path: "/", element: <Signup /> },//
	
	{ path: "/VerifyLogin", element: <VerifyLogin /> },//
	
	{path:'searching' , element: <LastPage/>}, //

	{path:'academiesgroupslist', element:<AcademyGroups/>}, //

	{path:'academiesgroupslist/:fields', element:<AcademyFields/>} //

])

export default App