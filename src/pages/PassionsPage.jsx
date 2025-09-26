import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/PassionsPage.module.css";

import ProjectHeader from "../components/ProjectHeader";
import DraggableCard from "../components/DraggableCard"
import ProjectCard from "../components/ProjectCard"
import ContentSection from "../components/ContentSection";

import photo1 from "../assets/images/photography1.JPG"
import photo2 from "../assets/images/photography2.JPG"
import photo3 from "../assets/images/photography3.JPG"
import photo4 from "../assets/images/photography4.JPG"
import photo5 from "../assets/images/photography5.JPG"
import photo6 from "../assets/images/photography6.JPG"
import music1 from "../assets/images/music1.JPG"
import music2 from "../assets/images/music2.JPG"
import music3 from "../assets/images/music3.png"
import music4 from "../assets/images/music4.jpg"
const PassionsPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <ProjectHeader 
                headerImage1={photo3}
                headerImage2={music1}
                //description1={"I’ve long been fascinated by creative coding and its potential to produce interactive, visually striking experiences. This school project was the perfect oportunity to learn about Three.JS and how I can bring value to a digital solution with interactive elements."}
                //description2={"Naturhistorisk Museum has long focused on the past, now it faces the challenge of looking toward the future. We created a series of booths where the users can share their thoughts on serious topics that matter to them. It was a collaborative effort, and I contributed to both the UX/UI design and various coding aspects."}
                description1={
                    <>
                        <p>In 2019 I bought my film camera from an older gentelman and I started this analog jurney.</p>
                        <p>The camera is fully mechanical (no battery needed) and the whole process brings a lot of joy.</p>
                        <p>I tend to photograph anything that I find interesting. Might it be a concert or a nice architectural masterpice.</p>

                    </>
                }
                description2={
                    <>
                        <p>I can't even remember when I started playing guitar. It has allways been a way to relax and to express myself.</p>
                        
                    </>
                }
                
                
                projectName={"Passions"}
            />
            <div className={styles.contentWrapper}>
                <DraggableCard>
                    <h2>Some of my photography</h2>
                </DraggableCard>
                <div className={styles.content}>
                    <ContentSection className={styles.concerts}>
                        <DraggableCard>
                            <img src={photo1} alt="image1" />
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#EBDFFF"
                                rotation={2}
                                    
                            >
                                <p>Concerts are my go to going out activity so naturally I have gatherd quite a few photos over the years.</p>
                                
                            </ProjectCard>
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.mountain}>
                        
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#6fdc75"
                                rotation={2}
                                    
                            >
                                <p>Back home I used to spend a big part of my holydays in the mountains. </p>
                                <p>Who doesn't enjoy a 9 hour hike?</p>
                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <img src={photo4} alt="image4" />
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.motion}>
                        <DraggableCard>
                            <img src={photo5} alt="image5" />
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#A7DBCE"
                                rotation={1}
                            >
                                <p>I like experimenting with different photography techniques.</p>
                                <p>I am quite scared of motion blurr in my photography so, sometimes I try to embrace it.</p>
                            </ProjectCard>
                        </DraggableCard>
                    </ContentSection>
                    <ContentSection className={styles.events}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#FFA278"
                                rotation={2}
                            >
                                <p>Sometimes people invite me to shoot their events on film and it makes me very happy that so many people enjoy the analog vibe.</p>
                                
                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <img src={photo6} alt="image6" />
                        </DraggableCard>
                    </ContentSection>
                    <ContentSection className={styles.instagram}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#37386C"
                                rotation={-0.5}
                            >
                                <p>You can see more of my photography on my Instagram page <a href="https://www.instagram.com/victor.cretu35/" target="_blank" rel="noopener noreferrer">@victor.cretu35</a></p>
                            </ProjectCard>
                        </DraggableCard>
                    </ContentSection>
                    <DraggableCard>
                        <h2>My music</h2>
                    </DraggableCard>
                    <ContentSection className={styles.band}>
                        <DraggableCard>
                            <img src={music2} alt="music2" />
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#D6E866"
                                rotation={2}
                            >
                                <p>I play guitar in a small local band, and nothing compares to the thrill of making music with friends and sharing it with an audience.</p>
                                
                            </ProjectCard>
                        </DraggableCard>
                    </ContentSection>
                    <ContentSection className={styles.posters}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#EBDFFF"
                                rotation={2}
                            >
                                <p>My responsabilities in the band expand beyond just making music.</p>
                                <p>I also design all the concert posters...</p>
                                
                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <img src={music3} alt="music3" />
                        </DraggableCard>
                    </ContentSection>
                    <ContentSection className={styles.audio}>
                        <DraggableCard>
                            <img src={music4} alt="music4" />
                        </DraggableCard>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#66D1DF"
                                rotation={2}
                            >
                                <p>... and I am the designated audio technician.</p>
                            </ProjectCard>
                        </DraggableCard>
                    </ContentSection>
                    <ContentSection>
                        <DraggableCard >
                            <h2 
                                onClick={() => navigate("/portfolio/")}
                                 style={{ cursor: "pointer" }}
                            >
                                Go back home &lt; </h2>
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
 
export default PassionsPage;