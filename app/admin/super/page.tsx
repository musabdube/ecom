// app/admin/super/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuperAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not a super admin
    if (status === 'authenticated' && session?.user?.role !== 'SUPER_ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <div>Super Admin Page Content</div>;
}
