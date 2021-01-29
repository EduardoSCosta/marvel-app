import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CharactersPage from './pages/CharactersPage';
import ComicsPage from './pages/ComicsPage';
import CreatorsPage from './pages/CreatorsPage';
import EventsPage from './pages/EventsPage';
import SeriesPage from './pages/SeriesPage';
import StoriesPage from './pages/StoriesPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing}/>
      <Route path="/Characters" exact component={CharactersPage}/>
      <Route path="/Comics" exact component={ComicsPage}/>
      <Route path="/Creators" exact component={CreatorsPage}/>
      <Route path="/Events" exact component={EventsPage}/>
      <Route path="/Series" exact component={SeriesPage}/>
      <Route path="/Stories" exact component={StoriesPage}/>
    </BrowserRouter>
  );
}

export default Routes;