import { useRouter } from 'next/router'
import React from 'react'
import Container from '../../components/Container/Container';

const AdminPage = () => {
    const router = useRouter();
    const address = router.query.address;
    // console.log(address);
    
  return (
      <Container maxWidth='lg'>
          <div className=' h-screen'>
            Admin page:  {address}
          </div>
      </Container>
  )
}

export default AdminPage