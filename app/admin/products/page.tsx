// app/admin/products/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not an admin or super admin
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <div>Admin Products Page Content</div>;
}
