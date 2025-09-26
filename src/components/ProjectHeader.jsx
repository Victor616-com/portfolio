import { useState, useEffect } from "react";
import styles from "../styles/ProjectHeader.module.css";
import DraggableCard from "./DraggableCard";

import arrow from "../assets/images/arrow.svg"

const ProjectHeader = ({projectName, headerImage1, headerImage2, description1, description2, imageWidth = 320 }) => {
  const [showTip, setShowTip] = useState(false);

  // Check localStorage when component mounts
  useEffect(() => {
    const hasSeenTip = localStorage.getItem("hasSeenDragTip");
    if (!hasSeenTip) {
      setShowTip(true);
    }
  }, []);

  const handleDragStart = () => {
    if (showTip) {
      setShowTip(false);
      localStorage.setItem("hasSeenDragTip", "true");
    }
  };
  return (
    <div className={styles.container}>
      
      <DraggableCard onDragStart={handleDragStart}>
        <h1>{projectName}</h1>
        
      </DraggableCard>
      
      <div className={styles.cardsImagesWrapper}>
        <div className={styles.cards}>
          <DraggableCard onDragStart={handleDragStart}>
            <div className={styles.card1}>
              {description1}
            </div>
          </DraggableCard>
          
          <DraggableCard onDragStart={handleDragStart}> 
            <div className={styles.card2}>
              {description2}
            </div>
          </DraggableCard>
        </div>

        <div className={styles.projectImage}>
          <div className={`${styles.tip} ${!showTip ? styles.hidden : ""}`}>
            <img src={arrow} alt="arrow" />
            <p>You can drag anything on the page!</p>
          </div>
          {headerImage1 && (
            <DraggableCard onDragStart={handleDragStart}>
                <img
                  src={headerImage1}
                  alt="Image 1"
                  className={`${styles.image1} ${headerImage2 ? styles.twoImages : styles.singleImage}`}
                  style={{
                    width: `${imageWidth}px`,
                  }}
                />
            </DraggableCard>
          )}
          {headerImage2 && (
            <DraggableCard onDragStart={handleDragStart}>
              <img
                src={headerImage2}
                alt="Image 2"
                className={`${styles.image2} ${headerImage1 ? styles.twoImages : styles.singleImage}`}
                style={{
                  width: `${imageWidth}px`,
                }}
              />
            </DraggableCard>  
          )}
              
          
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="svg-filters"
        style={{ display: "none" }}
        >
        <defs>
            <filter id="marker-shape">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0 0.15"
                numOctaves="1"
                result="warp"
            />
            <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
            />
            </filter>
        </defs>
      </svg>

    </div>
  );
};

export default ProjectHeader;
