/** Return chronological neighbors without letting edits reorder publication history. */
export function getAdjacentPosts(posts, currentPost) {
  const ordered = [...posts].sort(
    (a, b) =>
      new Date(a.data.pubDatetime).getTime() - new Date(b.data.pubDatetime).getTime() ||
      a.id.localeCompare(b.id)
  );
  const index = ordered.findIndex(({ id }) => id === currentPost.id);
  return {
    prevPost: index > 0 ? ordered[index - 1] : null,
    nextPost: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
