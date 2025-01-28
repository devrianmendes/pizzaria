import crypto from "crypto";
import multer from "multer";

import { extname, resolve } from "path";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          console.log(request, ' no multer')
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};

// import crypto from "crypto";
// import multer from "multer";
// import { extname, resolve } from "path";

// const multerConfig = {
//   upload(folder: string) {
//     return {
//       storage: multer.diskStorage({
//         destination: resolve(__dirname, "..", "..", folder),
//         filename: (request: any, file, callback) => {
//           const fileHash = crypto.randomBytes(8).toString("hex");

//           console.log(request, 'request no multer')
//           // Acesse o nome e o ID armazenados no request
//           const productName = request.productName;
//           const productId = request.productId;

//           console.log(productName, productId, 'no multer')

//           // Construa o nome do arquivo
//           const fileName = `${productId}-${productName}`;

//           callback(null, fileName);
//         },
//       }),
//     };
//   },
// };

// export { multerConfig };
