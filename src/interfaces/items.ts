export type MixedItem = FoundItem | LostItem;

export interface Item {
    type: 'Encontrado' | 'Perdido';
    id: string,
    name: string,
    category: string,
    gender: 'Macho' | 'Hembra' | undefined,
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
    type: 'Perdido',
    reward: number
    
}

export interface FoundItem extends Item {
    type: 'Encontrado',
    deliveryLocation: string
    
}
