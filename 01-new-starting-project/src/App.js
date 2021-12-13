// URL 내 여러가지 경로를 정의하고, 어떤 컴포넌트가 로드될 것인지 감지
import { Route, Switch } from 'react-router-dom'

// 각 페이지들 또한 import

import AllMeetupsPage from './pages/AllMeetups';
import FavoritesPage from './pages/Favorites';
import NewMeetupPage from './pages/NewMeetup';

import Layout from './components/layout/Layout';

function App() {
  return(
  // div로 감싸는 대신에, Layout을 통해 레이아웃을 잡을 수 있음
  <Layout>
    {/* 경로를 나타내는 path prop 부여 가능 */}
    <Switch>
      <Route path = "/" exact={true}>
        <AllMeetupsPage />
      </Route >
      <Route path = "/favorites">
        <FavoritesPage/>
      </Route>
      <Route path = "/new-meetup">
        <NewMeetupPage/>
      </Route>
    </Switch>
  </Layout>
  );
}

export default App;
