


import HotSongCard from '../../../components/Card/HotSongCard';
import CarouselComponent from '../../../components/Carousel/CarouselComponent';
import CommonLayout from '../../../layouts/CommonLayout';
import TopChartCard from '../TopChart/TopChartCard';

function HomePage() {


    return (
        <>
            <CommonLayout>
                <CarouselComponent />
                <HotSongCard />
                <TopChartCard />
            </CommonLayout>
        </>
    );
}

export default HomePage;


