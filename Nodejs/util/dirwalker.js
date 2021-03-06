    var fs = require('fs');  

    /* 
     
    递归处理文件,文件夹 
     
    path 路径 
    floor 层数 
    handleFile 文件,文件夹处理函数 
     
    */  

    function walk(path, floor, handleFile) {  
        handleFile(path, floor);  
        floor++;  
        fs.readdir(path, function(err, files) {  
            if (err) {  
                console.log('read dir error');  
            } else {  
                files.forEach(function(item) {  
                    var tmpPath = path + '/' + item;  
                    fs.stat(tmpPath, function(err1, stats) {  
                        if (err1) {  
                            console.log('stat error');  
                        } else {  
                            if (stats.isDirectory()) {  
                                walk(tmpPath, floor, handleFile);  
                            } else {  
                                handleFile(tmpPath, floor);  
                            }  
                        }  
                    })  
                });  

            }  
        });  
    }  

    exports.dirwalker = walk;   


    function walkSync(path, floor, handleFile) {  
        handleFile(path, floor);  
        floor++;  
        var files = fs.readdirSync(path);
        files.forEach(function(item) {  
            var tmpPath = path + '/' + item;  
            var stats = fs.statSync(tmpPath);
            if (stats.isDirectory()) {  
                walkSync(tmpPath, floor, handleFile);  
            } else {  
                handleFile(tmpPath, floor);  
            }  
        });  
    }  

    exports.dirwalkerSync = walkSync;  
