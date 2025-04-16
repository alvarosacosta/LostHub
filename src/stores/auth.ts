import { defineStore } from 'pinia';
import { ref } from 'vue';
import supabase from '@/supabase';
import { User, UserDetails, UserProfileImage } from '@/interfaces/user';

export const useAuthStore = defineStore('auth', () => {

  const user = ref<any>(null);
  const userProfile = ref<UserDetails | null>(null);
  const loading = ref<boolean>(false);

  const init = async () =>{
    const { data: { session } } = await supabase.auth.getSession(); 
    if (session) user.value = session.user; 
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null;
      if (user.value) {
        fetchCurrentUserProfile();
      }
    });
  }

  const fetchCurrentUserProfile = async () => {
    loading.value = true;

    try {
      const userID = user.value.id;
      if (!userID) throw new Error('Could not get user ID.');
      
      const { data, error } = await supabase
        .from('user_details')
        .select('*')
        .eq('id', userID)
        .single(); 

      if (error) throw error;
      
      if (data) {
        userProfile.value = {
          username: data.Username,
          phone: data.Phone,
          region: data.Region,
          province: data.Province,
          municipality: data.Municipality,
          profilePictureURL: data.ProfileImageURL,
        };
      }
    
    } catch (err: any) {
      console.error('Error fetching user profile:', err.message);

    } finally {
      loading.value = false;
    }
  };

  const logIn = async (email: string, password: string) => {
    loading.value = true;
    
    try {
      const { data: logInData, error: logInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (logInError) throw logInError;
      user.value = logInData.user;

    } catch (err: any) {
      console.error('Error during sign up:', err.message);

    } finally {
      loading.value = false;
    }
  };

  const logOut = async () => {
    loading.value = true;

    try {
      await supabase.auth.signOut();
      user.value = null;

    } catch (err: any) {
      throw err;

    } finally {
      loading.value = false;
    }
  };

  const signUp = async ( user: User, userDetails: UserDetails, userProfileImage: UserProfileImage) => {
    loading.value = true;
    var filePath = `user-profiles-images/no-image.png`;
  
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password, 
      });
      if (signUpError) throw signUpError;
  
      const userID = signUpData.user?.id;
      if (!userID) throw new Error('Could not get user ID.');

      await logIn(user.email, user.password); 

      if (userProfileImage.profilePicture){
        filePath = `user-profiles-images/${userID}_${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from('user-profiles-images') 
          .upload(filePath, userProfileImage.profilePicture);
  
        if (uploadError) throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('user-profiles-images')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: profileError } = await supabase
        .from('user_details')
        .insert([
          {
            id: userID,
            Email: user.email,
            Username: userDetails.username,
            ProfileImageURL: imageUrl,
            Phone: userDetails.phone,
            Region: userDetails.region,
            Province: userDetails.province,
            Municipality: userDetails.municipality,
          },
        ]);
  
      if (profileError) throw profileError;

    } catch (err: any) {
      console.error('Error during sign up:', err.message);
  
    } finally {
      loading.value = false;
    }
  };


  return {
    user,
    userProfile,
    loading,
    init,
    fetchCurrentUserProfile,
    logIn,
    logOut,
    signUp
  };
});