export interface User {
    email: string;
    password: string;
}

export interface UserProfile {
    profilePicture: File | undefined;
}

export interface UserDetails {
    username: string;
    phone?: string;
    region?: string;
    province?: string;
    municipality?: string;
}