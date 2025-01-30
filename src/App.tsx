import { useCallback, useEffect, useState } from 'react';

const formatLinkTitle = (link: string) => {
  // Extract text between 'net/' and last '/', then format
  const path = link.split('net/')[1].split('/');
  const title = path[0].split('-').join(' ').toUpperCase();
  return title;
};

function App() {
  const [links, setLinks] = useState<string[]>([]);
  const [link, setLink] = useState('');

  const selectRandomIndex = useCallback(() => {
    setLink(links[Math.floor(Math.random() * links.length)]);
  }, [links]);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch('../recipe-links.txt');
      const text = await response.text();
      const linksArray = text.split('\n').filter((link) => link.trim() !== '');
      setLinks(linksArray);
    };

    fetchLinks();
  }, []);

  useEffect(() => {
    if (links.length > 0) selectRandomIndex();
  }, [links, selectRandomIndex]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        marginLeft: '200px',
        flexDirection: 'column',
        maxWidth: '500px',
      }}
    >
      {link ? (
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          style={{ fontSize: '60px' }}
        >
          {formatLinkTitle(link)}
        </a>
      ) : (
        <p>Loading...</p>
      )}
      <a style={{ cursor: 'pointer' }} onClick={selectRandomIndex}>
        ESO NO ME GUSTA.
      </a>
    </div>
  );
}

export default App;
