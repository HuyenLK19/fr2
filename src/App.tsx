import { Link, Navigate, useRoutes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Update from "./pages/Update";
import PrivateRouter from "./PrivateRouter";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to='/product/list' replace={true} />,
    },
    {
      path: '/product',
      element: <PrivateRouter children></PrivateRouter>,
      children: [
        {
          path: "list",
          element: <List />
        },
        {
          path: "add",
          element: <Add />
        },
        {
          path: "update/:id",
          element: <Update />
        },
      ]
    },

    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/signin',
      element: <Signin />
    }
  ]);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{ marginBottom: '50px' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            Thi WEB209
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ gap: 3, fontSize: 20 }}
            >
              <li className="nav-item">
                <Link className="nav-link active" to="/signup">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/signin">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/product/add">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/product/list">
                  List Product
                </Link>
              </li>
            </ul>
          </div>
          <button className="btn btn-danger" onClick={() => {
            if (confirm("LOGOUT??")) {
              localStorage.clear()
              window.location.reload()
            }
          }}>Logout</button>
        </div>
      </nav>

      <div className="container">{routes}</div>
    </>
  );
}

export default App;
