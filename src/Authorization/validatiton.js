// import jwt from "jsonwebtoken";

// export const validationToken = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token)

//     jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//         token && !err
//             ? next()
//             : res.status(400).json(`Token no válido, ${err}`);
//     });
// };
