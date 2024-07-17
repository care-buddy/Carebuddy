import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/common/Input';
import Radio from '@/components/common/Radio';
import CheckBox from '@/components/common/CheckBox';
import TextArea from '@/components/common/TextArea';
import { Record } from '@/interfaces';

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
`;

const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoxTitle = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md-2); //18
  margin: 20px 100px 20px 0;
  min-width: 32px;
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
`;

const Label = styled.label`
  margin-right: 1rem;
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
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [selectedOption, setSelectedOption] = useState<string>('아니오');

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

  const handleCheckboxChange = () => {
    setChecked(!checked);
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

  return (
    <Component>
      <Container>
        <BoxTitle>진단</BoxTitle>
        <ContentCard>
          <Content>
            <ContentTitle>진단 확인 여부</ContentTitle>
            <ContentBody>
              {/* <Checkbox
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
              /> */}
              <CheckBox
                value=""
                checked={false}
                text=""
                onChange={handleCheckboxChange}
              />
              <span>
                의료진에 진단 받은 기록이 없습니다. (체크 시 진단 비활성화 추가)
              </span>
            </ContentBody>
          </Content>
          <Content>
            <ContentTitle>수의사 선생님 성함을 입력하여주세요.</ContentTitle>
            <ContentBody>
              <Input
                name="doctorName"
                inputSize="sm"
                value={formData.doctorName || ''}
                placeholder="선생님 성함"
                onChange={handleInputChange}
              />
            </ContentBody>
          </Content>
          <Content>
            <ContentTitle>상담 날짜와 시간을 체크하여주세요.</ContentTitle>
            <ContentBody>
              <Input
                type="date"
                inputSize="sm"
                value={date}
                onChange={handleDateChange}
              />
              <Input
                type="time"
                inputSize="sm"
                value={time}
                onChange={handleTimeChange}
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
                />
                네
              </Label>
              <Label htmlFor="radioNo">
                <Radio
                  id="radioNo"
                  value="아니오"
                  checked={selectedOption === '아니오'}
                  onChange={handleRadioChange}
                />
                아니오
              </Label>
            </ContentBody>
          </Content>
        </ContentCard>
      </Container>

      <Container>
        <ContentCard>
          <Content>
            <ContentTitle>질병</ContentTitle>
            <ContentBody>
              <Input
                height="20px"
                placeholder="입력하여주세요."
                name="disease"
                value={formData.disease || ''}
                onChange={handleInputChange}
              />
            </ContentBody>
          </Content>
        </ContentCard>
      </Container>

      <Container>
        <ContentCard>
          <Content>
            <ContentTitle>증상</ContentTitle>
            <ContentBody>
              <Input
                placeholder="입력하여주세요."
                name="symptom"
                value={formData.symptom || ''}
                onChange={handleInputChange}
              />
            </ContentBody>
          </Content>
        </ContentCard>
      </Container>

      <Container>
        <ContentCard>
          <Content>
            <ContentTitle>처방</ContentTitle>
            <ContentBody>
              <Input
                placeholder="입력하여주세요."
                name="treatment"
                value={formData.treatment || ''}
                onChange={handleInputChange}
              />
            </ContentBody>
          </Content>
        </ContentCard>
      </Container>

      <Container className="noBorder">
        <ContentCard>
          <Content>
            <ContentTitle>메모</ContentTitle>
            <ContentBody>
              <TextArea
                placeholder="입력하여주세요."
                name="memo"
                value={formData.memo || ''}
                onChange={handleInputChange}
              />
            </ContentBody>
          </Content>
        </ContentCard>
      </Container>
    </Component>
  );
};

export default HosRecords;
