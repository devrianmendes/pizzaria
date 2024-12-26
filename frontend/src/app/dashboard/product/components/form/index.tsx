"use client";

import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";

export function Form() {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        console.log("Formato proibido!!");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  };
  return (
    <main className={styles.container}>
      <h1>Formulario</h1>

      <form className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#fff" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          <option key={1} value={1}>
            Pizza
          </option>
          <option key={2} value={2}>
            Massas
          </option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          className={styles.input}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Preço do produto"
          className={styles.input}
          required
        />

        <textarea
          className={styles.input}
          placeholder="Digite a descrição do produto"
          required
          name="description"
        ></textarea>

        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
