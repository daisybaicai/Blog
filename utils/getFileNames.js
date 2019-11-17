/**
 * 获取目录下所有文件名
 */

let fs = require('fs');
let path = require('path');
let { sep } = path
const FOLDERPATH = 'docs/';

// fs.readdir(FOLDERPATH, (err, files) => {
//   let filenames = [];
//   files.forEach(file => {
//     if(file === 'README.md') {
//       fs.readFile(path.resolve(FOLDERPATH, './README.md'), function (err, data) {
//         if (err) {
//             return console.error(err);
//         }
//         // console.log("异步读取: " + data.toString());
//      });
//     } else {
//       file = `'${file.replace('.md', ``)}'`;
//     }
//     filenames.push(file+'');
//   })
//   console.log(`[${filenames}]`);
//   // fs.writeFile(path.resolve(__dirname, './filenames.js'), `[${filenames}]` , () => {
//   //   console.log('finish');
//   // })
// })


const excludes = '.vuepress';
const imgexcludes = 'images';
let obj = {};
let index = -1;
function readdir(path, prefix, attrName) {
  let exist = fs.existsSync(path); //检测目录是否存在
  let stat = fs.statSync(path); //文件信息
  if (exist && stat) {
    // 如果是目录，继续读取
    if (stat.isDirectory()) {
      let fpath = path.split(sep);
      // prefix = fpath[0];
      // prefix == 'docs/'? prefix.replace(/\//,'') : prefix;
      // console.log(fpath);
      // 拿到目录下所有名称
      const filenames = fs.readdirSync(fpath[0]);
      // console.log(typeof filenames);
      // console.log(filenames);
      // console.log(this.obj);
      filenames.forEach((file) => {
        if (excludes.indexOf(file) < 0 && imgexcludes.indexOf(file) < 0) {
          // let preDir = prefix.replace(/\//,'');
          // 当以md结尾的文件，不加入通过文件的循环来操作.
          if (!(/(.*)\.md/).test(file)) {
            if(prefix == 'docs/') {
              obj[`/${file}/`] = [];
              index = -1;
            } else {
              obj[`/${attrName}/`] = [...obj[`/${attrName}/`],{
                title: `${file}`,
                children: [
                ]
              }];
              index++;
            }
            // prefix == 'docs/' ? obj[`/${file}/`] = []: obj[`/${attrName}/`] = [...obj[`/${attrName}/`],{
            //   title: `${file}`,
            //   children: [
            //   ]
            // }];
          }
          // 拿到当前对象所在的index.

          let path = `${prefix}/${file}`;
          path = path.replace(/\/\//g, "/")
          readdir(path, path, file);
        }
      })
      // console.log(filenames);
      // console.log(typeof this.obj);
    } else if(stat.isFile()) {
      let fpath = path.split(sep);
      let fileName = fpath[fpath.length - 1];
      let regName = fileName.match(/([^\.\/\\]+)\.([a-z]+)$/i);
      regName = regName[0];
      console.log(regName);
      // console.log('regName', regName);
      // let fileNameWithoutSuffix = regName.replace(/(.*)\.md/, '$1');
      let newpath = path.replace(/^docs(.*)/, '$1');
      let fileNameWithoutSuffix = newpath.replace(/(.*)\.md/, '$1');
      // console.log(newpath);
      // console.log('name',fileName);
      // README跳过，不处理.
      if(regName !== 'README.md') {
        let supAttr = path.split('/')[1];
        // console.log('add', obj[`/${supAttr}/`],'index',index,'filename',fileName);
        
        obj[`/${supAttr}/`][index].children.push(fileNameWithoutSuffix);
        // obj[`/${supAttr}/`][index].children.push(fileNameWithoutSuffix);
        // console.log(supAttr);
        // if(index == 7) {
        //   console.log(obj[`/Base/`][7]);
        // }
        // console.log('path',path);
        // console.log('prefix',prefix);
        // console.log('attrname', attrName);
        // let children = obj['/Algorithm/'];
        // children = children[0];
        // console.log(children);
      }
      // console.log('filename', fileNameWithoutSuffix);
    }
  }
}

readdir(FOLDERPATH, 'docs/');
console.log(obj);
fs.writeFile(path.resolve(__dirname, './filenames.js'),  JSON.stringify(obj,"","\t") , () => {
  console.log('finish');
})