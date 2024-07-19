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
    transform: translateY(-10px);
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
    transform: translateY(-10px);
    transition:
      opacity 300ms,
      transform 500ms;
  }
`;

const AnimatedContent = styled.div`
  ${FadeInOut}
`;

// 임시
interface FormData {
  doctorName?: string;
  consultationDate?: string;
  address?: string;
  disease?: string;
  symptom?: string;
  treatment?: string;
  memo?: string;
  hospitalizationStatus?: Date | null;
}

interface HosRecordsProps {
  formData: Record;
  setFormData: React.Dispatch<React.SetStateAction<Record>>;
}

const HosRecords: React.FC<HosRecordsProps> = ({ formData, setFormData }) => {
  const [checked, setChecked] = useState(!formData.isConsultation);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [selectedOption, setSelectedOption] = useState<string>('아니오');

  const [symptoms, setSymptoms] = useState<string[]>(formData.symptom);
  const [symptomInput, setSymptomInput] = useState('');
  const [treatments, setTreatments] = useState<string[]>(formData.treatment);
  const [treatmentInput, setTreatmentInput] = useState('');

  // console.log(formData);
  // record 객체 초기화: 이 정보로 화면을 채워줄 것임
  // 즉, 수정 모달인 경우에는 받아온 정보로 채워주고, 등록 모달이라면 빈 상태로 보여줄 것이므로 세팅을 해준다
  // const [recordData, setRecordData] = useState({
  //   doctorName: record.doctorName,
  //   address: record.address,
  //   consultationDate: record.consultationDate,
  //   hospitalizationStatus: record.hospitalizationStatus,
  //   disease: record.disease,
  //   symptom: record.symptom,
  //   treatment: record.treatment,
  //   memo: record.memo,
  // });

  // console.log(record);
  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     consultationDate: `${date} ${time}`,
  //     hospitalizationStatus: selectedOption === '네' ? new Date() : null,
  //   }));
  // }, [date, time, selectedOption]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
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
    setDate(value);
    setFormData((prevData) => ({
      ...prevData,
      consultationDate: `${value} ${time}`,
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTime(value);
    setFormData((prevData) => ({
      ...prevData,
      consultationDate: `${date} ${value}`,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const addSymptom = () => {
    if (symptomInput) {
      setSymptoms([...symptoms, symptomInput]);
    }

    setSymptomInput('');
  };

  const removeSymptom = (index: number) => {
    // 삭제할 증상의 index만 제외하고, symptom을 업데이트
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  // 엔터 시 증상 추가
  const handleSymptomKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터를 눌렀는데, 비어있으면 추가 안함
    if (e.key === 'Enter' && symptomInput.trim() !== '') {
      // 입력한 증상으로 symptom 업데이트
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput('');
    }
  };

  const addTreatment = () => {
    if (treatmentInput) {
      setTreatments([...treatments, treatmentInput]);
    }
    setTreatmentInput('');
  };

  const removeTreatment = (index: number) => {
    // 삭제할 증상의 index만 제외하고, symptom을 업데이트
    setTreatments(treatments.filter((_, i) => i !== index));
  };

  // 엔터 시 증상 추가
  const handleTreatmentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터를 눌렀는데, 비어있으면 추가 안함
    if (e.key === 'Enter' && treatmentInput.trim() !== '') {
      // 입력한 증상으로 symptom 업데이트
      setTreatments([...treatments, treatmentInput.trim()]);
      setTreatmentInput('');
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
                <ContentTitle>상담 날짜를 입력해주세요.</ContentTitle>
                <ContentBody>
                  <Input
                    type="date"
                    inputSize="sm"
                    value={date}
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
                    value={formData.address || ''}
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
                    value={formData.doctorName || ''}
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
              value={formData.disease || ''}
              onChange={handleInputChange}
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
                  <div key={index}>
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
                  <div key={index}>
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
              value={formData.memo || ''}
              onChange={handleInputChange}
            />
          </Content>
        </ContentCard>
      </Container>
    </Component>
  );
};

export default HosRecords;
