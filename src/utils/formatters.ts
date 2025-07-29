export const splitIncludedItems = (items: string[] | string): string[] => {
  if (Array.isArray(items)) {
    return items.map(item => item.trim()).filter(item => item.length > 0);
  }
  
  // Split by comma, semicolon, or newline and trim whitespace
  return items
    .split(/[,;\n]/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

export const joinIncludedItems = (items: string[] | string | null): string => {
  if (!items) return '';
  
  const itemArray = Array.isArray(items) ? items : splitIncludedItems(items);
  // Ensure we're using actual newlines, not just \n character
  return itemArray.join('\r\n');
};