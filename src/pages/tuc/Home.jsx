import HomeSplit from './home/HomeSplit';
import HomeRail from './home/HomeRail';
import HomeBanded from './home/HomeBanded';
import { useTucStyle } from './home/tucStyle';

// REVIEW SCAFFOLD: renders one of three candidate looks (see home/tucStyle.js).
const VARIANTS = { split: HomeSplit, rail: HomeRail, banded: HomeBanded };

const Home = () => {
    const Variant = VARIANTS[useTucStyle()];
    return <Variant />;
};

export default Home;
