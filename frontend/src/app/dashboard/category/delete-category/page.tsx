import styles from "../styles.module.scss";
import Form from "./components";

export default function DeleteCategory() {
  return (
    <main className={styles.container}>
      <h1>Excluir categoria</h1>
      <p>
        Para excluir uma categoria, é necessário apagar todos os produtos que
        pertencem a ela.
      </p>

      <Form />
      {/* {errr && <Error>{errr.message}</Error>} */}
    </main>
  );
}
