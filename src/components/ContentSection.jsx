import styles from "../styles/ContentSection.module.css"

const ContentSection = ({children, className}) => {
    return (
        <div className={`${styles.container} ${className || ""}`}>
            {children}
        </div>
    );
}
 
export default ContentSection;