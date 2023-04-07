const fs = require('fs');

// create dirPath
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
fs.mkdirSync(dirPath);
}

//create dirFile
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
fs.writeFileSync(dataPath, '[]', 'utf8');
}


// const profile = {
//     name: 'fadhil',
//     phone: '08953254w',
//     email: 'upchh@example.com',
// }

// // read and change to object
// const readJson = (path) =>{
//     return JSON.parse(fs.readFileSync(path, 'utf-8'));
// }
// // read and change 
// const jsonFile = readJson(dataPath);
// // push
// jsonFile.push(profile);
// // overwrite
// fs.writeFileSync(dataPath, JSON.stringify(jsonFile), 'utf-8');
// // fs.close();


const loadContact = () =>{
    const contacts = fs.readFileSync(dataPath, 'utf8');
    const contact = JSON.parse(contacts);
    return contact;
}

//it will be relatif to app js 
module.exports = { loadContact };






/////////eksperimen////////////////////////////////

//fail bcos we cant pass object in the parameter 
// const writeJson = (file, path) => {
//     let jsonFile = readJson(path);
//     // const json = JSON.parse(jsonFile)
//     jsonFile.push(file)
//     return fs.writeFileSync(file, JSON.stringify(jsonFile), 'utf-8');
// }
// writeJson(profile, dataPath);
