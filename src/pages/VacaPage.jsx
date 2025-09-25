import { useRef, useState } from "react";
import styles from "../styles/VacaPage.module.css";


import ProjectHeader from "../components/ProjectHeader";
import DraggableCard from "../components/DraggableCard";
import ContentSection from "../components/ContentSection";
import ProjectCard from "../components/ProjectCard";

import projectLogo from "../assets/images/vaca_logo.png"
import headerImage1 from "../assets/images/vaca_header1.png"
import headerImage2 from "../assets/images/vaca_header2.png"
import observations from "../assets/images/vaca_observations.png"
import empathyMap from "../assets/images/vaca_empathy_map.jpg"
import sketch from "../assets/images/vaca_sketch.png"
import lofi from "../assets/images/vaca_lofi.png"
import hifi from "../assets/images/vaca_hifi.png"
import scrollVideo from "../assets/images/vaca_scroll.mov"
import cartVideo from "../assets/images/vaca_cart.mov"

const VacaPage = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleVideoClick = () => {
        const vid = videoRef.current;
        if (!vid) return;

        if (isPlaying) {
            vid.pause();
        } else {
            const playPromise = vid.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Video play failed:", error);
                });
            }
        }
        setIsPlaying(!isPlaying);
    };
    return ( 
        <div className={styles.container}>
            <ProjectHeader 
                projectLogo={projectLogo} 
                headerImage1={headerImage1}
                
                description1={
                    <>
                        <p>Vaca is a project very dear to my heart. It was  one of the first projects we had in the Multimedia program and the one that sparked my interest in JavaScript.</p>
                        <p>We were tasked with visiting a local business in Aarhus to find out if they needed any digital solutions. We contacted Vaca, and they kindly agreed to let us use one of their locations.</p>

                    </>
                }
                description2={
                    <>
                        <p>Through interviews with both employees and customers, we concluded that the business would benefit significantly from installing a self-ordering screen. This would help reduce waiting times, improve the ordering process, and enhance the overall customer experience.</p>
                    </>
                }         
                imageWidth={550}
                projectName={"Vaca"}
            />
            <div className={styles.contentWrapper}>
                <DraggableCard>
                    <h2>Some of my contribution</h2>
                </DraggableCard>
                <div className={styles.content}>
                    <ContentSection className={styles.observations}>
                        <DraggableCard>
                            <img src={observations} alt="vaca restaurant" />
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#EBDFFF"
                                rotation={1}
                            
                            >
                                <p>I was involved in every stage of the project, from taking interviews to the final solution.</p>
                                <p>The first step was visiting the location to take some observations and some interviews to better understand the <span>needs</span> of the staff and the clients.</p>
                            </ProjectCard>
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.mappings}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#6fdc75"
                                rotation={2}    
                            >
                                <p>Through the use of various mappings we made sense of all the information we gathered.</p>

                            </ProjectCard>
                        </DraggableCard>
                       <DraggableCard>
                            <img src={empathyMap} alt="empathy map" />
                       </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.sketches}>
                        <DraggableCard>
                            <img src={sketch} alt="sketch" />
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#37386c"
                                rotation={2}    
                            >
                                <p>Based on all mappings we created some sketches...</p>

                            </ProjectCard>
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.lofi}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#D8F7FF"
                                rotation={2}    
                            >
                                <p>...Low-Fidelity Mockups...</p>

                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <img src={lofi} alt="Low Fidelity Mockups" />
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.hifi}>
                        <DraggableCard>
                            <img src={hifi} alt="High Fidelity Mockups" />
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#F5FD77"
                                rotation={2}    
                            >
                                <p>...and finaly High-Fidelity Mockups.</p>

                            </ProjectCard>
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.json}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#C1F7A2"
                                rotation={1}    
                            >
                                <p>I created a JSON-based database for the menu, storing all the content such as name, image, allergens, and description.</p>
                                <p>The menu is then dynamically generated on the screen from this file.</p>
                                <p>Learning about this oppened my eyes to the power of coding and started my passion for JavaScript, fueling my drive to keep learning and improving.</p>

                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={scrollVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    onClick={handleVideoClick}
                                    className={styles.video}
                                />
                            </div>
                        </DraggableCard>
                       
                        
                    </ContentSection>
                    <ContentSection className={styles.cart}>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={cartVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    onClick={handleVideoClick}
                                    className={styles.video}
                                />
                            </div>
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#FFA278"
                                rotation={1}    
                            >
                                <p>I built an interactive shopping cart in JavaScript that updates in real time, handles quantities, and persists across sessions with localStorage. </p>
                                <p>Making this taught me how to manage dynamic state, manipulate the DOM efficiently, and create smooth, user-friendly interactions.</p>
                            </ProjectCard>
                        </DraggableCard>
                        
                    </ContentSection>
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
}
 
export default VacaPage