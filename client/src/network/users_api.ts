import axios from "axios";
import { User } from "../models/userModel";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}
export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData('/api/users', {method: 'GET', credentials: 'include'});
    return await response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export interface UserInput {
    username: string,
    email: string,
    password: string,
    
}
export interface UserUpdate {
    username?: string,
    email?: string,
    password?: string,
}
export interface UserUpdate {
    firstName?: string;
    lastName?: string;
    birthday?: string;
    phoneNumber?: string;
    address?: string;
    favoriteBook?: string;
    favoriteGenres?: string[];

}

export async function createUser(user: UserInput): Promise<User> {
    const response = await fetchData("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export async function updateProfile(userId: string, user: UserUpdate): Promise<User> {
    const response = await fetchData(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export async function updateUser(userId: string, user: UserUpdate): Promise<User> {
    const response = await fetchData(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export const getUserProfile = async () => {
    const response = await axios.get('/api/users'); 
    return response.data;
};

export async function deleteUser(userId: string) {
    await fetchData(`/api/users/${userId}`, { method: "DELETE" });
}

export const getUserById = async (userId: string) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
}

export const updateUserProfile = async (userId: string, updatedData: Partial<User>) => {
    const response = await axios.patch(`/api/users/${userId}`, updatedData);
    return response.data;
};


