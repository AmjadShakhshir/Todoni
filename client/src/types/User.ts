export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    apikey: string;
}

export type UserInput = {
    name: string;
    email: string;
    password: string;
}