import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../config';

const s3 = new aws.S3({
    accessKeyId: config.awsS3AccessKey,
    secretAccessKey: config.awsS3SecretAccessKey
});


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.awsBucket,
        acl: 'public-read',
        key: function(req, file, cb){
            //위치, 파일명 설정
            cb(null, 'images/origin/'+Date.now()+'.'+file.originalname.split('.').pop());
        }
    })
});

export default upload;