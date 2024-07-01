import React from 'react';
import styled from 'styled-components';

interface NotificationProps {
  notifications: {
    id: number;
    user: string;
    message: string;
    date: string;
    details: string;
  }[];
  show: boolean;
  onClose: () => void;
}

const NotificationContainer = styled.div<{ show: boolean }>`
  width: 400px;
  position: absolute;
  top: calc(100% + 0px);
  right: 0;
  background-color: white;
  padding: 14px 14px 24px 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: ${(props) => (props.show ? 'block' : 'none')};
  font-size: var(--font-size-ft-1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Header = styled.h3`
  margin-bottom: 20px;
  font-size: var(--font-size-md-1);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationList = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MessageWrapper = styled.div`
  border-bottom: 1px solid var(--color-grey-2);
  width: 100%;
  padding: 0 20px;
`;

const NotificationItem = styled.li`
  white-space: normal;
  margin: 18px 0 14px 0;
  display: grid;
  align-items: start;
  /* 프로필 사진 부분은 최소 24px, 삭제 버튼은 최소 14px, 메시지 부분이 나머지를 차지하게 한다 */
  grid-template-columns: minmax(24px, auto) 1fr minmax(14px, auto);
  grid-gap: 10px;
`;

const NotificationContent = styled.div`
  flex: 1;
  > * {
    margin-bottom: 4px;
  }
`;

const NotificationDetails = styled.div`
  color: #666;
  font-size: 12px;
`;

const NotificationDate = styled.div`
  color: #999;
  font-size: 12px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #999;
  justify-self: end;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 4px;
`;

const Strong = styled.strong`
  font-weight: var(--font-weight-semibold);
`;

const Notification: React.FC<NotificationProps> = ({
  notifications,
  show,
  onClose,
}) => (
  <NotificationContainer show={show}>
    <CloseButton onClick={onClose}>&times;</CloseButton>
    <Header>알림</Header>
    <NotificationList>
      {notifications.map((notification) => (
        <MessageWrapper>
          <NotificationItem key={notification.id}>
            <UserAvatar />
            <NotificationContent>
              <p>
                <Strong>{notification.user}</Strong> {notification.message}
              </p>
              <NotificationDetails>{notification.details}</NotificationDetails>
              <NotificationDate>{notification.date}</NotificationDate>
            </NotificationContent>
            <DeleteButton onClick={onClose}>&times;</DeleteButton>
          </NotificationItem>
        </MessageWrapper>
      ))}
    </NotificationList>
  </NotificationContainer>
);

export default Notification;
