

export type User = {
    id: number;
    login: string,
    password: string,
    name: string,
    surname: string,
    role: Role
}

export enum Role {
    ADMIN = 'admin',
    DEVOPS = 'devops',
    DEVELOPER = 'developer'
}

