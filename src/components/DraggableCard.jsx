import { useState, useEffect, useRef } from "react";
import styles from "../styles/DraggableCard.module.css";

const DraggableCard = ({ children, onDragStart }) => {
  const cardRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(null); // store last position
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  
  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobileLayout(window.innerWidth < 768);
      // Reset position on resize to show the original card
      setPosition(null);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    if (isMobileLayout) return;
    e.preventDefault();

    if (onDragStart) onDragStart();

    const parentRect = cardRef.current.offsetParent.getBoundingClientRect();

    // Use current position if it exists
    const currentX = position ? position.x : cardRef.current.getBoundingClientRect().left - parentRect.left;
    const currentY = position ? position.y : cardRef.current.getBoundingClientRect().top - parentRect.top;

    setOffset({
      x: e.clientX - parentRect.left - currentX,
      y: e.clientY - parentRect.top - currentY,
    });

    setDragging(true);
  };


  const handleMouseMove = (e) => {
    if (!dragging) return;
    //console.log("Dragging")
    const parentRect = cardRef.current.offsetParent.getBoundingClientRect();

    setPosition({
      x: e.clientX - parentRect.left - offset.x,
      y: e.clientY - parentRect.top - offset.y,
    });
  };

  /* //Code to stop moving objects over the viewPort on horizontal direction. 
    //Has problems with the h2 tag in ProjectPage
  const handleMouseMove = (e) => {
    if (!dragging) return;

    const parentRect = cardRef.current.offsetParent.getBoundingClientRect();
    const cardWidth = cardRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;

    // Calculate new X/Y
    let newX = e.clientX - parentRect.left - offset.x;
    let newY = e.clientY - parentRect.top - offset.y;

    // Clamp X so it stays inside viewport
    const minX = 0;
    const maxX = viewportWidth - cardWidth;
    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;

    setPosition({
      x: newX,
      y: newY, // Y stays free
    });
  };
  */
  
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Global listeners while dragging
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      {/* Original card stays in flow */}
      <div
        ref={cardRef}
        onMouseDown={position ? undefined : handleMouseDown}
        className={styles.card}
        style={{ opacity: position ? 0 : 1 }}
      >
        {children}
      </div>

      {/* Floating draggable copy */}
      {position && (
        <div
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            pointerEvents: "auto",
            zIndex: 1000,
            cursor: dragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown} // allow picking up again
        >
          {children}
        </div>
      )}
    </>
  );
};

export default DraggableCard;
