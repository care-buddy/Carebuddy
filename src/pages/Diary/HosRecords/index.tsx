import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Input from '@/components/common/Input';
import Radio from '@/components/common/Radio';
import CheckBox from '@/components/common/CheckBox';
import TextArea from '@/components/common/TextArea';
import { Record } from '@/interfaces';
import { LuPlusCircle, LuMinusCircle } from 'react-icons/lu';
import { CSSTransition } from 'react-transition-group';

const Component = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  width: auto;
  border-bottom: 1px solid var(--color-grey-2);
  &.noBorder {
    border-bottom: none;
  }
  padding-top: 4px;
`;

const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BoxTitle = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md-2); //18
  margin: 20px 100px 20px 0;
  min-width: 32px;
  padding-left: 4px;
`;

const ContentTitle = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md-1); //16
  margin-top: 4px;
`;

const ContentBody = styled.div`
  font-size: var(--font-size-md-1); //16
  margin: 10px 0 10px 0;
  > input {
    margin-right: 10px;
  }
  > span {
    margin-left: 4px;
  }
  > div {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  > div:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  margin-right: 1rem;
`;

const AddButton = styled.button`
  position: absolute;
  left: 190px;
  top: 4px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
const RemoveButton = styled.button`
  margin-left: 8px;
  padding-top: 2px;

  background: none;
  border: none;
  cursor: pointer;
`;

const List = styled.span`
  border: 1px solid var(--color-grey-2);
  padding: 4px 12px;
  min-width: 40px;
  min-height: 20px;
  border-radius: 8px;
  font-size: var(--font-size-ft-1);
  display: inline-block;
  text-align: center;
  line-height: 20px;
  cursor: default;
  transition: all 0.3s;
  &:hover {
    background-color: #f7f6f2;
  }
`;

const Icon = styled.div`
  > svg {
    width: 20px;
    height: 20px;
    color: var(--color-green-main);

    &.small {
      width: 18px;
      height: 18px;
    }
  }
`;

const FadeInOut = css`
  &.fade-enter {
    opacity: 0;
    transform: translateY(-8px);
  }
  &.fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 300ms,
      transform 500ms;
  }
  &.fade-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.fade-exit-active {
    opacity: 0;
    transform: translateY(-8px);
    transition:
      opacity 300ms,
      transform 500ms;
  }
`;

const AnimatedContent = styled.div`
  ${FadeInOut}
`;

interface HosRecordsProps {
  formData: Record;
  setFormData: React.Dispatch<React.SetStateAction<Record>>;
}

const HosRecords: React.FC<HosRecordsProps> = ({ formData, setFormData }) => {
  const [checked, setChecked] = useState(
    formData ? !formData.isConsultation : false
  );

  const [date, setDate] = useState(
    formData && formData.consultationDate
      ? new Date(formData.consultationDate)
      : ''
  );

  const [selectedOption, setSelectedOption] = useState<string>(
    formData && formData.hospitalizationStatus ? '네' : '아니오'
  );

  const [symptoms, setSymptoms] = useState<string[]>(
    formData ? formData.symptom : []
  );
  const [symptomInput, setSymptomInput] = useState('');
  const [treatments, setTreatments] = useState<string[]>(
    formData ? formData.treatment : []
  );
  const [treatmentInput, setTreatmentInput] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    setFormData((prevData) => ({
      ...prevData,
      isConsultation: checked,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // input value에 직접적으로 null을 넣어주면 안된다! 따라서, 예외사항 처리를 해줘야한다
    if (value === '') {
      setDate('');
      return;
    }
    const parseDate = new Date(value);
    setDate(parseDate);
    setFormData((prevData) => ({
      ...prevData,
      consultationDate: parseDate,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 라디오 버튼용 상태 설정
    setSelectedOption(value);
    setFormData((prevData) => ({
      ...prevData,
      hospitalizationStatus: value === '네',
    }));
  };

  // 처방 및 증상 등 Array 형식으로 된 상태들을 업데이트해주는 함수
  const updateArrayState = (
    state: string[], // 업데이트할 state
    setState: React.Dispatch<React.SetStateAction<string[]>>, // 업데이트할 state의 setState
    stateInput: string, // 업데이트할 state의 input
    setStateInput: React.Dispatch<React.SetStateAction<string>>,
    formDataName: string // 업데이트 될 formData의 필드 명
  ) => {
    setState([...state, stateInput.trim()]);
    setFormData((prevData) => ({
      ...prevData,
      [formDataName]: [...state, stateInput.trim()],
    }));
    setStateInput('');
  };

  const addSymptom = () => {
    // 증상 input에 입력된 경우에만 증상 배열에 입력한 증상 추가
    if (symptomInput.trim() !== '') {
      // 증상 태그 상태 설정
      updateArrayState(
        symptoms,
        setSymptoms,
        symptomInput,
        setSymptomInput,
        'symptom'
      );
    }
  };

  const removeSymptom = (index: number) => {
    // 삭제할 증상의 index를 제외하고, symptom을 업데이트
    const updatedSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptoms(updatedSymptoms);
    setFormData((prevData) => ({
      ...prevData,
      symptom: updatedSymptoms,
    }));
  };

  // 엔터 시 증상 추가
  const handleSymptomKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터를 눌렀는데, 비어있으면 추가 안함
    if (e.key === 'Enter' && symptomInput.trim() !== '') {
      // 입력한 증상으로 symptom 업데이트
      updateArrayState(
        symptoms,
        setSymptoms,
        symptomInput,
        setSymptomInput,
        'symptom'
      );
    }
  };

  const addTreatment = () => {
    // 증상 input에 입력된 경우에만 증상 배열에 입력한 증상 추가
    if (treatmentInput.trim() !== '') {
      // 증상 태그 상태 설정
      updateArrayState(
        treatments,
        setTreatments,
        treatmentInput,
        setTreatmentInput,
        'treatment'
      );
    }
  };

  const removeTreatment = (index: number) => {
    // 삭제할 증상의 index만 제외하고, symptom을 업데이트
    const updatedTreatments = treatments.filter((_, i) => i !== index);
    setTreatments(updatedTreatments);
    setFormData((prevData) => ({
      ...prevData,
      treatment: updatedTreatments,
    }));
  };

  // 엔터 시 증상 추가
  const handleTreatmentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터를 눌렀는데, 비어있으면 추가 안함
    if (e.key === 'Enter' && treatmentInput.trim() !== '') {
      // 입력한 증상으로 symptom 업데이트
      updateArrayState(
        treatments,
        setTreatments,
        treatmentInput,
        setTreatmentInput,
        'treatment'
      );
    }
  };

  return (
    <Component>
      <Container>
        <BoxTitle>진단</BoxTitle>
        <ContentCard>
          <Content>
            <ContentTitle>진단 확인 여부</ContentTitle>
            <ContentBody>
              <CheckBox
                value="isConsultation"
                checked={checked}
                text="의료진에 진단 받은 기록이 없습니다."
                onChange={handleCheckboxChange}
                textColor="black"
              />
            </ContentBody>
          </Content>

          <CSSTransition
            in={!checked}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <AnimatedContent>
              <Content>
                <ContentTitle>진료 날짜를 입력해주세요.</ContentTitle>
                <ContentBody>
                  <Input
                    type="date"
                    inputSize="sm"
                    value={
                      date ? new Date(date).toISOString().split('T')[0] : ''
                    }
                    onChange={handleDateChange}
                    // activeOption={checked ? 'readOnly' : 'active'}
                  />
                </ContentBody>
              </Content>
              <Content>
                <ContentTitle>진료받은 병원을 입력해주세요.</ContentTitle>
                <ContentBody>
                  <Input
                    name="address"
                    inputSize="sm"
                    value={formData?.address || ''}
                    placeholder="병원명"
                    onChange={handleInputChange}
                    // activeOption={checked ? 'readOnly' : 'active'}
                  />
                </ContentBody>
              </Content>
              <Content>
                <ContentTitle>
                  수의사 선생님 성함을 입력하여주세요.
                </ContentTitle>
                <ContentBody>
                  <Input
                    name="doctorName"
                    inputSize="sm"
                    value={formData?.doctorName || ''}
                    placeholder="선생님 성함"
                    onChange={handleInputChange}
                    // activeOption={checked ? 'readOnly' : 'active'}
                  />
                </ContentBody>
              </Content>
              <Content>
                <ContentTitle>입원 여부</ContentTitle>
                <ContentBody>
                  <Label htmlFor="radioYes">
                    <Radio
                      id="radioYes"
                      value="네"
                      checked={selectedOption === '네'}
                      onChange={handleRadioChange}
                      // activeOption={checked ? 'readOnly' : 'active'}
                    />
                    네
                  </Label>
                  <Label htmlFor="radioNo">
                    <Radio
                      id="radioNo"
                      value="아니오"
                      checked={selectedOption === '아니오'}
                      onChange={handleRadioChange}
                      // activeOption={checked ? 'readOnly' : 'active'}
                    />
                    아니오
                  </Label>
                </ContentBody>
              </Content>
            </AnimatedContent>
          </CSSTransition>
        </ContentCard>
      </Container>

      <Container>
        <BoxTitle>질병</BoxTitle>
        <ContentCard>
          <Content>
            {/* <ContentTitle> </ContentTitle> */}
            <Input
              height="20px"
              placeholder="입력하여주세요."
              name="disease"
              value={formData?.disease || ''}
              onChange={handleInputChange}
              required
            />
            <ContentBody />
          </Content>
        </ContentCard>
      </Container>

      <Container>
        <BoxTitle>증상</BoxTitle>
        <ContentCard>
          <Content>
            <Input
              placeholder="입력하여주세요."
              name="symptom"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              onKeyDown={handleSymptomKeyDown}
            />
            <AddButton onClick={addSymptom}>
              <Icon>
                <LuPlusCircle />
              </Icon>
            </AddButton>

            <ContentBody>
              {symptoms &&
                symptoms.map((symptom, index) => (
                  <div>
                    <List>{symptom}</List>
                    <RemoveButton onClick={() => removeSymptom(index)}>
                      <Icon>
                        <LuMinusCircle className="small" />
                      </Icon>
                    </RemoveButton>
                  </div>
                ))}
            </ContentBody>
          </Content>
        </ContentCard>
      </Container>

      <Container>
        <BoxTitle>처방</BoxTitle>
        <ContentCard>
          <Content>
            <Input
              placeholder="입력하여주세요."
              name="treatment"
              value={treatmentInput}
              onChange={(e) => setTreatmentInput(e.target.value)}
              onKeyDown={handleTreatmentKeyDown}
            />
            <AddButton onClick={addTreatment}>
              <Icon>
                <LuPlusCircle />
              </Icon>
            </AddButton>

            <ContentBody>
              {treatments &&
                treatments.map((treatment, index) => (
                  <div>
                    <List>{treatment}</List>
                    <RemoveButton onClick={() => removeTreatment(index)}>
                      <Icon>
                        <LuMinusCircle className="small" />
                      </Icon>
                    </RemoveButton>
                  </div>
                ))}
            </ContentBody>
          </Content>
        </ContentCard>
      </Container>

      <Container className="noBorder">
        <BoxTitle>메모</BoxTitle>
        <ContentCard>
          <Content>
            <TextArea
              placeholder="입력하여주세요."
              name="memo"
              value={formData?.memo || ''}
              onChange={handleInputChange}
            />
          </Content>
        </ContentCard>
      </Container>
    </Component>
  );
};

export default HosRecords;
