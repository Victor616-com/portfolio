import { useState, useEffect } from "react";
import styles from "../styles/ProjectHeader.module.css";
import DraggableCard from "./DraggableCard";

const ProjectHeader = ({ headerImage1, headerImage2, description1, description2, imageWidth = 320 }) => {
  const [card1Pos, setCard1Pos] = useState({ x: 0, y: 0 });
  const [card2Pos, setCard2Pos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  // Handle responsive scaling & layout
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const maxWidth = 1400;
            const mobileThreshold = 1100;
            const exponent = 0.4; // parabolic exponent for small screens

            let newScale;

            if (width >= mobileThreshold) { 
                // Linear scaling for width >= 1100px
                newScale = Math.min(width / maxWidth, 1);
                setCard1Pos({ x: 0, y: 0 })
                setCard2Pos({ x: 0, y: 0 })
            } else {
                // Parabolic scaling for width < 1100px
                // Map width 0..1100 to 0..1, then apply exponent
                const normalized = width / mobileThreshold; // 0..1
                newScale = Math.pow(normalized, exponent);
            }

            setScale(newScale);

            // Mobile layout below 1100px
            setIsMobileLayout(width < mobileThreshold);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


  const handleMouseDown = (e, card) => {
    if (isMobileLayout) return; // disable dragging on small screens
    e.preventDefault();
    setDragging(card);
    const pos = card === "card1" ? card1Pos : card2Pos;
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    if (dragging === "card1") setCard1Pos({ x: newX, y: newY });
    if (dragging === "card2") setCard2Pos({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div
      className={styles.container}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.cards}>
        <div
          className={styles.card1}
          style={{ left: card1Pos.x, top: card1Pos.y }}
          onMouseDown={(e) => handleMouseDown(e, "card1")}
        >
          <p>{description1}</p>
        </div>

        <div
          className={styles.card2}
          style={{ left: card2Pos.x, top: card2Pos.y }}
          onMouseDown={(e) => handleMouseDown(e, "card2")}
        >
          <p>{description2}</p>
        </div>
      </div>

      <div className={styles.projectImage}>

        {headerImage1 && (
            <DraggableCard>
                <img
            src={headerImage1}
            alt="Image 1"
            className={styles.image1}
            style={{ width: `${imageWidth}px` }}
            />
            </DraggableCard>
            
        )}
        {headerImage2 && (
            <DraggableCard>
                <img
            src={headerImage2}
            alt="Image 2"
            className={styles.image2}
            style={{ width: `${imageWidth}px` }}
            />
            </DraggableCard>
            
        )}
      </div>
      

    </div>
  );
};

export default ProjectHeader;
