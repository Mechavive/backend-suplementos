// models/implementations/mock/mockUser.ts

import { User, UserRole } from "../../entity/user.entity.js";
import { UserCrud } from "../../crud/userCrud.interface.js";
import { UserInput } from "../../../dtos/user.dto.js"

export class MockUser implements UserCrud {
    private users: User[] = [];
    private idCounter = 1;

    constructor() {
        this.users = [
            {
                user_id: this.idCounter++,
                name: "Administrador",
                email: "admin@admin.com",
                password: "hashed_admin_password",
                address: "Admin Street 123",
                role: UserRole.ADMIN,
            },
            {
                user_id: this.idCounter++,
                name: "Usuario Normal",
                email: "user1@email.com",
                password: "hashed_user1_password",
                address: "User Street 456",
                role: UserRole.USER,
            },
        ];
    }

    async getAll(): Promise<User[]> {
        return this.users;
    }

    async getById(id: number): Promise<User | undefined> {
        return this.users.find((user) => user.user_id === id);
    }

    async create(data: UserInput): Promise<User> {
        const newUser: User = {
            ...data,
            user_id: this.idCounter++,
            role: data.role || UserRole.USER, // Por defecto "USER"
        };
        this.users.push(newUser);
        return newUser;
    }

    //   async update(id: number, data: Partial<User>): Promise<User | undefined> {
    //     const index = this.users.findIndex((u) => u.user_id === id);
    //     if (index === -1) return undefined;
    //     this.users[index] = { ...this.users[index], ...data };
    //     return this.users[index];
    //   }

    async update(id: number, data: Partial<User>): Promise<User | undefined> {
        const index = this.users.findIndex((u) => u.user_id === id);
        if (index === -1) return undefined;

        const existing = this.users[index]!;

        const updated = {
            ...existing,
            ...data,
            user_id: existing.user_id, // protección contra actualización del ID
        } as User;

        this.users[index] = updated;
        return updated;
    }


    async delete(id: number): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter((u) => u.user_id !== id);
        return this.users.length < initialLength;
    }

    clear(): void {
        this.users = [];
        this.idCounter = 1;
    }
}

export default new MockUser();
