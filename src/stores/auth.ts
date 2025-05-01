import { defineStore } from 'pinia';
import { ref } from 'vue';
import supabase from '@/supabase';
import { User, UserDetails, UserProfileImage } from '@/interfaces/user';

export const useAuthStore = defineStore('auth', () => {

  const user = ref<any>(null);
  const userProfile = ref<UserDetails | null>(null);
  const foreignUserProfile = ref<UserDetails | null>(null)
  const isFetchingOwnProfile = ref<boolean>(false);

  async function init() : Promise<void> {
    const { data: { session } } = await supabase.auth.getSession(); 
    if (session) user.value = session.user; 

    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null;
      if (user.value) {
          fetchCurrentUserProfile();
      }
    });
  }

  async function fetchCurrentUserProfile() : Promise<void> {
    if (isFetchingOwnProfile.value) return;
    isFetchingOwnProfile.value = true;

    try {
      const userID = user.value.id;
      if (!userID) throw new Error('Could not get user ID.');
      
      var data = null;
      var error = null;

      var retries = 0;
      const maxRetries = 5
      const interval = 400

      while (retries < maxRetries) {
        const result = await supabase
          .from('user_details')
          .select('*')
          .eq('id', userID)
          .single();

        data = result.data;
        error = result.error;

        if (data && !error) {
          break;
        }

        await new Promise(resolve => setTimeout(resolve, interval));
        retries++;
      }

      if (error) throw error;
      
      if (data){
        userProfile.value = {
          username: data.Username,
          isPublic: data.isPublic,
          email: data.Email,
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
      isFetchingOwnProfile.value = false;
    }
  };

  async function logIn(email: string, password: string) : Promise<void> {
    try {
      const { data: logInData, error: logInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (logInError) throw logInError;
      user.value = logInData.user;

    } catch (err: any) {
      const error = 'Error during log in: ' + err.message;
      throw error;

    }
  };

  async function logOut() : Promise<void> {
    try {
      await supabase.auth.signOut();
      user.value = null;
      userProfile.value = null;

    } catch (err: any) {
      throw err;

    }
  };

  async function signUp(user: User, userDetails: UserDetails, userProfileImage: UserProfileImage) : Promise<void>{
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
        filePath = `user-profiles-images/${userID}_${Date.now()}`;

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
            isPublic: userDetails.isPublic,
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
      const error = 'Error during sign up: ' + err.message;
      throw error;
  
    }
  };

  async function updateUserInfo(userUpdatedInfo : UserDetails) : Promise<void>{
    try {
      const userID = user.value.id;
      if (!userID) throw new Error('Could not get user ID.');

      // Al cambiar el email, se hacen comprobaciones que no se hacen al hacer el log-in, por lo que emails
      // que antes eran válidos, ahora pueden no serlo. Es mejor impedir que se cambie el email por ahora.
      
      // const { error : updateUserError } = await supabase.auth.updateUser({
      //   email: userUpdatedInfo.email,
      // })
      // if (updateUserError) throw updateUserError;

      const { error : updateProfileError } = await supabase
        .from('user_details')
        .update({
          id: userID,
          Email: userUpdatedInfo.email,
          isPublic: userUpdatedInfo.isPublic,
          Phone: userUpdatedInfo.phone,
          Region: userUpdatedInfo.region,
          Province: userUpdatedInfo.province,
          Municipality: userUpdatedInfo.municipality
        })
        .eq('id', userID)
        
      if (updateProfileError) throw updateProfileError;
  
    } catch (err: any) {
      console.error('Error updating the user:', err)
    }
  }

  async function fetchUserById(id : string) : Promise<void> {

    try {
      const { data, error } = await supabase
      .from('user_details')
      .select('*')
      .eq('id', id)
      .single();

      if (error) throw error;
      
      if (data){
        foreignUserProfile.value = {
          username: data.Username,
          isPublic: data.isPublic,
          email: data.Email,
          phone: data.Phone,
          region: data.Region,
          province: data.Province,
          municipality: data.Municipality,
          profilePictureURL: data.ProfileImageURL,
        };
      }
      
    } catch(err : any) {
      console.error('Error fetching foreign user profile:' + err.message)
    }
    
  }

  async function cleanForeignUser() : Promise<void> {
    foreignUserProfile.value = null;
  }

  return {
    user,
    userProfile,
    foreignUserProfile,
    init,
    logIn,
    signUp,
    logOut,
    updateUserInfo,
    fetchUserById,
    fetchCurrentUserProfile,
    cleanForeignUser,
  };
});