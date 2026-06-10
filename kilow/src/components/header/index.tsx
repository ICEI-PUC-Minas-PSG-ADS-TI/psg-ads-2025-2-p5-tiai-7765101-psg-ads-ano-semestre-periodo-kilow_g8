import { StyledText } from '@/app/(public)/text';
import { colors } from '../theme';
import Image from 'next/image';

const Header = () => {
  return (
    <div
      style={{
        height: '8vh',
        width: '100%',
        backgroundColor: colors.darkBlue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        boxShadow: '0px 8px 4px #0000002c',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', marginLeft: 20 }}>
        <StyledText color="yellow" size={36} weight={600}>
          KiloW
        </StyledText>
        <Image
          src={'/assets/Greentech.png'}
          alt="icone"
          width={40}
          height={42}
        />
      </div>

      <div
        style={{
          width: '20%',
          backgroundColor: '#FFD23F',
          borderRadius: 100,
          height: 6,
          boxShadow: 'inset 0px 4px 4px #0000002c',
        }}
      >
        {' '}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <StyledText
          color="white"
          size={16}
          weight={400}
          style={{ padding: '8px 40px 8px 40px', cursor: 'pointer' }}
        >
          Contas
        </StyledText>
        <div
          style={{
            width: 1,
            backgroundColor: colors.white,
            borderRadius: 100,
            height: '3.5vh',
          }}
        >
          {' '}
        </div>
        <StyledText
          color="white"
          size={16}
          weight={400}
          style={{ padding: '8px 40px 8px 40px', cursor: 'pointer' }}
        >
          Dispositivos
        </StyledText>
      </div>
    </div>
  );
};

export default Header;
