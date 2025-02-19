export class HelperUploadFile {
    static customFileName(req, file, cb) {
        //sửa tên file sao cho ko trùng
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        //định dạng ảnh
        let fileExtension = "";
        if (file.mimetype.indexOf("jpeg") > -1) {
            fileExtension = "jpg"
        } else if (file.mimetype.indexOf("png") > -1) {
            fileExtension = "png";
        }
        const originalName = file.originalname.split(".")[0];
        originalName.split(" ")[0]
        cb(null, originalName + '-' + uniqueSuffix + "." + fileExtension);
    }

    static destinationPath(req, file, cb) {
        cb(null, 'src/uploads/')
    }
}