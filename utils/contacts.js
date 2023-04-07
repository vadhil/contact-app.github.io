const fs = require('fs');

//create dirPath
const dirPath = '../data';
if (!fs.existsSync(dirPath)) {
fs.mkdirSync(dirPath);
}

//create dirFile
const dataPath = '../data/contacts.json';
if (!fs.existsSync(dataPath)) {
fs.writeFileSync(dataPath, '[]', 'utf8');
}

//readfile from json
const jsonFile = fs.readFileSync(dataPath, 'utf8');

//writefile to json
const profile = {
    name: 'John Doe',
    phone: '1234567890'
}

const parse = JSON.parse(jsonFile);
parse.push(profile);

fs.writeFileSync(dataPath, JSON.stringify(parse));





// const parse = JSON.parse(jsonFile);
// const adding = parse.push(profile);
// fs.writeFileSync(dataPath, JSON.stringify(adding));

