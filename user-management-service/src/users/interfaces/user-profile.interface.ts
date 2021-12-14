export interface UserProfile {
    id: number;
    name: string;
    address: {
        city: string,
        street: string,
        country: string
    }
}