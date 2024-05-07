"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_jose_1 = __importDefault(require("node-jose"));
const createTokens = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ks = {
            "keys": [
                {
                    "use": "sig",
                    "alg": "RS256",
                    "n": "r54td3hTv87IwUNhdc-bYLIny4tBVcasvdSd7lbJILg58C4DJ0RJPczXd_rlfzzYGvgpt3Okf_anJd5aah196P3bqwVDdelcDYAhuajBzn40QjOBPefvdD5zSo18i7OtG7nhAhRSEGe6Pjzpck3wAogqYcDgkF1BzTsRB-DkxprsYhp5pmL5RnX-6EYP5t2m9jJ-_oP9v1yvZkT5UPb2IwOk5GDllRPbvp-aJW_RM18ITU3qIbkwSTs1gJGFWO7jwnxT0QBaFD8a8aev1tmR50ehK-Sz2ORtvuWBxbzTqXXL39qgNJaYwZyW-2040vvuZnaGribcxT83t3cJlQdMxw",
                    "kid": "acda360fb36cd15ff83af83e173f47ffc36d111c",
                    "kty": "RSA",
                    "e": "AQAB"
                },
                {
                    "alg": "RS256",
                    "e": "AQAB",
                    "use": "sig",
                    "kid": "96971808796829a972e79a9d1a9fff11cd61b1e3",
                    "kty": "RSA",
                    "n": "vfBbH3bcgTzYXomo5hmimATzkEF0QIuhMYmwx0IrpdKT6M15b6KBVhZsPfwbRNoui3iBe8xLON2VHarDgXRzrHec6-oLx8Sh4R4B47MdASURoiIOBiSOiJ3BjKQexNXT4wO0ZLSEMTVt_h24fgIerASU6w2XQOeGb7bbgZnJX3a0NAjsfrxCeG0PacWK2TE2R00mZoeAYWtCuAsE-Xz0hkGqEsg7HqIMYeLjQ-NFkGBErGAi5Cd_k3_D7rv0IEdoB1GkJpIdMLqnI-MR_OxsQNZGpC12OaLXCqgkFAgW69QLAG3YMaTFgPi-Us1i2idc4SPADYijiPml---jCap9yw"
                }
            ]
        };
        let keystore = node_jose_1.default.JWK.createKeyStore();
        const result = yield node_jose_1.default.JWK.asKeyStore(ks);
        keystore = result;
        let key = keystore.get('acda360fb36cd15ff83af83e173f47ffc36d111c'); // primary key we've to store in env
        // Create a secret key using the properties from the existing key
        const secretKey = yield node_jose_1.default.JWK.createKey('RSA', 2048, key.toJSON());
        // Create a signer using the secret key
        const signer = node_jose_1.default.JWS.createSign({ format: 'compact' }, secretKey);
        // Update the signer with the payload
        const token = yield signer.update(JSON.stringify(key)).update(JSON.stringify({ email })).final();
        // return { token: token };
        const refreshTokenSigner = node_jose_1.default.JWS.createSign({ format: 'compact' }, secretKey);
        const refreshExpiresIn = 604800; //7 days in seconds
        // Set the payload and header for Refresh Token
        const refreshTokenPayload = JSON.stringify(email);
        const refreshTokenHeader = { alg: 'RS256', typ: 'RefreshToken', exp: Math.floor(Date.now() / 1000) + refreshExpiresIn };
        // Sign the Refresh Token
        const refreshToken = yield refreshTokenSigner
            .update(JSON.stringify(refreshTokenHeader))
            .update(refreshTokenPayload)
            .final();
        yield verifyToken(secretKey, token);
        return { token, refreshToken };
    }
    catch (error) {
        console.error('Error:', error);
    }
});
function verifyToken(secretKey, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifier = node_jose_1.default.JWS.createVerify(secretKey);
        const result1 = yield verifier.verify(token.toString());
    });
}
exports.default = createTokens;
