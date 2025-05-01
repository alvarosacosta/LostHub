import { ItemType, Category, Gender, Subcategory, Color, Brand } from "@/enums/item_enums";
export type MixedItem = FoundItem | LostItem;

export interface ItemImages {
    itemImages?: File[];
}
export interface Item {
    id?: string;
    type: ItemType;

    name: string;
    category: Category;
    subcategory?: Subcategory;
    gender?: Gender;
    color: Color;
    race?: string;
    brand?: Brand;
    detailedDescription: string;
    
    location: string;
    locationDescription?: string;
    latLong: number[];
    publicTransport?: string;
    transportInfo: string;

    date: string;
    time: string;
    confidence: boolean;

    url_images?: string[];
}

export interface LostItem extends Item {
    type: ItemType.Perdido,
    reward: string
    
}

export interface FoundItem extends Item {
    type: ItemType.Encontrado,
    deliveryLocation: string
    
}
