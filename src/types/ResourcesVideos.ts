interface Video {
  id: number;
  title: string;
  link: string;
  description?: string;
}

export interface ResourcesVideos {
  section: string;
  videos: Video[];
}
