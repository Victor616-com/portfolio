import { useRef, useState } from "react";
import styles from "../styles/MusicPage.module.css";
import ProjectHeader from "../components/ProjectHeader";
import DraggableCard from "../components/DraggableCard"
import ProjectCard from "../components/ProjectCard"
import ContentSection from "../components/ContentSection";

import headerImage1 from "../assets/images/music1.JPG"

const MusicPage = () => {
    return (
    <div className={styles.container}>
        <ProjectHeader 
                headerImage1={headerImage1}
                
                //description1={"I’ve long been fascinated by creative coding and its potential to produce interactive, visually striking experiences. This school project was the perfect oportunity to learn about Three.JS and how I can bring value to a digital solution with interactive elements."}
                //description2={"Naturhistorisk Museum has long focused on the past, now it faces the challenge of looking toward the future. We created a series of booths where the users can share their thoughts on serious topics that matter to them. It was a collaborative effort, and I contributed to both the UX/UI design and various coding aspects."}
                description1={
                    <>
                        <p>In 2019 I bought my film camera from an older gentelman and I started this analog jurney.</p>
                        <p>The camera is fully mechanical (no battery needed) and the whole process brings a lot of joy. From the loud shutter to the process of developing the images, I feel connected to the photo.</p>
                    </>
                }
                description2={
                    <>
                        <p>I tend to photograph anything that I find interesting. Might it be a concert or a nice architectural masterpice.</p>
                    </>
                }
                
                
                projectName={"Photography"}
            />
    </div>
    );
}
 
export default MusicPage;