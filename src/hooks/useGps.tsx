import * as React from 'react';

export const useGps = () => {
    const [position, setPosition] = React.useState<{
        latitude: number,
        longitude: number
    }>({
        latitude: 0, 
        longitude: 0
    });
    const [error, setError] = React.useState(null);

    const onChange = ({ coords }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };

    const onError = (error) => {
        setError(error.message);
    };

    React.useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        let watcher = geo.watchPosition(onChange, onError);
        return () => geo.clearWatch(watcher);
    }, []);

    return { ...position, error };
}