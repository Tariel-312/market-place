import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ClientContext } from '../contexts/ClientProvider';

export default function ProductsPagination() {
    const {postsPerPage, totalProductsCount, currentPage, setCurrentPage} = React.useContext(ClientContext)
    const pagesCount = Math.ceil(totalProductsCount / postsPerPage)

  return (
    <Stack spacing={2}>
      <Pagination 
      count={pagesCount} 
      page={currentPage}
      onChange={(_, newPage)=> {
          setCurrentPage(newPage)
          window.scrollTo({
              top: 0,
              left:0,
              behavior: 'smooth',
          });
        }}
      />
    </Stack>
  );
}
