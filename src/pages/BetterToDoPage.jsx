import { useRef, useState } from "react";
import styles from "../styles/BetterToDoPage.module.css";
import ProjectHeader from "../components/ProjectHeader";
import DraggableCard from "../components/DraggableCard";
import ContentSection from "../components/ContentSection";
import ProjectCard from "../components/ProjectCard";


import headerImage1 from "../assets/images/betterToDo_header.png"
import headerImage from "../assets/images/betterToDo_header.png"
import collumnsTasksVideo from "../assets/images/betterToDo_addColumnsAndTasks.mov"
import editCollumnVideo from "../assets/images/betterToDo_editCollumn.mov"
import dragVideo from "../assets/images/betterToDo_drag.mov"
import finalVideo from "../assets/images/betterToDo_final.mov"

const BetterToDoPage = () => {
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
               
                headerImage1={headerImage1}
                
                description1={
                    <>
                        <p>One of my personal projects is a Kanban Board application. I started this project to because I wanted to learn more about using React libaries.</p>
                        <p>The project relies heavely on dnd-kit, a modern, lightweight, and highly customizable drag-and-drop toolkit for React</p>
                    </>
                }
                description2={
                    <>
                        <p>I wanted to force myself to figure out how to implement the kit purely by reading the docs. It has a beautifuly done documentation that is very interesting to read.</p>
                    </>
                }         
                imageWidth={550}
                projectName={"BetterToDo"}
            />
            <div className={styles.contentWrapper}>
                <DraggableCard>
                    <h2>How it works</h2>
                </DraggableCard>
                <div className={styles.content}>
                    <ContentSection className={styles.createColTask}>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                                    
                                <video
                                    ref={videoRef}
                                    src={collumnsTasksVideo}
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
                                <p>Users can create new columns dynamically, each assigned a random color from a predefined palette.</p>
                                <p>Inside each column, users can create tasks that belong specifically to that column.</p>
                            </ProjectCard>
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.editCollumn}>
                        <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#6fdc75"
                                rotation={2}
                            >
                                <p>Each column has a title that can be edited inline.</p>
                                <p>A color picker is integrated, allowing users to change a column’s background color.</p>
                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={editCollumnVideo}
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
                    <ContentSection className={styles.drag}>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={dragVideo}
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
                                <p>Columns are draggable using @dnd-kit/sortable, so their order can be rearranged via drag-and-drop.</p>
                                <p>The project uses <span>DndContext</span> from @dnd-kit/core to handle drag start, overlay previews, and drag end events.</p>
                                <p>Placeholders maintain layout consistency while dragging, preventing layout shifts.</p>
                            </ProjectCard>
                        </DraggableCard>
                        
                    </ContentSection>
                    <ContentSection className={styles.final}>
                         <DraggableCard>
                            <ProjectCard 
                                className={styles.card}
                                color="#F5FD77"
                                rotation={1}
                            >
                                <p>This project proved to be quite a challange but I learned so much from it. From building reusable modular React components to handeling complex state updates cleanely.</p>
                                <p>I am quite proud of the final result and I hope to scale it up one day.</p>
                                <p>You can try it out <a href="https://victor616-com.github.io/betterToDoList/" target="_blank" rel="noopener noreferrer">here</a>.</p>
                            </ProjectCard>
                        </DraggableCard>
                        <DraggableCard>
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={videoRef}
                                    src={finalVideo}
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
                </div>
            </div>
        </div>
    );
}
 
export default BetterToDoPage;