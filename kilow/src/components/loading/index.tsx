'use client';
import { InnerBulb, LoadingContainer, MiniOuterSpinner } from './style';

const MiniIdeaLoader = () => (
  <LoadingContainer>
    <MiniOuterSpinner size={32} style={{ color: '#f5d246' }} />
    <InnerBulb size={12} style={{ position: 'absolute' }} />
  </LoadingContainer>
);

export default MiniIdeaLoader;
