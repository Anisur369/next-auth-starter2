"use server";

export async function postUser(payload) {
    if (!payload) {
        return null;
    }
    console.log("Received Payload:", payload);
}