export interface User {
    _id: string;
    username: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    phoneNumber?: string;
    address?: string;
    favoriteBook?: string;
    favoriteGenres?: string[];
}
