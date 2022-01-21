const fs = require("fs");
const path = require("path");

/*file types*/
let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  image: ["jpg", "png", "gif", "raw"],
};

//creating new folders
function organizeFn(dirPath) {
  if (dirPath == undefined) {
    console.log("please enter a valid directory path");
    //check if directory is defined or not
    return;
  } else {
    let doesExits = fs.existsSync(dirPath);
    //check if directory exists or not+
    if (doesExits == true) {
      destFilePath = path.join(dirPath, "organized_files");
      //check if "organized_files" name folder exists or not at C:\Users\bappa\OneDrive\Desktop\My_Code\#javalab\#javalab\pepWebDev\projects\File_system_org
      if (fs.existsSync(destFilePath) == false) {
        //creating new directory named organized_files
        fs.mkdirSync(destFilePath);
      } else {
        console.log("Folder already exists");
      }
    } else {
      console.log("Please enter a valid directory path");
      return;
    }
  }
  organizeHelper(dirPath, destFilePath);
}
//function to categorize files
function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  // console.log(childNames);
  for (let i = 0; i < childNames.length; i++) {
    //join the child names with the src path
    let childPath = path.join(src, childNames[i]);
    //check if the child is file or folder
    let isFile = fs.lstatSync(childPath).isFile();
    // console.log(`${childNames[i]} is a file ${isFile}`);
    if (isFile == true) {
      let fileCatagory = getCatagory(childNames[i]);
      console.log(`${childNames[i]} is a ${fileCatagory}`);
      sendFile(childPath, fileCatagory, dest);
    }
  }
}
function getCatagory(name) {
  let ext = path.extname(name);
  ext = ext.slice(1);
  for (let type in types) {
    if (types[type].includes(ext)) {
      return type;
    }
  }
}

function sendFile(srcPath, fileCatagory, dest) {
  let destPath = path.join(dest, fileCatagory);
  if (fs.existsSync(destPath) == false) {
    fs.mkdirSync(destPath);
  }
  let destFilePath = path.join(destPath, path.basename(srcPath));
  fs.copyFileSync(srcPath, destFilePath);
  fs.unlinkSync(srcPath); // deleted the files from src
}

module.exports = {
  organizeKey: organizeFn,
};
