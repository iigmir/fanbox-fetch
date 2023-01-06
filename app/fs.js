import { mkdir } from "node:fs/promises";
import { createWriteStream } from "fs";

export const create_dir = async (path = "") => {
    try {
        await mkdir(path);
        return Promise.resolve();
    } catch (error) {
        console.warn(error.message);
        return Promise.resolve();
    }
};

export const create_image = (path, buffer) => {
    createWriteStream(path).write(buffer);
};
