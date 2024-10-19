export async function scrollDawn(itemList) {
  const rect = itemList.getBoundingClientRect();
  const itemHeight = rect.height;
  window.scrollBy({
    top: itemHeight * 2.2,
    behavior: 'smooth',
  });
}
