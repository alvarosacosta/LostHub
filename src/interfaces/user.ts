export interface User {
    email: string;
    password: string;
}

export interface UserProfileImage {
    profilePicture: File | undefined;
    profilePictureURL?: string;
}

export interface UserDetails {
    username: string;
    phone?: string;
    region?: string;
    province?: string;
    municipality?: string;
    profilePictureURL?: string;
}