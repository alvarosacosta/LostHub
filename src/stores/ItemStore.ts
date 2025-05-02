import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/supabase';
import type { ItemImages, MixedItem } from '@/interfaces/items'
import { generateUniqueFilePath } from '@/utils/fileUtils';
import { useLoadingStore } from './LoadingStore';

export const useItemsStore = defineStore('items', () => {

  const LoadingStore = useLoadingStore()

  const allItems = ref<MixedItem[]>([])
  const singleItem = ref<MixedItem>()
  const fetchedUserID = ref<string>('')
  const lastItemPostID = ref<string>('')

  async function fetchAllItems() : Promise<void>{
    try {
        LoadingStore.startLoading()

        const { data, error } = await supabase
            .from('item_details')
            .select('*')

        if (error) throw error;

        if (data) {
            allItems.value = data.map((item: any): MixedItem => {
                const baseItem = {
                  id: item.id,
                  type: item.type,
        
                  name: item.name,
                  detailedDescription: item.description,
                  category: item.category,
                  subcategory: item.subcategory,
                  gender: item.gender,
                  color: item.color,
                  race: item.race,
                  brand: item.brand,
        
                  location: item.location,
                  latLong: item.latLong,
                  locationDescription: item.location_description,
                  publicTransport: item.publicTransport,
                  transportInfo: item.transportInfo,
        
                  date: item.date,
                  time: item.time,
                  confidence: item.confidence,
        
                  url_images: item.url_images,
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

    } finally {
      LoadingStore.endLoading()
    }
  }

  async function fetchItemById(id: string): Promise<void> {
    try {
      LoadingStore.startLoading()

      const { data, error } = await supabase
        .from('item_details')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      if (data) {
        const baseItem = {
          id: data.id,
          type: data.type,

          name: data.name,
          detailedDescription: data.description,
          category: data.category,
          subcategory: data.subcategory,
          gender: data.gender,
          color: data.color,
          race: data.race,
          brand: data.brand,

          location: data.location,
          latLong: data.latLong,
          locationDescription: data.location_description,
          publicTransport: data.publicTransport,
          transportInfo: data.transportInfo,

          date: data.date,
          time: data.time,
          confidence: data.confidence,

          url_images: data.url_images,
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

    } finally {
      LoadingStore.endLoading()
    }
  }

  async function fetchUserIdByItemId(itemId : string) {
    try {
      LoadingStore.startLoading()

      const { data, error } = await supabase
      .from('item_details')
      .select('user_id')
      .eq('id', itemId)
      .single()

      if (error) throw error
      if (data) fetchedUserID.value = data.user_id

    } catch(err : any) {
        console.error("Error fecthing user ID using Item ID: " + err.message)

    } finally {
      LoadingStore.endLoading()
    }
  }

  async function postItem(item : MixedItem, images : ItemImages, userID : string): Promise<void> {
    try {
      LoadingStore.startLoading()
      
      const imageUrls: string[] = [];
      if (images.itemImages && images.itemImages.length > 0) {
        for (const file of images.itemImages) {
          const filePath = generateUniqueFilePath(userID, item.name, item.type, file.name)
      
          const { error: uploadFileError } = await supabase.storage
            .from('item-images')
            .upload(filePath, file);
      
          if (uploadFileError) throw uploadFileError;

          const { data: itemUrlData } = supabase.storage
            .from('item-images')
            .getPublicUrl(filePath);

          imageUrls.push(itemUrlData.publicUrl);
        }
      }

      const { data: itemData, error: itemError } = await supabase
        .from('item_details')
        .insert([
          {
            user_id: userID,
            type: item.type,

            name: item.name,
            description: item.detailedDescription,
            category: item.category,
            subcategory: item.subcategory,
            gender: item.gender,
            color: item.color,
            race: item.race,
            brand: item.brand,

            location: item.location,
            latLong: item.latLong,
            location_description: item.locationDescription,
            publicTransport: item.publicTransport,
            transportInfo: item.transportInfo,

            date: item.date,
            time: item.time,
            confidence: item.confidence,

            url_images: imageUrls,

            ...(item.type === 'Perdido'
              ? { reward: item.reward }
              : { deliveryLocation: item.deliveryLocation }),
          },
        ])
        .select('id')
        .single();

      if (itemError) throw itemError;

      if (itemData) lastItemPostID.value = itemData.id

    } catch (err: any) {
      console.error('Error posting new item:', err.message)

    } finally {
      LoadingStore.endLoading()
    }
  }

  return {
    allItems,
    singleItem,
    fetchedUserID,
    lastItemPostID,
    fetchAllItems,
    fetchItemById,
    fetchUserIdByItemId,
    postItem
  }
})