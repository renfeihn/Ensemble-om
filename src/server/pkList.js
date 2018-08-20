
const fs = require("fs");
// var Finder = require('fs-finder');
const glob = require("glob");
var path = '../../data/server/dictionarys'

export function getPkList (params) {
    var files = glob.sync(path, {nodir: true})
    files.forEach(function (filePath) {
        const statFile = fs.statSync(filePath);
        // var paths = Finder.in(files).find();
        // if (!statFile.isDirectory()) {
        //     // 如果是文件，读取文件
        //     var fileStr = fs.readFileSync(filePath, {encoding: 'binary'});
        //     var buf = new Buffer(fileStr, 'binary');
        //     var data = iconv.decode(buf, 'GBK');
        //     const json = JSON.parse(data);
        //     objs.push(json);
        // }
        var test =''
    });

}