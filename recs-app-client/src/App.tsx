import './App.css';
import RecForm from './RecForm';
import Home from './Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RecFormDone from './RecFormDone';
import Menu from './Menu';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/form',
		element: <RecForm />,
	},
	{
		path: '/formDone',
		element: <RecFormDone />,
	},
	{
		path: '/menu',
		element: <Menu />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
