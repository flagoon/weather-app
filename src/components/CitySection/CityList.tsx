export const CityList = ({
  cities,
  setCityPosition,
}: {
  cities: Array<City>;
  setCityPosition: (position: Position) => void;
}) => (
  <div>
    {cities.map(({ display_name, lon, lat }) => (
      <button onClick={() => setCityPosition({ lon, lat })}>
        {display_name}
      </button>
    ))}
  </div>
);
