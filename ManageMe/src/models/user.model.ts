

export type User = {
    user_id: number;
    user_login: string,
    user_password: string,
    user_name: string,
    user_surname: string,
    user_role: Role
}

export enum Role {
    ADMIN = 'admin',
    DEVOPS = 'devops',
    DEVELOPER = 'developer'
}

