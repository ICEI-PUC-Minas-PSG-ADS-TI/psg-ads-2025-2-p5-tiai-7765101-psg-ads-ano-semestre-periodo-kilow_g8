'use client';
import BillingList from '@/components/billingList';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import PrivateLayout from '@/components/Layout/privateSection';

const BillingPage = () => {
  const router = useRouter();

  return (
    <PrivateLayout
      pageTitle="Gestão de Contas"
      pageSubtitle="Maneje aqui as suas contas de luz já cadastradas"
    >
      <Button onClick={() => router.push('/billings/create')}>
        + Nova conta
      </Button>
    </PrivateLayout>
  );
};

export default BillingPage;
