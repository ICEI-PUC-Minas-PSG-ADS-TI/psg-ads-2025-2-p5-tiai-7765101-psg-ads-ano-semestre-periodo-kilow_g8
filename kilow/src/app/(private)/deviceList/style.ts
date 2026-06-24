import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const DivDescription = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 20px 24px 0;
`;

export const DivSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
`;

export const DivDevices = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 0 24px 120px;
`;

export const DivExtendDevice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 15px;
`;

export const MagicLinkBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #14271d;
  color: #ffffff;
`;

export const MagicLinkLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MagicLinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.12);
  font-size: 18px;
`;

export const MagicLinkTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #f1f3f5;
`;

export const MagicLinkSubtitle = styled.p`
  margin: 0;
  font-size: 12px;
  color: #adb5bd;
`;

export const MagicLinkAction = styled.button`
  background: none;
  border: none;
  color: #69db7c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonFilter = styled.button`
  color: #358739;
  border: 2px solid #358739;
  background-color: #97e69b;
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
`;