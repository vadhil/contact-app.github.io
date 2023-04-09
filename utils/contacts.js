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



const loadContact = () =>{
    const fileBuffer = fs.readFileSync(dataPath, 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const findContact = (name) =>{
    const contacts = loadContact();
    const contact = contacts.find( (contact) => contact.name === name)
    return contact;
};

const saveContact = (contacts) => {
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
}

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContact(contacts);
}

//check duplicate name

 const checkDuplicate = (name) =>{ 
    const contacts = loadContact();
    return contacts.find( contact =>  contact.name === name)}

module.exports = { loadContact, findContact, addContact, checkDuplicate };


// const deleteContact = (name) =>{ }



// console.log(findContact('fadhil'));





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



// Array.find()
//take every contact json



//it will be relatif to app js 






/////////eksperimen////////////////////////////////

//fail bcos we cant pass object in the parameter 
// const writeJson = (file, path) => {
//     let jsonFile = readJson(path);
//     // const json = JSON.parse(jsonFile)
//     jsonFile.push(file)
//     return fs.writeFileSync(file, JSON.stringify(jsonFile), 'utf-8');
// }
// writeJson(profile, dataPath);
