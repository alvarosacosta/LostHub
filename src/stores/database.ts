import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/supabase';
import type { MixedItem } from '@/interfaces/items'

export const useItemsStore = defineStore('items', () => {

  const allItems = ref<MixedItem[]>([])
  const singleItem = ref<MixedItem>()
  const fetchedUserID = ref<string>('')

  async function fetchAllItems() : Promise<void>{
    try {
        const { data, error } = await supabase
            .from('item_details')
            .select('*')

        if (error) throw error;

        if (data) {
            allItems.value = data.map((item: any): MixedItem => {
                const baseItem = {
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    subcategory: item.subcategory,
                    gender: item.gender,
                    color: item.color,
                    dateTime: item.datetime,
                    location: item.location,
                    detailedDescription: item.description,
                    locationDescription: item.location_description,
                    isPublic: item.is_public,
                    isLostInPublicTransport: item.is_lost_in_public_transport,
                    url_images: item.url_images,
                    type: item.type,
                };
        
                if (item.type === 'Perdido') {
                    return {
                        ...baseItem,
                        reward: item.reward,
                    };
                } else {
                    return {
                        ...baseItem,
                        deliveryLocation: item.deliveryLocation,
                    };
                }
            });
        }
    
    } catch(err: any) {
        console.error("Error fetching all items: " + err.message)

    }
  }

  async function fetchItemById(id: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('item_details')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      if (data) {
        const baseItem = {
          id: data.id,
          name: data.name,
          category: data.category,
          subcategory: data.subcategory,
          gender: data.gender,
          color: data.color,
          dateTime: data.datetime,
          location: data.location,
          detailedDescription: data.description,
          locationDescription: data.location_description,
          isPublic: data.is_public,
          isLostInPublicTransport: data.is_lost_in_public_transport,
          url_images: data.url_images,
          type: data.type,
        }

        if (data.type === 'Perdido') {
          singleItem.value = {
            ...baseItem,
            reward: data.reward,
          }
        } else {
          singleItem.value = {
            ...baseItem,
            deliveryLocation: data.deliveryLocation,
          }
        }
      }

    } catch (err: any) {
      console.error('Error fetching item by ID:', err.message)
    }
  }

  async function fetchUserIdByItemId(itemId : string) {
    try {
        const { data, error } = await supabase
        .from('item_details')
        .select('user_id')
        .eq('id', itemId)
        .single()

        if (error) throw error
        if (data) fetchedUserID.value = data.user_id

    } catch(err : any) {
        console.error("Error fecthing user ID using Item ID: " + err.message)
    }
  }

  return {
    allItems,
    singleItem,
    fetchedUserID,
    fetchAllItems,
    fetchItemById,
    fetchUserIdByItemId
  }
})