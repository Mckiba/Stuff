const EVENTS = [
    {
        id: 100,
        name: 'Read Fullrev Fridays',
        price: 350,
        image: require('../assets/events/event1.png'),
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to or a typeface without relying on meaningful content. before the final copy is available text commonly used to or a typeface without relying on meaningful content. before the final copy is available.',
        date: 'Saturday April 30, 2022',
        time: '7.00pm',
        location:'TGI Friday, Kingston 6, Jamaica.'
    },
    {
        id: 101,
        name: 'MoBay Jerk Festival',
        price: 600,
        image: require('../assets/events/event2.png'),
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to or a typeface without relying on meaningful content. before the final copy is available text commonly used to or a typeface without relying on meaningful content. before the final copy is available.',
        date: 'Saturday April 30, 2022',
        time: '7:00pm',
        location:'Catherine Hall, Entertainment Centre Montego Bay, Jamaica'
    },
    {
        id: 102,
        name: '1Love Soca Jamical (Cooler Festival)',
        price: 2,
        image: require('../assets/events/event3.png'),
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to or a typeface without relying on meaningful content. before the final copy is available text commonly used to or a typeface without relying on meaningful content. before the final copy is available.',
        date: 'Sunday May 1, 2022',
        time: '7:00pm',
        location:'Catherine Hall, Entertainment Centre Montego Bay, Jamaica'
    }
];

export function getEvents() {
    return EVENTS;
}

export function getProduct(id) {
    return EVENTS.find((event) => (event.id == id));
}

