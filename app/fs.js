import { mkdir } from "node:fs/promises";

export const create_dir = async (path = "") => {
    try {
        await mkdir(path);
        return Promise.resolve();
    } catch (error) {
        console.warn(error.message);
        return Promise.resolve();
    }
};
