import { Route } from 'react-router-dom'
import { ROUTE_CONSTANT } from './constant'
import HomePage from '../pages/common/Home/HomePage';
import ProtectedRoute from './protectedRoutes';
import NewsPage from '../pages/common/NewsPage/NewsPage';
import NewsDetails from '../pages/common/NewsPage/NewsDetails';
import Testimonials from '../pages/common/Testimonials/Testimonials';
import Feedback from '../pages/common/Feedback/Feedback';
import HotSongs from '../pages/common/HotSongs/HotSongs';
import TopChartPage from '../pages/common/TopChartPage/TopChartPage';
import AddNews from '../pages/common/NewsPage/AddNews';
import AddTestimonial from '../pages/common/Testimonials/AddTestimonial';
import DisplayLyrics from '../pages/common/Lyrics/DisplayLyrics';
import AddHotSong from '../pages/common/HotSongs/AddHotSong';
import AlbumsSongs from '../pages/common/AlbumsSongs/AlbumsSongs';
import ArtistSongs from '../pages/common/ArtistSongs/ArtistSongs';


const commonRoutes = [
    <Route key="home" path={ROUTE_CONSTANT.COMMON.HOME} element={<ProtectedRoute element={HomePage} />} />,
    <Route key="news" path={ROUTE_CONSTANT.COMMON.NEWS} element={<ProtectedRoute element={NewsPage} />} />,
    <Route key="news-details" path={ROUTE_CONSTANT.COMMON.NEWS_DETAILS} element={<ProtectedRoute element={NewsDetails} />} />,
    <Route key="testimonials" path={ROUTE_CONSTANT.COMMON.TESTIMONIALS} element={<ProtectedRoute element={Testimonials} />} />,
    <Route key="feedbacks" path={ROUTE_CONSTANT.COMMON.FEEDBACKS} element={<ProtectedRoute element={Feedback} />} />,
    <Route key="hot-songs" path={ROUTE_CONSTANT.COMMON.HOT_SONGS} element={<ProtectedRoute element={HotSongs} />} />,
    <Route key="add-hot-songs" path={ROUTE_CONSTANT.COMMON.ADD_HOT_SONGS} element={<ProtectedRoute element={AddHotSong} />} />,
    <Route key="top-charts" path={ROUTE_CONSTANT.COMMON.TOP_CHARTS} element={<ProtectedRoute element={TopChartPage} />} />,
    <Route key="add-news" path={ROUTE_CONSTANT.COMMON.ADD_NEWS} element={<ProtectedRoute element={AddNews} />} />,
    <Route key="add-testimonial" path={ROUTE_CONSTANT.COMMON.ADD_TESTIMONIAL} element={<ProtectedRoute element={AddTestimonial} />} />,
    <Route key="song-lyrics" path={ROUTE_CONSTANT.COMMON.SONG_LYRICS} element={<ProtectedRoute element={DisplayLyrics} />} />,
    <Route key="albums-songs" path={ROUTE_CONSTANT.COMMON.ALBUMS_SONGS} element={<ProtectedRoute element={AlbumsSongs} />} />,
    <Route key="artist-songs" path={ROUTE_CONSTANT.COMMON.ARTIST_SONGS} element={<ProtectedRoute element={ArtistSongs} />} />,

]

export default commonRoutes;