import React from "react";
import { Link } from "react-router-dom";

function BackLink({ children, onClick = () => {}, ...props }) {
  return (
    <Link {...props} onClick={onClick}>
      {children || "Back"}
    </Link>
  );
}

export default BackLink;
