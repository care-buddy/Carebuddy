import { IRecord } from '@/interfaces';

const validateRecordForm = (
  formData: IRecord,
  setAlertState: React.Dispatch<
    React.SetStateAction<{
      showAlert: boolean;
      alertMessage: string;
    }>
  >,
  isCheckSymptom: boolean,
  isCheckTreat: boolean
) => {
  if (
    formData.isConsultation &&
    (formData.address === null || formData.address?.trim() === '')
  ) {
    // setAlertMessage('병원 정보를 입력해주세요.');
    setAlertState({
      showAlert: true,
      alertMessage: '병원 정보를 입력해주세요.',
    });
    return false;
  }

  if (formData.disease === '') {
    // setAlertMessage('질병 정보를 입력해주세요.');
    setAlertState({
      showAlert: true,
      alertMessage: '질병 정보를 입력해주세요.',
    });
    return false;
  }

  if (isCheckSymptom) {
    // setAlertMessage('증상 내용을 추가하셨는지 확인해주세요.');
    setAlertState({
      showAlert: true,
      alertMessage: '증상 내용을 추가하셨는지 확인해주세요.',
    });
    return false;
  }

  if (isCheckTreat) {
    // setAlertMessage('처방 내용을 추가하셨는지 확인해주세요.');
    setAlertState({
      showAlert: true,
      alertMessage: '처방 내용을 추가하셨는지 확인해주세요.',
    });
    return false;
  }

  return true;
};

export default validateRecordForm;
