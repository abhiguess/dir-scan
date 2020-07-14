const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');


app.get("/url", (req, res, next) => {

    // Declare your own data
    var foldername = 'videos';
    var folderpath = 'C:/Users/abhig/PhpstormProjects/nodedir/videos/';
    var video_width = '540';
    var video_height = '960';
    var thumb_ext = 'jpg';

    //joining path of directory
    const directoryPath = path.join(__dirname, foldername);
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        let dir = [];
        $i = 1;

        files.forEach(function (file) {
            var stats = fs.statSync(foldername+"/"+file);
            var fileSizeInBytes = stats["size"];
            var title = file.split('.').slice(0, -1).join('.');
            var titleFormatted = title.charAt(0).toUpperCase() + title.slice(1).replace("-", " ").replace("_", " ");

            dir.push(
                {
                    "id": $i++,
                    "title": titleFormatted,
                    "thumbnail": folderpath+title+'.'+thumb_ext,
                    "video": folderpath.concat(file),
                    "width": video_width,
                    "height": video_height,
                    "new_assets": folderpath+title+'.zip',
                    "assets_size": fileSizeInBytes,
                },
            );
        });
        res.json({"data": dir});
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

