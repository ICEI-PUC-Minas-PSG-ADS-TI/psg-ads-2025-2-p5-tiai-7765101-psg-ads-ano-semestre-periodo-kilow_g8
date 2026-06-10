'use client';
import { colors } from '../theme';
import { InnerBulb, LoadingContainer, MiniOuterSpinner } from './style';

const MiniIdeaLoader = () => (
  <LoadingContainer>
    <MiniOuterSpinner size={32} style={{ color: colors.yellow }} />
    <InnerBulb size={12} />
  </LoadingContainer>
);

export default MiniIdeaLoader;
