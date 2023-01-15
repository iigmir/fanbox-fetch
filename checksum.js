/**
 * Check if the script get all images. It will print a report in result/account/error.json
 */

import { readdir, readFile, writeFile } from "fs";
import { GetAccount } from "./app/helpers.js";

const account = GetAccount( process.argv[2] );
const root = `results/${account}`;

const errors = [];

/**
 * ha ha
 * @see <https://stackoverflow.com/a/549611>
 * @param {Error} up
 */
const throw_up = up => { if (up) { throw up }; };

function generate_error_info(root, errors) {
    const errorpath = `${root}/errors.json`;
    if (errors.length < 1) {
        console.log(`Great. All images were successfully fetched :-)`);
    } else {
        console.error(`Please refer ${errorpath} for further details.`);
        writeFile(errorpath, JSON.stringify(errors), throw_up);
    }
}

function check_content(images, subdir, subdir_index, subdir_array) {
    return (error, datasrc) => {
        throw_up(error);
        const image_metadata = JSON.parse(datasrc);
        const image_not_matched = image_metadata.length !== images.length;
        const is_last = subdir_index + 1 === subdir_array.length;
        const error_item = {
            id: subdir,
            received_images: images.length,
            requested_images: image_metadata.length,
        };
        if ( image_not_matched ) {
            errors.push( error_item );
        }
        if( is_last ) {
            generate_error_info(root, errors);
        }
    };
}

function generate_subdir(subdir, subdir_index, subdir_array) {
    return (error, files) => {
        throw_up(error);
        const images = files.filter(name => name !== "metadata");
        const image_metadata_path = `${root}/${subdir}/metadata/images.json`;
        readFile(image_metadata_path, check_content(images, subdir, subdir_index, subdir_array));
    };
}

const main = (error, result) => {
    throw_up(error);
    const dirs = result.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    dirs.forEach( (subdir, subdir_index, subdir_array) => { readdir(`${root}/${subdir}`, generate_subdir(subdir, subdir_index, subdir_array)); });
};

readdir( root, { withFileTypes: true }, main);
