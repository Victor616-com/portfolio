import Cards from "../components/Cards";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <Cards></Cards>
            <div className={styles.testSpacer}></div>
        </div>
    );
}
 
export default HomePage;