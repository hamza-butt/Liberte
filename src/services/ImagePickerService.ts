import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse, Asset } from 'react-native-image-picker';
import { Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export const ImagePickerService = {
    checkGalleryPermission: async (): Promise<boolean> => {
        let permission;
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
            } else {
                permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
            }
        } else if (Platform.OS === 'ios') {
            permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
        }
        if (!permission) return true;

        const result = await check(permission);
        console.log("Permission check result:", result);

        switch (result) {
            case RESULTS.DENIED:
                const requestResult = await request(permission);
                console.log("Permission request result:", requestResult);
                if (requestResult === RESULTS.GRANTED) {
                    // call here to pick image

                    return true;
                } else if (requestResult === RESULTS.BLOCKED) {
                    Alert.alert(
                        'Permission Blocked',
                        'Please enable gallery access in your phone settings to change your profile picture.',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Settings', onPress: () => openSettings() }
                        ]
                    );
                    return false;
                }
                return false;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                Alert.alert(
                    'Permission Blocked',
                    'Please enable gallery access in your phone settings to change your profile picture.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Settings', onPress: () => openSettings() }
                    ]
                );
                return false;
        }
        return false;

    },

    pickImage: async (): Promise<Asset | null> => {
        try {
            const hasPermission = await ImagePickerService.checkGalleryPermission();
            console.log("Has Permission:", hasPermission);
            if (!hasPermission) {
                return null;
            }

            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                selectionLimit: 1,
                quality: 0.8,
                includeBase64: false,
            };

            const result: ImagePickerResponse = await new Promise((resolve) => {
                launchImageLibrary(options, (response) => {
                    resolve(response);
                });
            });

            if (result.didCancel) {
                return null;
            }

            if (result.errorCode) {
                Alert.alert('Error', result.errorMessage || 'Unknown error picking image');
                return null;
            }

            if (result.assets && result.assets.length > 0) {
                return result.assets[0];
            }

            return null;
        } catch (error) {
            console.error('Error picking image:', error);
            return null;
        }
    },
};
