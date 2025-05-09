export interface ItemFoundNotification {
    id?: string;
    itemID: string;
    itemName: string;
    senderID: string | null;
    anonID?: string;
    receiverID: string;
    findingDate: string;
    findingTime: string;
    message: string;
    finding_location: string;
    deliveryLocation: string;

    sender_email: string;
    sender_phone?: string;

    url_images?: string[];
    latLong: number[];
}

export interface NotificationImages {
    notificationImages?: File[];
}