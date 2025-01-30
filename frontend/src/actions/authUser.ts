"use server";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type

import { api } from "@/services/app";
import { cookies } from "next/headers";

export default async function AuthUser(state: Record<string, unknown>, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "" || password === "") {
    console.log("Preencha os campos.");
    return { message: "Preencha os campos." };
  }

  try {
    const response = await api.post("/session", {
      email,
      password,
    });

    if (!response.data.token) {
      return { message: response.data.name };
    }

    const expressTime = 60 * 60 * 24 * 30 * 1000;

    const cookieStore = await cookies();
    cookieStore.set("AuthLogin", response.data.token, {
      maxAge: expressTime,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });

    return { status: true, data: response.data };
  } catch (err: any) {
    return { status: false, data: err.response.data };
  }
}
