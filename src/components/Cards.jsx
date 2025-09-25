import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Cards.module.css";

import Card from "./Card";


// Media import
import profilePic from "../assets/images/profile_pic.png";
import igLogo from "../assets/images/iglogo.png";
import fbLogo from "../assets/images/facebooklogo.png";
import linkedInLogo from "../assets/images/linkedinlogo.png";
import arrowSVG from "../assets/images/arrow.svg";
import spotlightVideo from "../assets/images/the_spotlight_video.mov";
import openIcon from "../assets/images/open_icon.svg";
import vacaVideo from "../assets/images/vaca_video.mov";
import betterToDoVideo from "../assets/images/better_to_do_video.mov"
import photographyPreview from "../assets/images/photography1.JPG"


export default function Cards() {

  const navigate = useNavigate();

  const getCenteredPositions = (scale = 1) => {
      const cardWidth = 430 * scale;
      const cardHeight = 260 * scale;
      const centerX = (window.innerWidth - cardWidth) / 2;
      const centerY = (window.innerHeight - cardHeight) / 2;

      return [
          { top: centerY - 30 * scale, left: centerX - 30 * scale, z: 3, wobble: false },
          { top: centerY - 20 * scale, left: centerX - 20 * scale, z: 2, wobble: false },
          { top: centerY - 10 * scale, left: centerX - 10 * scale, z: 1, wobble: false },
      ];
  };

  const [positions, setPositions] = useState(getCenteredPositions);
  const startPos = useRef({ x: 0, y: 0 });
  const [zCounter, setZCounter] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollRotation, setScrollRotation] = useState([0, 0, 0]);
  const [scrollOpacity, setScrollOpacity] = useState([1, 1, 1]);
  const [showHint, setShowHint] = useState(true);

  const activeCard = useRef(null);
  
  const [cursorVideo, setCursorVideo] = useState(null);
  const [cursorImage, setCursorImage] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // --- Detect mobile ---
  useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 750);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Window resize ---
  useEffect(() => {
      const handleResize = () => {
          const scale = window.innerWidth <= 750 ? (window.innerWidth * 0.7) / 430 : 1;
          setPositions(getCenteredPositions(scale));
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Drag handlers (desktop only) ---
  const handleMouseDown = (e, index) => {
    if (isMobile) return;
    activeCard.current = index;
    startPos.current = { x: e.clientX, y: e.clientY };
    setShowHint(false);

    // Stop video preview if the yellow card is dragged
    if (index === 1) {
      setCursorVideo(null);
      setCursorImage(null);
    }

    setZCounter((prevZ) => {
      const newZ = prevZ + 1;
      setPositions((prev) =>
        prev.map((p, i) =>
          i === index ? { ...p, z: newZ, wobble: true } : p
        )
      );
      return newZ;
    });
  };

  const handleMouseMove = (e) => {
      if (activeCard.current === null || isMobile) return;
      const index = activeCard.current;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      startPos.current = { x: e.clientX, y: e.clientY };

      setPositions((prev) =>
          prev.map((p, i) =>
          i === index ? { ...p, top: p.top + dy, left: p.left + dx } : p
          )
      );
  };

  const handleMouseUp = () => {
      if (isMobile) return;
      const index = activeCard.current;
      if (index !== null) {
          setPositions((prev) =>
              prev.map((p, i) => (i === index ? { ...p, wobble: false } : p))
          );
          activeCard.current = null;
      }
  };

  // --- Touch handlers (tablet & touch devices) ---
  /* //Not needed at the moment
      
  const handleTouchStart = (e, index) => {
      if (isMobile) return; // still disable drag on phones (scroll animation only)
      activeCard.current = index;
      const touch = e.touches[0];
      startPos.current = { x: touch.clientX, y: touch.clientY };
          
      setZCounter((prevZ) => {
          const newZ = prevZ + 1;
          setPositions((prev) =>
          prev.map((p, i) =>
              i === index ? { ...p, z: newZ, wobble: true } : p
          )
          );
          return newZ;
      });
  };
  */
  const handleTouchMove = (e) => {
      if (activeCard.current === null || isMobile) return;

      const touch = e.touches[0];
      const index = activeCard.current;
      const dx = touch.clientX - startPos.current.x;
      const dy = touch.clientY - startPos.current.y;
      startPos.current = { x: touch.clientX, y: touch.clientY };

      setPositions((prev) =>
          prev.map((p, i) =>
          i === index ? { ...p, top: p.top + dy, left: p.left + dx } : p
          )
      );
  };
  
  const handleTouchEnd = () => {
      if (isMobile) return;
      const index = activeCard.current;
      if (index !== null) {
          setPositions((prev) =>
          prev.map((p, i) => (i === index ? { ...p, wobble: false } : p))
          );
          activeCard.current = null;
      }
  };
  
  
  // Event listeners for mouse and touch
  useEffect(() => {

    // Mouse events
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch events
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  // --- Sequential scroll animation with pause for mobile ---
  useEffect(() => {
    if (!isMobile) return;
    setShowHint(false);
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const segment = window.innerHeight * 0.8; // animation duration
        const pause = window.innerHeight * 0.6;   // extra visible time
        const lastIndex = positions.length - 1;

        const rotations = positions.map((_, i) => {
        if (i === lastIndex) return 0; // last card unaffected

        const start = i * (segment + pause);
        const end = start + segment;
        if (scrollTop < start) return 0;
        if (scrollTop > end) return -90;
        const progress = (scrollTop - start) / segment;
        return -90 * progress;
        });

        const opacities = positions.map((_, i) => {
        if (i === lastIndex) return 1; // last card always visible

        const start = i * (segment + pause);
        const end = start + segment;
        if (scrollTop < start) return 1;
        if (scrollTop > end) return 0;
        const progress = (scrollTop - start) / segment;
        return 1 - progress;
        });

        setScrollRotation(rotations);
        setScrollOpacity(opacities);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, positions]);

  
  // For preview image
  const handleMouseEnter = (img) => {
    setCursorVideo(img);
  };

  const handleMouseLeave = () => {
    setCursorVideo(null);
  };
  const handleImageEnter = (img) => {
    setCursorImage(img);
  };

  const handleImageLeave = () => {
    setCursorImage(null);
  };

  const handleMouseMoveList = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  //List click navigation behaviour
  const handleListClick = (path) => {
    navigate(path);
  }

  // Card render
  const renderCard = (index, color, children, extraClass, bgColor) => {
    const baseWidth = 430;
    const scale = isMobile ? (window.innerWidth * 0.7) / baseWidth : 1;

    return (
      <Card
      color={color}
      className={`${styles.card} ${extraClass} ${
        positions[index].wobble ? styles.wobble : ""
      }`}
      style={{
        top: positions[index].top,
        left: positions[index].left,
        zIndex: positions[index].z,
        backgroundColor: bgColor,
        transform: `scale(${scale}) ${
        isMobile ? `rotate(${scrollRotation[index]}deg)` : ""
        }`,
        transformOrigin: positions[index].wobble ? "center center" : "top left",
        opacity: isMobile ? scrollOpacity[index] : 1,
        transition: isMobile
        ? "transform 0.2s ease-out, opacity 0.2s ease-out"
        : undefined,
      }}
      onMouseDown={(e) => handleMouseDown(e, index)}
      >
      {children}
      </Card>
    );
  };


  return (
    <div className={styles.container}>
      <div className={`${styles.dragMe} ${!showHint ? styles.hidden : ""}`}
          style={{
          top: positions[0].top - 30,   // float above the first card
          left: positions[0].left - 70, // float to the left of the first card
          position: "absolute",
      }}
      >
          <p>Drag me!!!</p>
          <img
          className={styles.arrow}
          src={arrowSVG}
          width={15}
          alt="arrow"
          draggable={false}
          />

      </div>
      {renderCard(
        0,
        "blue",
        <>
          <div className={styles.Hi_section}>
            <div className={styles.HiTextWrap}>
              <h2 className={styles.p1}>Hi, I'm Victor!</h2>
              <p className={styles.tags}>#Figma #Photoshop #Illustrator #Premiere #HTML #CSS #JavaScript #React</p>
            </div>
            <img
              className={styles.profile_pic}
              src={profilePic}
              width={118}
              height={118}
              alt="Profile"
              draggable={false}
            />
          </div>
          <div className={styles.BottomTextWrap}>
            <div className={styles.longTextWrap}>
              <p>
                I’m a multimedia design student enjoying my life in Aarhus. I
                try to be as professional as possible while still having fun
                with my work :)
              </p>
            </div>
            <div className={styles.socials}>
              <div className={styles.social}>
                <img
                  className={styles.socialLogo}
                  src={igLogo}
                  width={16}
                  height={16}
                  alt="instagram"
                  draggable={false}
                />
                <p>
                  <a
                    href="https://www.instagram.com/victor.cretu35/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </p>
              </div>
              <div className={styles.social}>
                <img
                  className={styles.socialLogo}
                  src={linkedInLogo}
                  width={16}
                  height={16}
                  alt="linkedIn"
                  draggable={false}
                />
                <p>
                  <a
                    href="https://www.linkedin.com/in/victor-andrei-cretu-949b2822b/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
              <div className={styles.social}>
                <img
                  className={styles.socialLogo}
                  src={fbLogo}
                  width={16}
                  height={16}
                  alt="facebook"
                  draggable={false}
                />
                <p>
                  <a
                    href="https://www.instagram.com/victor.cretu35/"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>,
        styles.cardBlue,
        "rgb(216, 247, 255)"
      )}

      {renderCard(
        1,
        "yellow",
        <>
          <h2>Some of my projects...</h2>
          <ul onMouseMove={handleMouseMoveList}>
            <li 
              onMouseEnter={() => handleMouseEnter(spotlightVideo)}
              onMouseLeave={handleMouseLeave}
             
            >
              <div className={styles.listItem}>
                <div className={styles.title}>
                  <h3>The Spotlight</h3>
                  <img src={openIcon} alt="open" 
                    onClick={() => handleListClick("/portfolio/spotlight")}
                  />
                </div>
                
                <p>A school project in which I learned about 3JS and database integration</p>
              </div>
                
            </li>
            <li
              onMouseEnter={() => handleMouseEnter(vacaVideo)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.listItem}>
                <div className={styles.title}>
                  <h3>Vaca</h3>
                  <img src={openIcon} alt="open" 
                    onClick={() => handleListClick("/portfolio/vaca")}
                  />
                </div>
                <p>One of my first projects in which I learned the basics of JS.</p>
              </div>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter(betterToDoVideo)}
              onMouseLeave={handleMouseLeave}
            >
                <div className={styles.listItem}>
                  <div className={styles.title}>
                    <h3>Better to do</h3>
                    <img src={openIcon} alt="open" 
                      onClick={() => handleListClick("/portfolio/BetterToDo")}
                    />
                  </div>
                  <p>A personal project based on the dnd-kit React library.</p>
              </div>
            </li>
          </ul>
        </>,
        styles.cardYellow,
        "rgb(245, 253, 119)"
      )}

      {renderCard(
        2,
        "green",
        <>
          <h2>Some of my passions</h2>
          <ul onMouseMove={handleMouseMoveList}>
            <li
              onMouseEnter={() => handleImageEnter(photographyPreview)}
              onMouseLeave={handleImageLeave}
            >
              <div className={styles.listItem}>
                <div className={styles.title}>
                  <h3>Photography</h3>
                  <img src={openIcon} alt="open" 
                    onClick={() => handleListClick("/portfolio/vaca")}
                  />
                </div>
                <p>I own a film camera from the 70's and I enjoy photographing life around me.</p>
              </div>
            </li>
          </ul>
        </>,
        styles.cardGreen,
        "rgb(119, 253, 155)"
      )}
      


      {cursorVideo && (
        <video
          src={cursorVideo}
          autoPlay
          loop
          muted
          playsInline
          className={styles.cursorPreview}
          style={{
          top: cursorPos.y - 250,
          left: cursorPos.x + 20,
          position: "fixed",
          pointerEvents: "none",
          width: "auto",
          height: "500px",
          zIndex: 9999,
          transform: cursorVideo === betterToDoVideo ? "scale(0.7)" : "scale(1)",
          transformOrigin: "center left",
          borderRadius: "20px",
          overflow: "hidden",
          }}
        />
      )}
      {cursorImage && (
        <img
          src={cursorImage}
          alt="preview"
          className={styles.cursorPreview}
          style={{
            top: cursorPos.y - 250,
            left: cursorPos.x + 20,
            position: "fixed",
            pointerEvents: "none",
            height: "500px",
            width: "auto",
            zIndex: 9999,
            borderRadius: "20px",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
}
