import styles from "../styles.module.scss";
import Form from "./components/index";

export default function CreateCategory() {
  return (
    <main className={styles.container}>
      <h1>Nova categoria</h1>

      <Form />
      {/* {errr && <Error>{errr.message}</Error>} */}
    </main>
  );
}
