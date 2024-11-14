import { faHeart, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Navbar, Nav, Container } from 'react-bootstrap';

import { useThemeContext } from 'hooks/useThemeContext';

export default function Header() {
  const { value: theme, toggle } = useThemeContext();

  return (
    <Navbar bg={theme} className="mb-4 p-0 py-2" expand="lg" variant={theme}>
      <Container>
        <Navbar.Brand>CamPigs</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto me-2" color="inherit">
            <Nav.Link
              href="https://paypal.me/ayan4m1"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faHeart} /> Donate
            </Nav.Link>
            <Nav.Item className="d-flex align-items-center">
              <Form.Check
                checked={theme === 'dark'}
                onChange={toggle}
                type="switch"
              />
              <FontAwesomeIcon
                color={theme === 'light' ? 'black' : 'white'}
                fixedWidth
                icon={theme === 'light' ? faSun : faMoon}
                size="lg"
              />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
