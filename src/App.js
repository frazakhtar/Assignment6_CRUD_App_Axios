import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Add_Employee from "./Components/AddEmployee/Add_Employee";

// Define routes as objects
const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/addEmployee", element: <Add_Employee /> },
];

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
