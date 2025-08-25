interface Precipitation {
  rain: string;
  snow: string;
}

interface Sky {
  code: string;
  name: string;
}

interface Temperature {
  tmax: string;
  tmin: string;
}

export interface Yesterday {
  precipitation: Precipitation;
  sky: Sky;
  temperature: Temperature;
}

export interface Today {
  sky: Sky;
  temperature: Temperature;
}

export interface Tomorrow {
  sky: Sky;
  temperature: Temperature;
}

export interface DayAfterTomorrow {
  sky: Sky;
  temperature: Temperature;
}

interface Grid {
  longitude: string;
  latitude: string;
  city: string;
  county: string;
  village: string;
}

interface Summary {
  grid: Grid;
  timeRelease: string;
  yesterday: Yesterday;
  today: Today;
  tomorrow: Tomorrow;
  dayAfterTomorrow: DayAfterTomorrow;
}

interface Weather {
  summary: Summary[];
}

interface Common {
  alertYn: string;
  stormYn: string;
}

interface Result {
  code: number;
  requestUrl: string;
  message: string;
}

export interface WeatherData {
  result: Result;
  common: Common;
  weather: Weather;
}
