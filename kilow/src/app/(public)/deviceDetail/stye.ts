import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 900px;
  margin: 32px auto;
  padding: 0 24px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ── Device card ── */
export const DeviceCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

export const DeviceTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const AvatarBox = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const AvatarText = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

export const DeviceInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DeviceName = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #212529;
`;

export const DeviceMeta = styled.p`
  margin: 0;
  font-size: 12px;
  color: #868e96;
`;

export const DeviceBadge = styled.span`
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  background-color: #fff3bf;
  color: #e67700;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  align-self: flex-start;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

export const BadgesRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const StatBadge = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background-color: #f8f9fa;
  border-radius: 10px;
  gap: 2px;
`;

export const StatValue = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #212529;
`;

export const StatLabel = styled.p`
  margin: 0;
  font-size: 11px;
  color: #868e96;
`;

/* ── Cost card ── */
export const CostCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

export const CostTitle = styled.p`
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: #212529;
`;

export const CostRow = styled.div<{ $highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $highlight }) => ($highlight ? '4px 0' : '0')};
  border-top: ${({ $highlight }) => ($highlight ? '1px solid #e9ecef' : 'none')};
  border-bottom: ${({ $highlight }) => ($highlight ? '1px solid #e9ecef' : 'none')};
`;

export const CostRowLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: #495057;
`;

export const CostRowValue = styled.p`
  margin: 0;
  font-size: 14px;
  color: #212529;
`;

export const CostHighlight = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #212529;
`;

export const CostNote = styled.p`
  margin: 4px 0 0;
  font-size: 11px;
  color: #adb5bd;
`;

/* ── Impact card ── */
export const ImpactCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

export const ImpactTitle = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #212529;
`;

export const ImpactSubtitle = styled.p`
  margin: -8px 0 0;
  font-size: 12px;
  color: #868e96;
`;

export const ImpactItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background-color: #f4fce3;
  border-radius: 10px;
`;

export const ImpactIcon = styled.div`
  font-size: 20px;
  flex-shrink: 0;
`;

export const ImpactText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const ImpactValue = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #2f7a3a;
`;

export const ImpactDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: #495057;
`;

/* ── Tip card ── */
export const TipCard = styled.div`
  background-color: #fff9db;
  border: 1px solid #ffe066;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TipTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #e67700;
`;

export const TipText = styled.p`
  margin: 0;
  font-size: 13px;
  color: #495057;
  line-height: 1.5;
`;