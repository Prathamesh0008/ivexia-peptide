"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/app/auth/session";
import clientPromise from "@/lib/mongodb";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function getUsersCollection() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("users");
}

export async function register(formData: FormData) {
  const firstName = getString(formData, "firstName");
  const lastName = getString(formData, "lastName");
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const confirmPassword = getString(formData, "confirmPassword");
  const newsletter = formData.get("newsletter") === "on";

  if (
    !firstName ||
    !lastName ||
    !email.includes("@") ||
    password.length < 6 ||
    password !== confirmPassword
  ) {
    redirect("/register?error=invalid");
  }

  const users = await getUsersCollection();

  const existingUser = await users.findOne({ email });

  if (existingUser) {
    redirect("/register?error=exists");
  }

  await users.insertOne({
    firstName,
    lastName,
    email,
    password,
    newsletter,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE,
    value: encodeURIComponent(JSON.stringify({ email })),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/account");
}

export async function signIn(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!email.includes("@") || password.length < 6) {
    redirect("/sign-in?error=invalid");
  }

  const users = await getUsersCollection();

  const user = await users.findOne({ email });

  if (!user || user.password !== password) {
    redirect("/sign-in?error=invalid");
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE,
    value: encodeURIComponent(JSON.stringify({ email })),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/account");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/sign-in");
}