import { useState, useEffect } from 'react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    // Default to New Delhi, India
    const [location, setLocation] = useState({ lat: 28.6139, lon: 77.2090, name: 'New Delhi' });

    useEffect(() => {
        // Try to get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        name: 'Your Location' // We could reverse geocode, but for now simple
                    });
                },
                (err) => console.log("Location access denied, distinct to Delhi"),
                { timeout: 5000 }
            );
        }
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`
                );
                const data = await res.json();
                setWeather(data.current_weather);
            } catch (error) {
                console.error("Weather fetch failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    if (loading) return <div className="glass-card h-full animate-pulse min-h-[160px]"></div>;

    const getWeatherIcon = (code) => {
        // WMO Weather interpretation codes (http://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
        if (code === 0) return "sunny";
        if (code >= 1 && code <= 3) return "partly_cloudy_day";
        if (code >= 45 && code <= 48) return "foggy";
        if (code >= 51 && code <= 67) return "rainy";
        if (code >= 71 && code <= 77) return "weather_snowy";
        if (code >= 95) return "thunderstorm";
        return "cloud";
    };

    return (
        <div className="glass-card p-6 h-full flex flex-col justify-between text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>

            <div className="flex justify-between items-start z-10">
                <div>
                    <h3 className="font-medium text-neutral-400">{location.name}</h3>
                    <div className="text-5xl font-bold mt-2 tracking-tighter">
                        {weather?.temperature}°
                    </div>
                </div>
                <span className="material-symbols-outlined text-4xl text-yellow-500 drop-shadow-lg">
                    {getWeatherIcon(weather?.weathercode)}
                </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-300 z-10">
                <span className="material-symbols-outlined text-sm">air</span>
                <span>{weather?.windspeed} km/h Wind</span>
            </div>
        </div>
    );
};

export default WeatherWidget;
