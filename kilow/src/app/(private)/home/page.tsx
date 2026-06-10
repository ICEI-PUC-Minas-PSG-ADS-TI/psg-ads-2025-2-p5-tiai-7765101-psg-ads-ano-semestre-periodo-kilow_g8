'use client';
import { logoutAction } from '@/actions/services/auth';
import Button from '@/components/button';
import { StyledText } from '@/components/text';
import { colors } from '@/components/theme';
import Image from 'next/image';
import { HomeContainer } from './styles';

const HomePage = () => {
  return (
    <HomeContainer>
      <div
        style={{
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <StyledText
          color="black"
          size={32}
          weight={300}
          style={{ textAlign: 'center' }}
        >
          Estamos trabalhando nos seus dados ;)
        </StyledText>
        <Image
          src={'/assets/waitingImage.png'}
          width={500}
          height={500}
          alt="homeImage"
        />
        <Button
          onClick={logoutAction}
          variant="yellow"
          size="large"
          style={{ width: '100%' }}
        >
          Loggout
        </Button>
      </div>
    </HomeContainer>
  );
};

export default HomePage;
