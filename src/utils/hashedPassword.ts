import crypto from "crypto";

export const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
} 

export const hashPassword = (password : string, salt : string) => {
    const iterations = 10000; // Number of iterations
    const keyLength = 64; // Desired key length in bytes
    const digest = 'sha512'; // Hashing algorithm

    const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
    return derivedKey.toString('hex');
}