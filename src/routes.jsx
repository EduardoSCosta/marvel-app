import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/LandingPage';
import CharactersListPage from './pages/listsPages/CharactersListPage';
import ComicsListPage from './pages/listsPages/ComicsListPage';
import CreatorsListPage from './pages/listsPages/CreatorsListPage';
import EventsListPage from './pages/listsPages/EventsListPage';
import SeriesListPage from './pages/listsPages/SeriesListPage';

import CharacterPage from './pages/itemsPages/CharacterPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing}/>
      <Route path="/characters" exact component={CharactersListPage}/>
      <Route path="/comics" exact component={ComicsListPage}/>
      <Route path="/creators" exact component={CreatorsListPage}/>
      <Route path="/events" exact component={EventsListPage}/>
      <Route path="/series" exact component={SeriesListPage}/>

      <Route path="/character/:characterId" component={CharacterPage}/>
    </BrowserRouter>
  );
}

export default Routes;