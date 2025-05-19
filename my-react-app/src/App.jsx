import NavBar from './components/Navbar';
 import './App.css'
 import { routes } from './routes';
 import { useRoutes } from 'react-router-dom';

function App() {
  const element = useRoutes(routes)
  return (
    <>
      <div>
         <NavBar/>
         {element}
      </div>
       
    </>
  )
}

export default App
