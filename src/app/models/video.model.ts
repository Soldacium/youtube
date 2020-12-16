import { VideoTypes } from '@models/video-types.model';

export interface Video{
    id: string;
    favourite: boolean;
    type: VideoTypes;
    modifyDate: string;
    thumbnail: string;
    title: string;
    views: string;
}
