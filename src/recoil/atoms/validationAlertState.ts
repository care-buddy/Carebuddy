import { atom } from 'recoil';

const validationAlertState = atom({
  key: 'validationAlertState',
  default: {
    showAlert: false,
    alertMessage: '',
  },
});

export default validationAlertState;
