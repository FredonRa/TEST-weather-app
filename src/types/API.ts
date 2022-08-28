export type Response = {
    city: {
        coord: {
            lat: number, 
            lon: number
        },
        country: string,
        id: number,
        name: string,
        population: number,
        sunrise: number,
        sunset: number,
        timezone: number
    },
    cnt: number,
    cod: string,
    list: ListItem[]
    message: number
}

export type ListItem = {
    clouds: {
        all: number
    }
    dt: number
    dt_txt: string
    main: {
        feels_like: number
        grnd_level: number,
        humidity: number,
        pressure: number,
        sea_level: number,
        temp: number,
        temp_kf: number,
        temp_max: number,
        temp_min: number,
    },
    pop: 0
    sys: {
        pod: string
    },
    visibility: number
    weather: [
        {
            id: number, 
            main: string, 
            description: string, 
            icon: string
        }
    ]
    wind: {
        speed: number, 
        deg: number, 
        gust: number
    }
}