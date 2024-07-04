export {};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }

  namespace YT {
    interface PlayerEvent {
      target: Player;
    }

    interface Player {
      playVideo: () => void;
    }

    class Player {
      constructor(
        id: string,
        options: {
          height: string;
          width: string;
          videoId: string;
          events: {
            onReady: (event: PlayerEvent) => void;
          };
        }
      );
    }
  }
}
