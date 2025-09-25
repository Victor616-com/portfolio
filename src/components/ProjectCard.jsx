import styles from "../styles/ProjectCard.module.css";

const ProjectCard = ({ children, color, className, rotation }) => {
  return (
    <div 
        className={`${styles.card} ${className || ""}`}
        style={{ 
            backgroundColor: color,
            transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
    >
      {children}
    </div>
  );
};

export default ProjectCard;