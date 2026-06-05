"use server";

import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";

export async function postUser(payload) {
    if (!payload.email && !payload.password && payload.password.length < 6) {
        return {
            success: false,
            message: "Email and password are required.",
        };
    }
    const isExist = await dbConnect("users").findOne({ email: payload.email });
    if (isExist) {
        return {
            success: false,
            message: "User already exists with this email.",
        };
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = {
        ...payload,
        createdAt: new Date().toISOString(),
        role: "user",
        password: hashedPassword,
    };
    const user = await dbConnect("users").insertOne(newUser);
    return {
        success: true,
        message: "User registered successfully.",
        user,
    }
};