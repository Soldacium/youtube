import { Video } from '@models/video.model';


export interface State {
    videos: Video[];
    videosMeetingSearchCriteria: Video[];
    searchedVideos: Video[];
}
