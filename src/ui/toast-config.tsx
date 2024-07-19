import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { THEME } from '../constants/theme';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      style={{
        backgroundColor: THEME.colors.neutral[800],
        borderLeftColor: THEME.colors.green[300]
      }}
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: 'white',
        fontSize: 16
      }}
      text2Style={{
        fontSize: 14,
        color: 'white',
        opacity: 0.8,
        fontWeight: '400'
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: THEME.colors.neutral[800],
        borderLeftColor: THEME.colors.red[300]
      }}
      text1Style={{
        fontSize: 16,
        color: 'white'
      }}
      text2Style={{
        fontSize: 14,
        color: 'white',
        opacity: 0.8,
        fontWeight: '400'
      }}
    />
  )
};
