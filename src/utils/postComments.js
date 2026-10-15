// Posts already published when comments launched on October 15, 2026.
// Keep this list fixed: new posts (including existing drafts) get comments.
const postsWithoutComments = new Set([
  "/posts/replacing-power-profiles-with-tlp-to-improve-battery-life",
  "/posts/stream-audio-to-airplay",
  "/posts/automatically-dim-display-on-battery",
  "/posts/colour-the-cat",
  "/posts/customise-automatic-power-profiles",
  "/posts/disable-lock-screen-password-trusted-wifi-network",
  "/posts/diving-into-the-bin",
  "/posts/float-that-window",
  "/posts/hyperland-per-monitor-config",
  "/posts/hyprland-short-long-press-shortcuts",
  "/posts/hyprland-suspend-hibernate-bindings",
  "/posts/hyprland-workspaces-are-special",
  "/posts/keyd-capslock-escape-app-launcher",
  "/posts/my-backup-setup-part-1",
  "/posts/my-backup-setup-part-2-installation-scripts",
  "/posts/my-omarchy-3-4-0-contributions",
  "/posts/oh-merci",
  "/posts/override-omarchy-command",
  "/posts/remap-copilot-key",
  "/posts/stop-deleting-files-by-accident",
  "/posts/stop-spotify-from-hogging-your-cpu-and-memory",
  "/posts/throw-confetti",
]);

/** @param {string} path @param {boolean | undefined} comments */
export function hasPostComments(path, comments) {
  return comments !== false && !postsWithoutComments.has(path.replace(/\/$/, ""));
}
