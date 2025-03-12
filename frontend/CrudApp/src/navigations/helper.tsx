import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
    theme: any,
) => {
    let iconName = 'home';
    let IconComponent = Ionicons;

    switch (route.name) {
        case 'Puja':
            iconName = 'fireplace';
            IconComponent = MaterialCommunityIcons;
            break;
        case 'Bhakti':
            iconName = 'musical-notes';
            IconComponent = Ionicons;
            break;
        case 'Darshan':
            iconName = 'hands-pray';
            IconComponent = MaterialCommunityIcons;
            break;
        case 'Products':
            iconName = 'shopping';
            IconComponent = MaterialCommunityIcons;
            break;
        case 'Chadhava':
            iconName = 'hand-coin';
            IconComponent = MaterialCommunityIcons;
            break;
        default:
            iconName = focused ? 'home' : 'home-outline';
            IconComponent = Ionicons;
            break;
    }

    return (
        <IconComponent
            name={iconName}
            size={size}
            color={focused ? theme?.primary : theme.text}
        />
    );
};