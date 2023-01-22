import { readdir, readFile, writeFile } from "fs";

readdir( "./", (up, dirs) => {
    if( up ) throw up;
    const cds = dirs.filter( its => its.includes(".") === false );
    cds.forEach( (dir) => {
        const root = `./${dir}`;
        readFile(`${root}/metadata/contents.json`, { encoding: "utf8" }, (up, contents) => {
            if( up ) throw up;
            const json = JSON.parse( contents );
            const { body, title } = json.post;
            const { blocks, imageMap } = body;
            let result = `# ${title}`;
            let count = 0;
            blocks.forEach( (block) => {
                result += "\n\n";
                switch (block.type) {
                    case "p":
                        result += block.text;
                        break;
                    case "image":
                        count += 1;
                        let image = imageMap[block.imageId];
                        result += `![${block.imageId}](../${count}.${image.extension})`;
                        break;
                    default:
                        result += "\n\n";
                        break;
                }
            });
            writeFile( `${root}/metadata/transcript.md`, result, up => { if (up) throw up; } );
        });
    });
});

