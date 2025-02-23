import React from "react";
import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <>
          <li key={href} className="nav-item">
            <Link href={href}>
              <p className="nav-link text-white">{label}</p>
            </Link>
          </li>
        </>
      );
    });
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-success">
      <Link href="/">
        <p className="navbar-brand text-white">Ticket4real</p>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </header>
  );
};

export default Header;
