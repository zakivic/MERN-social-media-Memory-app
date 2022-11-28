import { Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useGetPagesQuery } from '../../features/posts/postsSlice';
import { useState } from 'react';

import Page from './Page';


const Posts = () => {
  const [pageCount, setPageCount] = useState(1);
  const numberOfPages = useGetPagesQuery();
  let limit;
  if (numberOfPages.isSuccess) {
    limit = numberOfPages.data.numberOfPages;
  }
 

  const pages = [];
  for (let page = 1; page <= pageCount; page++) {
    pages.push(<Page page={page} key={page} />)
  }

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <InfiniteScroll
        dataLength={pages.length}
        next={() => setPageCount((prev) => prev + 1)}
        hasMore={pages.length < limit}
        loader={<h4>Loading...</h4>}
        endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
        }
      >
        {pages}
      </InfiniteScroll> 
    </Box>
  )
}

export default Posts