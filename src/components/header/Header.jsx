import React from "react";
import Container from "../container/Container";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import LogoutButton from "./LogoutButton";

function Header() {
  console.log("Header");
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li key="logout">
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
