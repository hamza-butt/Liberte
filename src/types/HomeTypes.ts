export interface WeatherData {
    temperature: number;
    unit: string;
    windspeed: number;
    weathercode: number;
}

export interface WeatherApiResponse {
    status_code: number;
    status: boolean;
    message: string;
    data: WeatherData;
}
