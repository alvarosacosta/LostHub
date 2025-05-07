import { ItemFoundNotification, NotificationImages } from '@/interfaces/notifications'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { useLoadingStore } from './LoadingStore'
import supabase from '@/supabase'
import { generateUniqueFilePath } from '@/utils/fileUtils'

export const useNotificationStore = defineStore('notification', () => {
    
    const LoadingStore = useLoadingStore()

    async function uploadNotification(notification : ItemFoundNotification, images : NotificationImages){
        try {
            LoadingStore.startLoading()

            const imageUrls: string[] = [];
            if (images.notificationImages && images.notificationImages.length > 0) {
                for (const file of images.notificationImages) {
                    var filePath = ''

                    if(notification.anonID){
                        filePath = generateUniqueFilePath('anon-users', notification.anonID + '_' + notification.receiverID, notification.itemID, file.name)
                    } else {
                        filePath = generateUniqueFilePath(notification.senderID!, notification.receiverID, notification.itemID, file.name)
                    }
                
                    const { error: uploadFileError } = await supabase.storage
                        .from('notification-images')
                        .upload(filePath, file);
                
                    if (uploadFileError) throw uploadFileError;

                    const { data: itemUrlData } = supabase.storage
                        .from('notification-images')
                        .getPublicUrl(filePath);

                    imageUrls.push(itemUrlData.publicUrl);
                }
            }
            console.log(notification)
            const { error: notificationError } = await supabase
                .from('item_notifications')
                .insert([
                {
                    item_id: notification.itemID,
                    sender_id: notification.senderID,
                    anon_id: notification.anonID,
                    receiver_id: notification.receiverID,
                    finding_date: notification.findingDate,
                    finding_time: notification.findingTime,
                    message: notification.message,
                    finding_location: notification.finding_location,
                    deliveryLocation: notification.deliveryLocation,
                    sender_email: notification.sender_email, 
                    sender_phone: notification.sender_phone,
        
                    latLong: notification.latLong,
                    url_images: imageUrls
                },
                ])

            if (notificationError) throw notificationError;

        } catch(err: any) {
            const error = 'Error uploading notification: ' + err.message
            throw error

        } finally {
            LoadingStore.endLoading()
        }
    }
  
    return {
      uploadNotification
    }
})