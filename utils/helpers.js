export const fetchBooks = async (searchTerm) => {
  const apiUrl = `https://gutendex.com/books/?search=${encodeURIComponent(
    searchTerm
  )}`;

  try {
    const response = await fetch(apiUrl);
    const limit = 20;
    const defaultImage = 'https://via.placeholder.com/150';
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const limitedResults = data.results.slice(0, limit);

      const books = limitedResults.map((item) => ({
        id: item.id,
        title: item.title,
        authors: item.authors || [],
        downloadCount: item.download_count || 0,
        languages: item.languages || [],
        mediaType: item.media_type || '',
        subjects: item.subjects || [],
        formats: item.formats || {},
        image: item.formats?.['image/jpeg'] || defaultImage,
      }));

      return books;
    } else {
      throw new Error('No books found');
    }
  } catch (error) {
    console.error('Error fetching books:', error.message);
    throw error;
  }
};
