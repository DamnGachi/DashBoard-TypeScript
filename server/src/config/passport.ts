import passport from "passport";
import passportGoogle, { _StrategyOptionsBase } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
import { prisma } from "../utils/connectDB";

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id: string, done) => {
    const user = await prisma.googleUser.findFirst({ where: { id: id } });
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await prisma.googleUser.findFirst({
                where: { googleId: profile.id },
            });

            if (!user) {
                const email = profile.emails?.[0]?.value;
                if (email && typeof email === "string") {
                    const newUser = await prisma.googleUser.create({
                        data: {
                            username: profile.displayName,
                            email: email,
                            googleId: profile.id,
                        },
                    });
                    done(null, newUser);
                } else {
                    // Handle the case when the email value is missing or not a string
                    done("Invalid email");
                }
            } else {
                done(null, user);
            }
        }
    )
);

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: GOOGLE_CLIENT_ID,
//             clientSecret: GOOGLE_CLIENT_SECRET,
//             callbackURL: "/auth/google/redirect",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             const user = await prisma.googleUser.findFirst({
//                 where: { googleId: profile.id },
//             });

//             // If user doesn't exist creates a new user. (similar to sign up)
//             if (!user) {
//                 const email = profile.emails?.[0]?.value; // Check if the email value exists
//                 if (email && typeof email === "string") {
//                     // Ensure it is a string
//                     const newUser = await prisma.googleUser.create({
//                         data: {
//                             username: profile.displayName,
//                             email: email,
//                             googleId: profile.id,
//                         },
//                     });

//                     done(null, newUser);
//                 } else {
//                     done(null, user);
//                 }
//             }
//         }
//     )
// );
