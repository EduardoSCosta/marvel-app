import { BrowserRouter, Route } from 'react-router-dom';
import Search from './pages/Search';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Search}/>
    </BrowserRouter>
  );
}

export default Routes;