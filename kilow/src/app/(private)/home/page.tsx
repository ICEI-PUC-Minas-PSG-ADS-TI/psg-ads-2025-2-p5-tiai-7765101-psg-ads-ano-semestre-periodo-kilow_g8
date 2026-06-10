import { logoutAction } from '@/actions/auth';
import { StyledText } from '@/app/(public)/text';
import Header from '@/components/header';
import { colors } from '@/components/theme';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <Header />
      <div style={{ justifyContent: 'center', margin: 'auto' }}>
        <StyledText color="black" size={32} weight={300}>
          Estamos trabalhando nos seus dados ;)
        </StyledText>
        <Image
          src={'/assets/waitingImage.png'}
          width={500}
          height={500}
          alt="homeImage"
        />
        <button
          onClick={logoutAction}
          style={{
            backgroundColor: colors.yellow,
            color: colors.darkBlue,
            fontSize: 28,
            padding: 8,
            borderRadius: 12,
            border: 0,
            marginBlock: 12,
            width: '100%',
          }}
        >
          Loggout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
