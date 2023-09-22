import jwt from "jsonwebtoken";

export const validationToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        token && !err
            ? next()
            : res.status(498).send(`Ocurrió un error: ${err.message}, vuelva a conectarse`);
    });
};
