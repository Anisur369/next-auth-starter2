"use server";

import { dbConnect } from "@/lib/dbConnect";

export async function postUser(payload) {
    if (!payload) {
        return null;
    }
    const isExist = await dbConnect("users").findOne({ email: payload.email });
    if (isExist) {
        return null;
    }
    const user = await dbConnect("users").insertOne(payload);
    return user;
}