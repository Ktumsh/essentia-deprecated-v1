interface Video {
  id: number;
  title: string;
  link: string;
}

export interface ResourcesVideos {
  section: string;
  videos: Video[];
}
