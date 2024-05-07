import jose from 'node-jose';

const createTokens = async (email: any) => {
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
        }

        let keystore = jose.JWK.createKeyStore();
        const result = await jose.JWK.asKeyStore(ks);
        keystore = result;
        let key = keystore.get('acda360fb36cd15ff83af83e173f47ffc36d111c'); // primary key we've to store in env
        // Create a secret key using the properties from the existing key
        const secretKey = await jose.JWK.createKey('RSA', 2048, key.toJSON());

        // Create a signer using the secret key
        const signer = jose.JWS.createSign({ format: 'compact' }, secretKey);

        // Update the signer with the payload
        const token = await signer.update(JSON.stringify(key)).update(JSON.stringify({ email })).final();
        // return { token: token };

        const refreshTokenSigner = jose.JWS.createSign({ format: 'compact' }, secretKey);
        const refreshExpiresIn = 604800; //7 days in seconds
        // Set the payload and header for Refresh Token
        const refreshTokenPayload = JSON.stringify(email);
        const refreshTokenHeader = { alg: 'RS256', typ: 'RefreshToken', exp: Math.floor(Date.now() / 1000) + refreshExpiresIn };

        // Sign the Refresh Token
        const refreshToken = await refreshTokenSigner
            .update(JSON.stringify(refreshTokenHeader))
            .update(refreshTokenPayload)
            .final();


        await verifyToken(secretKey, token)
        return { token, refreshToken };

    } catch (error) {
        console.error('Error:', error);
    }
}


async function verifyToken(secretKey: string | object | undefined, token: jose.JWS.CreateSignResult) {
    const verifier = jose.JWS.createVerify(secretKey);

    const result1 = await verifier.verify(token.toString());

}


export default createTokens



