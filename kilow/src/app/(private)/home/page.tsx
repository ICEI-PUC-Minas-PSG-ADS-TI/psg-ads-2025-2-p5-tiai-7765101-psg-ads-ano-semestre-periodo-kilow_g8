import { logoutAction } from '@/actions/auth';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      Home
      <button onClick={logoutAction}>Loggout</button>
    </div>
  );
};

export default HomePage;
