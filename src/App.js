import styles from "./App.module.css";
import BB from "./components/BB/BB";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className={styles.app}>
      <Home />
      <BB />
    </div>
  );
}

export default App;
