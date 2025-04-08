export type MixedItem = FoundItem | LostItem;

export interface Item {
    type: 'found' | 'lost';
    id: string,
    name: string,
    category: string,
    gender: 'male' | 'female' | undefined,
    dateTime: string,
    location: string,
    files: string[] | undefined,
    isPublic: boolean,
    color: string,
    subcategory: string | undefined,
    detailedDescription: string,
    locationDescription: string | undefined,
    isLostInPublicTransport: boolean,
}

export interface LostItem extends Item {
    type: 'lost',
    reward: number
    
}

export interface FoundItem extends Item {
    type: 'found',
    deliveryLocation: string
    
}
