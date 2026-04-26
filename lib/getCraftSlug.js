/**
 * Extracts the ID from a given Craft link.
 * @param {string} link - The Craft link.
 * @returns {string} - The extracted ID.
 * @throws Will throw an error if the link format is invalid.
 */
const getCraftSlug = (link) => {
    const patterns = [
      /^https:\/\/www\.craft\.me\/s\/(.+)$/,
      /^https:\/\/www\.craft\.do\/s\/(.+)$/,
      /^https:\/\/.+\.craft\.me\/(.+)$/
    ];
  
    for (const pattern of patterns) {
      const match = link.match(pattern);
      if (match) {
        return match[1];
      }
    }
  
    throw new Error("Invalid link format");
  };
  
  export default getCraftSlug;  
