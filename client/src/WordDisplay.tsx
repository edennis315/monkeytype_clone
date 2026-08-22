import { useState, useEffect } from 'react';



function WordDisplay() {
  const [words, setWords] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWords() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/randomquote`);
        if (!res.ok) throw new Error('Request failed');
        const data: { quote: string} = await res.json();
        setWords(data.quote);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }
    fetchWords();
  }, []);

  if (isLoading) return <div>Loading words...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{words}</div>;
}

export default WordDisplay;
