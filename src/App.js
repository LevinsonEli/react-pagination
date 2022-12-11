import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'

function App() {
  
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  function handlePageBtn(pageNumber) {
    let newPageNumber = pageNumber;
    if (pageNumber === 'prev')
      newPageNumber = page === 0 ? data.length - 1 : page - 1;
    else if (pageNumber === 'next')
      newPageNumber = page === data.length - 1 ? 0 : page + 1;
    setPage(newPageNumber);
  }

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='page-btn' onClick={() => handlePageBtn('prev')}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page && 'active-btn'}`}
                  onClick={() => handlePageBtn(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className='page-btn' onClick={() => handlePageBtn('next')}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App
