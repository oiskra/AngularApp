

export type User = {
    login: string,
    password: string,
    name: string,
    surname: string,
    role: Role
}

export enum Role {
    admin,
    devops,
    developer
}

