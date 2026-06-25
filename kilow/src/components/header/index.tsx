import { StyledText } from '@/components/text';
import { colors } from '../theme';
import Image from 'next/image';
import { LinkRouteText, LinkRouteDiv, VerticalLine } from './style';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/constants';

const Header = () => {
  const pathName = usePathname();
  const headerLinks = [
    APP_ROUTES.billings,
    APP_ROUTES.deviceList,
    APP_ROUTES.home,
  ];

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
          backgroundColor: colors.yellow,
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
        {headerLinks.map((headerLink, index) => {
          const isSelected = pathName.includes(headerLink.path);

          const isLastIHeaderLink = index === headerLinks.length - 1;
          return (
            <div key={headerLink.path}>
              <LinkRouteDiv href={headerLink.path} >
                <LinkRouteText
                  color={isSelected ? 'yellow' : 'white'}
                  weight={isSelected ? 700 : 400}
                  size={16}
                  $isSelected={isSelected}
                >
                  {headerLink.label}
                </LinkRouteText>
              </LinkRouteDiv>

              {!isLastIHeaderLink && <VerticalLine />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
