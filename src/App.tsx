import { AppContainer, CitySection } from "./App.sc";
import { CityList } from "./components/CitySection/CityList";
import { CitySearchForm } from "./components/CitySection/CitySearchForm";
import { WeatherWidget } from "./components/WeatherWidget";

function App() {
  return (
    <AppContainer>
      <WeatherWidget city="Warszawa" />
      <CitySection>
        <CitySearchForm />
        <CityList />
      </CitySection>
    </AppContainer>
  );
}

export default App;
