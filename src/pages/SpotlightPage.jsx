import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectHeader from "../components/ProjectHeader";
import DraggableCard from "../components/DraggableCard"
import ProjectCard from "../components/ProjectCard"
import ContentSection from "../components/ContentSection";

import styles from "../styles/SpotlightPage.module.css";


import headerImage1 from "../assets/images/our_nature.png";
import headerImage2 from "../assets/images/quote_select.png";
import video from "../assets/images/the_spotlight_video.mp4";
import selectQuote from "../assets/images/select_quote.mp4";
import takePhoto from "../assets/images/take_photo.mp4";
import chooseBG from "../assets/images/choose_bg.mp4"


import overviewImg from "../assets/images/spotlight_double_diamond.png"


const SpotlightPage = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const navigate = useNavigate();

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
                headerImage1={headerImage1}
                headerImage2={headerImage2}
                //description1={"I’ve long been fascinated by creative coding and its potential to produce interactive, visually striking experiences. This school project was the perfect oportunity to learn about Three.JS and how I can bring value to a digital solution with interactive elements."}
                //description2={"Naturhistorisk Museum has long focused on the past, now it faces the challenge of looking toward the future. We created a series of booths where the users can share their thoughts on serious topics that matter to them. It was a collaborative effort, and I contributed to both the UX/UI design and various coding aspects."}
                description1={
                    <>
                        <p>Naturhistorisk Museum has long focused on the past, now it faces the challenge of looking toward the future.</p>
                        <p>We created a series of booths where the users can share their thoughts on serious topics that matter to them. It was a collaborative effort, and I contributed to both the UX/UI design and various coding aspects.</p>
                    </>
                }
                description2={
                    <>
                        <p>I’ve long been fascinated by creative coding and its potential to produce interactive, visually striking experiences.</p>
                        <p> This school project was the perfect oportunity to learn about Three.JS and how I can bring value to a digital solution with interactive elements.</p>
                    </>
                }
                
                
                projectName={"The Spotlight"}
            />
            <div className={styles.contentWrapper}>
                <DraggableCard>
                    <h2>Some of my contribution</h2>
                </DraggableCard>
                
                <div className={styles.content}>
                    <ContentSection className={styles.overview}>
                        <DraggableCard>
                            <ProjectCard
                                className={styles.card}
                                color="#ee6e86ff"
                                rotation={-1}
                                
                            >
                                <p>This project followed the Double Diamond framework.</p>
                                <p>I had input in all 4 stages and I collaborated with and learned a lot from my three teamates.</p>
                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <img src={overviewImg} alt="Image of double diamond" />
                        </DraggableCard>
                    </ContentSection>
                    <ContentSection className={styles.particles}>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                            
                                <video
                                    ref={videoRef}
                                    src={video}
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
                                color="#EBDFFF"
                                rotation={1}
                                
                            >
                                <p>To atract the users attention we thoght it would be fun to have an interactive wellcoming screen. </p>
                                <p>It uses <span>Three.js</span> and the user’s webcam feed to generate a 3D particle system. Each pixel of the webcam video becomes a particle, colored with random bluish tones. </p>
                                <p>The particles’ vertical positions update frame-by-frame based on the brightness (grayscale value) of the corresponding video pixel, creating a dynamic “point cloud” that moves with the live video feed.</p>

                            </ProjectCard>
                            
                            
                        </DraggableCard>
                    </ContentSection>
                    <ContentSection className={styles.takePhoto}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#6fdc75"
                                rotation={5}
                            >
                                <p>We wanted to give the users the option to take a photo that could be displayed in the cafe area of the museum.</p>
                                <p>This feature works by capturing a photo with the webcam, uploading it to <span>Supabase</span>, and linking it to a ticket. It saves and uploads the image while updating the ticket record.</p>
                                <p>Users can retake the photo if needed or continue to the next step.</p>
                            </ProjectCard>
                        </DraggableCard>
                        
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={takePhoto}
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
                    <ContentSection className={styles.selectQuote}>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={selectQuote}
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
                                color="#37386c"
                                rotation={1}
                            >
                                <p>After taking the photo users can select a quote and fill in its blanks with options. </p>
                                <p>The completed quote is stored in localStorage and saved to <span>Supabase</span> when continuing. </p>
                                <p>It uses state to track the current quote, selections, and fetches the latest photo from Supabase.</p>
                            </ProjectCard>
                            
                        </DraggableCard>
                    </ContentSection>
                        
                        
                        
                    

                    <ContentSection className={styles.chooseBG}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#F5FD77"
                                rotation={3}
                            >
                                <p>Finaly, the users can select a background and their image and quote can be displayed in the cafe area screen.</p>
                                <p>In this project I took both the role of a <span>UX/UI designer</span> and <span>programmer</span>.</p>
                            </ProjectCard>
                            
                        </DraggableCard>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={chooseBG}
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
                    <ContentSection>
                        <DraggableCard >
                            <h2 
                                onClick={() => navigate("/portfolio/vaca")}
                                 style={{ cursor: "pointer" }}
                            >
                                See the next project &lt; </h2>
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
};

export default SpotlightPage;
