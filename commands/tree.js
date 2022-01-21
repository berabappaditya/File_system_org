const fs = require("fs");
const path = require("path");
function treeFn(dirpath) {
  if (dirpath == undefined) {
    console.log("please Enter valid command");
  } else {
    let doesExits = fs.existsSync(dirpath);
    if (doesExits == true) {
      treeHelper(dirpath, "  ");
    }
  }
}
function treeHelper(targetPath, indent) {
  let isFile = fs.lstatSync(targetPath).isFile();
  if (isFile == true) {
    let fileName = path.basename(targetPath);
    console.log(indent + "├──" + fileName);
  } else {
    let dirName = path.basename(targetPath);
    console.log(indent + "└──" + dirName);

    let children = fs.readdirSync(targetPath);
    // console.log(children)
    for (let i = 0; i < children.length; i++) {
      let childPath = path.join(targetPath, children[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}

module.exports = {
  treeKey: treeFn,
};
