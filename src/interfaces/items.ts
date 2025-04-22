import { ItemType, Category, Gender, Subcategory, Color } from "@/enums/item_enums";
export type MixedItem = FoundItem | LostItem;

export interface Item {
    id: string;
    type: ItemType;
    name: string;
    category: Category;
    gender?: Gender;
    dateTime: string;
    location: string;
    color: Color;
    subcategory?: Subcategory;
    detailedDescription: string;
    locationDescription?: string;
    isPublic: boolean;
    isLostInPublicTransport?: string;
    url_images?: string[];
}

export interface LostItem extends Item {
    type: ItemType.Perdido,
    reward: number
    
}

export interface FoundItem extends Item {
    type: ItemType.Encontrado,
    deliveryLocation: string
    
}

export interface ItemImages {
    itemImages: File[] | undefined;
}
