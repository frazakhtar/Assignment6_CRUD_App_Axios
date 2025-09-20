import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import MyNavbar from "./Components/Navbar/MyNavbar";
import AddEmployee from "./Components/AddEmployee/AddEmployee";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/addEmployee", element: <AddEmployee /> },
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
