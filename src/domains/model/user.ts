export class UserWithoutPassword {
    id: string;
    username: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    hashRefreshToken?: string;
}

export class UserM extends UserWithoutPassword {
    password: string;
}
