import { ItemFoundNotification } from '@/interfaces/notifications'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useLoadingStore } from './LoadingStore'
import supabase from '@/supabase'
import { useAuthStore } from './AuthStore'

export const useNotificationStore = defineStore('notification', () => {

    const LoadingStore = useLoadingStore()
    const AuthStore = useAuthStore()
    const { user } = storeToRefs(AuthStore)
    const userNotifications = ref<ItemFoundNotification[]>([])

    function mapToItemNotification(n: any): ItemFoundNotification {
        return {
            id: n.id,
            itemID: n.item_id,
            itemName: n.item_name,
            senderID: n.sender_id,
            anonID: n.anon_id,
            receiverID: n.receiver_id,
            findingDate: n.finding_date,
            findingTime: n.finding_time,
            message: n.message,
            finding_location: n.finding_location,
            deliveryLocation: n.deliveryLocation,
            sender_email: n.sender_email,
            sender_phone: n.sender_phone,
            latLong: n.latLong,
        }
    }

    async function uploadNotification(notification: ItemFoundNotification) {
        try {
            LoadingStore.startLoading()

            const { error: notificationError } = await supabase
            .from('item_notifications')
            .insert([{
                item_id: notification.itemID,
                item_name: notification.itemName,
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
            }])

            if (notificationError) throw notificationError

        } catch (err: any) {
            const error = 'Error uploading notification: ' + err.message
            console.error(error)
            throw error

        } finally {
            LoadingStore.endLoading()
        }
    }

    async function fetchUserNotifications(): Promise<void> {
        try {
            LoadingStore.startLoading()

            if (!user.value.id) throw new Error('User not authenticated')

            const { data, error } = await supabase
            .from('item_notifications')
            .select('*')
            .eq('receiver_id', user.value.id)
            .order('created_at', { ascending: false })

            if (error) throw error
            if (data) userNotifications.value = data.map(mapToItemNotification)

        } catch (err: any) {
            const error = 'Error fetching notifications: ' + err.message
            console.error(error)
            throw error

        } finally {
            LoadingStore.endLoading()
        }
    }

    function listenToRealtime(): void {
        const channel = supabase
            .channel('public:item_notifications')
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'item_notifications',
                }, (payload) => {
                    const newNotification = mapToItemNotification(payload.new)
                    if (newNotification.receiverID === user.value?.id) {
                        userNotifications.value.unshift(newNotification)
                    }
                })
                .on('postgres_changes', {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'item_notifications',
                }, (payload) => {
                    userNotifications.value = userNotifications.value.filter(n => n.id !== payload.old.id)
            })

            channel.subscribe()
    }

    return {
        userNotifications,
        fetchUserNotifications,
        listenToRealtime,
        uploadNotification,
    }
})