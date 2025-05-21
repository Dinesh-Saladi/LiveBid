import passport from "passport";
import { Strategy } from "passport-local";
import bycrypt from "bcrypt";
import { sql } from "./db.js";

export default async function initializePassport(passport) {
    async function verify(email, password, done) {
        const user = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;
        if (!user) {
            return done(null, false, { message: "Incorrect email" });
        }
        try{
            const match = await bycrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        }catch(error) {
            console.error(error);
            return done(null, false, { message: "Error validating user" });
        }
    }
    passport.use(new Strategy({usernameField: "email"}, verify));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await sql`
            SELECT * FROM users WHERE id = ${id}
        `;
        done(null, user);
    });
}