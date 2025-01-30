"use client";

import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/app";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";

type DataProps = {
  categories: {
    id: string;
    name: string;
  }[];
};

export function Form({ categories }: DataProps) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  const handleRegisterProduct = async (formData: FormData) => {
    const category = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (category === "" || category === "default") {
      toast.error("Selecione uma categoria.");
      setPreviewImage("");
      return;
    }

    if (!name || !category || !price || !description || !image) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("categoryId", categories[+category].id);
    data.append("file", image);

    const token = getCookieClient();

    try {
      const postProduct = await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Produto registrado.");
      setPreviewImage("");
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.warning("Falha ao cadastrar produto!");
    }
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato não permitido.");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  };

  return (
    <main className={styles.container}>
      <h1>Cadastrar produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>
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
          <option value="default">Categorias...</option>
          {categories.map((eachCategory, index) => (
            <option key={eachCategory.id} value={index}>
              {eachCategory.name}
            </option>
          ))}
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
