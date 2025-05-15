import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/supabase';
import type { ItemImages, MixedItem } from '@/interfaces/items'
import { generateUniqueFilePath } from '@/utils/fileUtils';
import { useLoadingStore } from './LoadingStore';

export const useItemsStore = defineStore('items', () => {

  const LoadingStore = useLoadingStore()

  const allItems = ref<MixedItem[]>([])
  const userItems = ref<MixedItem[]>([])
  const singleItem = ref<MixedItem>()
  const fetchedUserID = ref<string>('')
  const lastItemPostID = ref<string>('')

  function mapToMixedItem(item: any): MixedItem {
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
  }

  async function fetchAllItems() : Promise<void>{
    try {
        LoadingStore.startLoading()

        const { data, error } = await supabase
            .from('item_details')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error;

        if (data) {
            allItems.value = data.map(mapToMixedItem)
        }
    
    } catch(err: any) {
      console.error("Error fetching all items: " + err.message)

    } finally {
      LoadingStore.endLoading()
    }
  }

  async function fetchUserItems(userID : string) : Promise<void>{
    try {
        LoadingStore.startLoading()

        const { data, error } = await supabase
            .from('item_details')
            .select('*')
            .eq('user_id', userID)
            .order('created_at', { ascending: false })

        if (error) throw error;

        if (data) userItems.value = data.map(mapToMixedItem)
        
    
    } catch(err: any) {
      console.error("Error fetching all user items: " + err.message)

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

      if (data) singleItem.value = mapToMixedItem(data)

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
          const filePath = generateUniqueFilePath(userID, item.type, item.name, file.name)
      
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

  async function deleteItemById(id: string): Promise<void> {
    try {
      LoadingStore.startLoading()

      const { error } = await supabase
        .from('item_details')
        .delete()
        .eq('id', id);

      if (error) throw error;

    } catch (err: any) {
      const error = 'Error deleting item by ID:' + err.message;
      throw error;

    } finally {
      LoadingStore.endLoading()
    }
  }

  return {
    allItems,
    userItems,
    singleItem,
    fetchedUserID,
    lastItemPostID,
    fetchAllItems,
    fetchUserItems,
    fetchItemById,
    deleteItemById,
    fetchUserIdByItemId,
    postItem
  }
})