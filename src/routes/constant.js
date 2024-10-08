export const ROUTE_CONSTANT = {
    COMMON: {
        HOME: '/',
        NEWS: '/news',
        NEWS_DETAILS: '/news-details/:newsId',
        TESTIMONIALS: '/testimonials',
        ADD_TESTIMONIAL: '/add_testimonial',
        FEEDBACKS: '/feedbacks',
        HOT_SONGS: '/hot-songs',
        TOP_CHARTS: '/top-charts',
        ADD_NEWS: '/add-news',
        SONG_LYRICS: '/lyrics/:isrcKey',
        ADD_HOT_SONGS: '/add-songs',
        ADD_HOT_ALBUM: '/add-hot-album',
        ALBUMS_SONGS: '/album/songs/:albumId',
        ARTIST_SONGS: '/artist/albums/:artistid',
        ADD_ARTIST: '/add-artist'
    },
    AUTH: {
        LOGIN: '/login',
        SHOW_PROFILE: '/profile',
        EDIT_PROFILE: '/edit-profile',
        CHANGE_PASSWORD: '/change-password',
        FORGET_PASSWORD: '/forget-password',
        RESET_PASSWORD: '/auth/reset-password/:resetToken',

    }

}