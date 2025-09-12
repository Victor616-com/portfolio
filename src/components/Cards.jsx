import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import styles from "../styles/Cards.module.css";
import profilePic from "../assets/images/profile_pic.png";
import igLogo from "../assets/images/iglogo.png";
import fbLogo from "../assets/images/facebooklogo.png";
import linkedInLogo from "../assets/images/linkedinlogo.png";

export default function Cards() {
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
  const [zCounter, setZCounter] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollRotation, setScrollRotation] = useState([0, 0, 0]);
  const [scrollOpacity, setScrollOpacity] = useState([1, 1, 1]);

  const activeCard = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

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
                transformOrigin: "top left", // ensures scaling+rotation come from same corner
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
      {renderCard(
        0,
        "blue",
        <>
          <div className={styles.Hi_section}>
            <div className={styles.HiTextWrap}>
              <p className={styles.p1}>Hi, I'm Victor!</p>
              <p className={styles.ig_handle}>@victor.cretu35</p>
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
                with my work ;
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
          <h2>About Me</h2>
          <p>Here you can write about yourself, your work, or hobbies.</p>
          <img id="profile_pic" src="resources/profile.png" alt="profile" width="80" />
        </>,
        "",
        "rgb(245, 253, 119)"
      )}

      {renderCard(
        2,
        "green",
        <>
          <h2>Contact</h2>
          <ul>
            <li>Instagram: @yourhandle</li>
            <li>LinkedIn: /in/you</li>
            <li>Email: you@example.com</li>
          </ul>
        </>,
        "",
        "rgb(119, 253, 155)"
      )}
      
    </div>
  );
}
