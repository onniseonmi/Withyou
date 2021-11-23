require('dotenv').config();
// const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const bucket = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_IAM_USER_KEY;
const secretAccessKey = process.env.AWS_IAM_USER_SECRET;
const region = process.env.AWS_S3_REGION;
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: 'public-read',
//     // metadata: function (req, file, cb) {
//     //     cb(null, { fieldName: file.fieldname });
//     // },
//     key: function (req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
// }); // S3로 이미지 업로드

const profileUpload = multer({
  storage: multerS3({
    s3,
    bucket,
    // ACL: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
}); // S3로 이미지 업로드

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, './uploads/');
//         },
//         filename: (req, file, cb) => {
//             const ext = path.extname(file.originalname);
//             cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// }); // 이미지 업로드 로컬 테스트용(업로드 시 로컬에 이미지 파일이 저장됨)

// exports.upload = upload;

// exports.setProfilePic = (req, res) => {
//   console.log(req.file);
//   const uploadSingle = profileUpload.single('img');
//   uploadSingle((req, res, err) => {
//     if (err) {
//       res.status(400).send({ message: 'false' });
//     }
//     console.log(req.file);
//     res.status(200).send({ profileUrl: req.file });
//   });
// };
exports.profileUpload = profileUpload;
