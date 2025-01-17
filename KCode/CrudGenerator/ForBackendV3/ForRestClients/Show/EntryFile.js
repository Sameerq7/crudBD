import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
const CommonShow = "Show";
import { StartFunc as GetEndPoints } from "./GetEndPoints/EntryFile.js";
import { StartFunc as PostEndPoints } from "./PostEndPoints/EntryFile.js";

let StartFunc = ({ inTablesCollection, inTo, inConfigJson }) => {
    GetEndPoints({ inTablesCollection, inTo });
    PostEndPoints({ inTablesCollection, inTo, inConfigJson });
};

let LocalFuncForGetEndPoints = ({ inTablesCollection, inTo }) => {
    let LocalTypeName = "Show/restClients/GetEndPoints";
    let LocalTo = inTo;

    let LocalTablesCollection = inTablesCollection;

    let LocalFirstLevelFolders = LocalTablesCollection.children.filter(element => {
        return "children" in element === false;
    }).filter(element => element.name.endsWith(".json"))

    LocalFirstLevelFolders.forEach(element => {
        let LoopInsideFileName = path.parse(element.name).name;
        let LocalFilePath = `${LocalTo}/${LoopInsideFileName}/${LocalTypeName}`;

        LocalFuncWriteToHome({
            inFrom: `${process.env.PORT}/${LocalTo}/${LoopInsideFileName}`,
            inTo: `${LocalFilePath}`
        });

        LocalFuncWriteToDataOnly({
            inFrom: `${process.env.PORT}/${LocalTo}/${LoopInsideFileName}`,
            inTo: `${LocalFilePath}`
        });
    });
};

const LocalFuncWriteToHome = ({ inFrom, inTo }) => {
    let LocalFileData = `GET http://localhost:${inFrom}/${CommonShow}`;

    fs.writeFileSync(`${inTo}/home.http`, LocalFileData);
};

const LocalFuncWriteToDataOnly = ({ inFrom, inTo }) => {
    const LocalEndPoint = "DataOnly";
    let LocalFileData = `GET http://localhost:${inFrom}/${CommonShow}/${LocalEndPoint}`;

    fs.writeFileSync(`${inTo}/${LocalEndPoint}.http`, LocalFileData);
};

export { StartFunc };