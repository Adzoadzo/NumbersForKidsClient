import jwt_decode from 'jwt-decode';

export const getUidFromJWT = (jwt) => {
    return jwt_decode(jwt).sub;
}