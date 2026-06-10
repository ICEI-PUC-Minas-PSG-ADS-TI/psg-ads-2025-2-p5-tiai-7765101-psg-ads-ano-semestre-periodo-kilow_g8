import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  min-width: 160px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const AvatarBox = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: ${({ $color }) => $color};
  margin-bottom: 4px;
`;

export const AvatarText = styled.span`
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const DeviceName = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  line-height: 1.3;
`;

export const CategoryLabel = styled.p`
  margin: 0;
  font-size: 12px;
  color: #868e96;
`;

export const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background-color: #f1f3f5;
  color: #495057;
  font-size: 11px;
  font-weight: 500;
  border-radius: 100px;
`;

export const CostLabel = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  font-weight: 600;
  color: #2f7a3a;
  background-color: #ebfbee;
  padding: 3px 8px;
  border-radius: 6px;
  align-self: flex-start;
`;