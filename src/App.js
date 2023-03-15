import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import BoardOrders from "./components/board-orders.component";
import BoardClients from "./components/board-clients.component";
import BoardProducts from "./components/board-products.component";
import BoardSupplies from "./components/board-supplies.component";
import BoardPackers from "./components/board-packers.component";
import BoardSupervisors from "./components/board-supervisors.component";
import BoardEmployees from "./components/board-employees.component";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showOrdersBoard: false,
      showClientsBoard: false,
      showProductsBoard: false,
      showSuppliesBoard: false,
      showEmployeesBoard: false,
      showPackersBoard: false,
      showSupervisorsBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showOrdersBoard: true,
        showClientsBoard: true,
        showProductsBoard: true,
        showSuppliesBoard: true,
        showEmployeesBoard: AuthService.checkAuth("ROLE_MANAGER"),
        showPackersBoard: AuthService.checkAuth("ROLE_SUPERVISOR"),
        showSupervisorsBoard: AuthService.checkAuth("ROLE_MANAGER"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showOrdersBoard: false,
      showClientsBoard: false,
      showProductsBoard: false,
      showSuppliesBoard: false,
      showEmployeesBoard: false,
      showPackersBoard: false,
      showSupervisorsBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showOrdersBoard, showClientsBoard, showProductsBoard, showSuppliesBoard, showEmployeesBoard, showPackersBoard, showSupervisorsBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Fulfillment Center
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showOrdersBoard && (
              <li className="nav-item">
                <Link to={"/orders"} className="nav-link">
                  Orders
                </Link>
              </li>
            )}
            {showClientsBoard && (
              <li className="nav-item">
                <Link to={"/clients"} className="nav-link">
                  Clients
                </Link>
              </li>
            )}
            {showProductsBoard && (
              <li className="nav-item">
                <Link to={"/products"} className="nav-link">
                  Products
                </Link>
              </li>
            )}
            {showSuppliesBoard && (
              <li className="nav-item">
                <Link to={"/supplies"} className="nav-link">
                  Supplies
                </Link>
              </li>
            )}

            {showPackersBoard && (
              <li className="nav-item">
                <Link to={"/packers"} className="nav-link">
                  Packers
                </Link>
              </li>
            )}
            {showSupervisorsBoard && (
              <li className="nav-item">
                <Link to={"/supervisors"} className="nav-link">
                  Supervisors
                </Link>
              </li>
            )}
            {showEmployeesBoard && (
              <li className="nav-item">
                <Link to={"/employees"} className="nav-link">
                  Employees
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<BoardOrders />} />
            <Route path="/clients" element={<BoardClients />} />
            <Route path="/products" element={<BoardProducts />} />
            <Route path="/supplies" element={<BoardSupplies />} />
            <Route path="/packers" element={<BoardPackers />} />
            <Route path="/supervisors" element={<BoardSupervisors />} />
            <Route path="/employees" element={<BoardEmployees />} />
          </Routes>
        </div>
        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
