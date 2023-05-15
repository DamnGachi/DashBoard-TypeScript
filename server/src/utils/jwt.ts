import jwt from 'jsonwebtoken'
import config from 'config'

export function signJwt(object: Object,
    key: "AccessToken" | "RefreshToken",
    options?: jwt.SignOptions | undefined) {
    const signingKey = Buffer.from(config.get<string>(key), "base64").toString('ascii')

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256"
    })


}
