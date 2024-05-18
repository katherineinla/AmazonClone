import {SafeAreaView} from 'react-native';
import Button from '../../components/Button';
import { signOut } from 'aws-amplify/auth';


const MenuScreen = () => {
    const onLogout = () => {
        signOut();
    }
  return (
    <SafeAreaView>
        <Button text="Sign out" onPress={onLogout}/>
    </SafeAreaView>
  );
};

export default MenuScreen;
