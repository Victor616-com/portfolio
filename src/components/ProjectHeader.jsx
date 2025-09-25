import { useState, useEffect } from "react";
import styles from "../styles/ProjectHeader.module.css";
import DraggableCard from "./DraggableCard";

const ProjectHeader = ({projectName, headerImage1, headerImage2, description1, description2, imageWidth = 320 }) => {
  
  return (
    <div className={styles.container}>
      
      <DraggableCard>
        <h1>{projectName}</h1>
      </DraggableCard>
      
      <div className={styles.cardsImagesWrapper}>
        <div className={styles.cards}>
          <DraggableCard>
            <div className={styles.card1}>
              {description1}
            </div>
          </DraggableCard>
          
          <DraggableCard>
            <div className={styles.card2}>
              {description2}
            </div>
          </DraggableCard>
        </div>

        <div className={styles.projectImage}>
          {headerImage1 && (
            <DraggableCard>
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
            <DraggableCard>
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
