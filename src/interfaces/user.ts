export interface User {
    email: string;
    password: string;
}

export interface UserProfileImage {
    profilePicture: File | undefined;
}

export interface UserDetails {
    username: string;
    isPublic: boolean;
    email: string;
    phone?: string;
    region?: string;
    province?: string;
    municipality?: string;
    profilePictureURL?: string;
}