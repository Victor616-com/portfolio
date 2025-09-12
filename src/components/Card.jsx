import React from "react";
import styles from "../styles/Card.module.css";

export default function Card({ id, color, style, className, onMouseDown, children }) {
  return (
    <div
      id={id} // for testing only
      className={className}
      style={style}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
}
