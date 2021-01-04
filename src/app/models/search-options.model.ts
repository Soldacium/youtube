export interface SearchOptions {
    videosAllowed: 'all' | 'vimeo' | 'yt' | 'favourite';
    sort: 'descending' | 'ascending';
    displayType: 'blocks' | 'list';
}
