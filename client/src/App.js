import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Tailoring from './pages/Tailoring';
import Checkout from './pages/Checkout';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/home" style={{ background: 'linear-gradient(45deg, #3498db, #f1c40f)', WebkitBackgroundClip: 'text', color: 'transparent' }}>DD</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-nav-nav" />
          <Navbar.Collapse id="basic-nav-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/tailoring">Tailoring</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <NavDropdown title={localStorage.getItem('userName') || 'Profile'} id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          {!isAuthenticated ? <Redirect to="/login" /> : <Redirect to="/home" />}
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/tailoring" component={Tailoring} />
        <Route path="/checkout" component={Checkout} />
      </Switch>

      <footer className="footer">
        <Container>
          <p>© 2025 Dharshan Groups. All rights reserved.</p>
        </Container>
      </footer>
    </Router>
  );
}

export default App;
