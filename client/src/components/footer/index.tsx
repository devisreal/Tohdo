import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="container border-t mx-auto px-4 text-center text-sm text-muted-foreground py-12">
      <p>
        &copy; {new Date().getFullYear()} Tohdo.{" "}
        <span className="text-center mt-4">
          Made by{" "}
          <Link
            rel="noreferrer"
            to="https://israel-akinoso.vercel.app"
            className="text-center mt-4 text-primary"
            target="_blank"
          >
            Israel
          </Link>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
