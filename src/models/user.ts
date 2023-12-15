import { z } from "zod";

const jsonSchema = z.object({
    id: z.number().positive(),
    email: z.string().email(),
    access_token: z.string(),
    refresh_token: z.string(),
})

export class User {
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;

    constructor(id: number, email: string, accToken: string, refToken: string) {
        this.id = id
        this.email = email
        this.accessToken = accToken
        this.refreshToken = refToken
    }

    updateAccToken(token: string): User {
        const user = new User(this.id, this.email, token, this.refreshToken)
        return user;
    }

    toJson(): string {
        const item = {
            id: this.id, email: this.email, access_token: this.accessToken, refresh_token: this.refreshToken
        }
        return JSON.stringify(item)
    }

    static fromJson(v: object): User {
        const item = jsonSchema.parse(JSON.parse(JSON.stringify(v)))
        const user = new User(
            item.id,
            item.email,
            item.access_token,
            item.refresh_token,
        )
        return user;
    }
}