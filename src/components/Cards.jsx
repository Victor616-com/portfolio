import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import styles from "../styles/Cards.module.css";
import profilePic from "../assets/images/profile_pic.png"
import igLogo from "../assets/images/iglogo.png";
import fbLogo from "../assets/images/facebooklogo.png";
import linkedInLogo from "../assets/images/linkedinlogo.png";


export default function Cards() {

    const getCenteredPositions = () => {
    const cardWidth = 430; // same as CSS variable
    const cardHeight = 260;

    const centerX = (window.innerWidth - cardWidth) / 2;
    const centerY = (window.innerHeight - cardHeight) / 2;

    return [
        { top: centerY - 30, left: centerX - 30, z: 3, wobble: false },
        { top: centerY - 20, left: centerX -20, z: 2, wobble: false },
        { top: centerY - 10, left: centerX - 10, z: 1, wobble: false },
        ];
    };

    const [positions, setPositions] = useState(getCenteredPositions);

    useEffect(() => {
        const handleResize = () => {
            setPositions(getCenteredPositions());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

  const [zCounter, setZCounter] = useState(5);
  const activeCard = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

const handleMouseDown = (e, index) => {
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
    if (activeCard.current === null) return;

    const index = activeCard.current;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    startPos.current = { x: e.clientX, y: e.clientY };

    setPositions((prev) =>
      prev.map((p, i) =>
        i === index
          ? { ...p, top: p.top + dy, left: p.left + dx }
          : p
      )
    );
  };

  const handleMouseUp = () => {
  const index = activeCard.current; // store current index
  if (index !== null) {
    setPositions((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, wobble: false } : p
      )
    );
    activeCard.current = null; // reset after updating state
  }
};


        
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // prevent dragging profile picture
    const img = document.getElementById("profile_pic");
    if (img) img.setAttribute("draggable", false);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.container}>
        <Card
        color="blue"
        className={`${styles.card} ${styles.cardBlue} ${positions[0].wobble ? styles.wobble : ""}`}
        style={{
          top: positions[0].top,
          left: positions[0].left,
          zIndex: positions[0].z,
          backgroundColor: "rgb(216, 247, 255)"
        }}
        onMouseDown={(e) => handleMouseDown(e, 0)}
      >
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
                    <p>I’m a multimedia design student enjoying my life in Aarhus. I try to be as professional as possible while still having fun with my work ;</p>
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
                        <p><a href="https://www.instagram.com/victor.cretu35/" target="_blank">Instagram</a></p>
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
                        <p><a href="https://www.linkedin.com/in/victor-andrei-cretu-949b2822b/" target="_blank">LinkedIn</a></p>
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
                        <p><a href="https://www.instagram.com/victor.cretu35/" target="_blank">Facebook</a></p>
                    </div>
                </div>
            </div>
        </Card>

      <Card
        color="yellow"
        className={`${styles.card} ${positions[1].wobble ? styles.wobble : ""}`}
        style={{
          top: positions[1].top,
          left: positions[1].left,
          zIndex: positions[1].z,
          backgroundColor: "rgb(245, 253, 119)"
        }}
        onMouseDown={(e) => handleMouseDown(e, 1)}
      >
        <h2>About Me</h2>
        <p>Here you can write about yourself, your work, or hobbies.</p>
        <img
          id="profile_pic"
          src="resources/profile.png"
          alt="profile"
          width="80"
        />
      </Card>

      <Card
        color="green"
        className={`${styles.card} ${positions[2].wobble ? styles.wobble : ""}`}
        style={{
          top: positions[2].top,
          left: positions[2].left,
          zIndex: positions[2].z,
          backgroundColor: "rgb(119, 253, 155)"
        }}
        onMouseDown={(e) => handleMouseDown(e, 2)}
      >
        <h2>Contact</h2>
        <ul>
          <li>Instagram: @yourhandle</li>
          <li>LinkedIn: /in/you</li>
          <li>Email: you@example.com</li>
        </ul>
      </Card>
    </div>
  );
}
