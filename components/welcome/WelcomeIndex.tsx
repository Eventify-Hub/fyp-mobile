// import React, { useEffect } from 'react';
// import { View } from 'react-native';
// import WelcomeImageDisplay from './WelcomeImageDisplay';
// import { router } from 'expo-router';



// const WelcomeIndex: React.FC = () => {
//   useEffect(() => {
//     setTimeout(() => {
//       // router.push("/splashscreen");
//       router.push("/dashboard");
//     }, 1000)
//   }, []);
//   return (
//     <View>
//       <WelcomeImageDisplay imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/ee8619c3ba7069ac2ac92e880c53f6a08b69c1a800aaf83f5653c512dd5631a5?apiKey=0a92af3bc6e24da3a9ef8b1ae693931a&" />
//     </View>
//   );
// };

// export default WelcomeIndex;
import { getSecureData } from '@/store';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import WelcomeImageDisplay from './WelcomeImageDisplay';

const WelcomeIndex: React.FC = () => {
  useEffect(() => {
    const redirectUser = async () => {
      console.log("welcome")
      const userData = await getSecureData('user');
      console.log("userdata", userData);
      if (!userData || !JSON.parse(userData || "")) {
        router.push('/intro');
      } else {
        try {
          const user = JSON.parse(userData || "");
          if (user.role === 'Vendor') {
            router.push('/vendordashboard');
          } else if (user.role === 'Organizer') {
            router.push('/dashboard');
          } else {
            router.push('/splashscreen'); // fallback for unknown role
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          router.push('/login');
        }
      }
    };

    setTimeout(() => {
      redirectUser();
      //router.push("/vendoreditprofile");
    }, 1000);
  }, []);

  return (
    <View>
      <WelcomeImageDisplay imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/ee8619c3ba7069ac2ac92e880c53f6a08b69c1a800aaf83f5653c512dd5631a5?apiKey=0a92af3bc6e24da3a9ef8b1ae693931a&" />
    </View>
  );
};

export default WelcomeIndex;
