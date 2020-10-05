const grubs =  [
    {
        id: 0,
        author: {
            id: 1,
            name: 'Christopher Jones'
        },
        creationdate: new Date(),
        message: `It's Taco Tuesday!!`,
        restaurant: {
            name: 'Taco Bell',
            img: 'https://lh3.googleusercontent.com/wWXePJtJwa8slrpch_scAqld5hNDAQKx-KSLDo5uo69yfQv-_k6o5OPPjEQrdRHFHOo=s180-rw'
        },
        status: 'open',
        users_pending: [2,3,4],
        users_requested: 2,
        requestdate: new Date(),
    },
    {
        id: 1,
        author: {
            id: 1,
            name: 'Markus Realim'
        },
        creationdate: new Date(),
        message: `KOBO is 🔥🔥`,
        restaurant: {
            name: 'Ramen Kobo',
            img: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/c5/80/f2/ramen-kobo.jpg'
        },
        status: 'open',
        users_pending: [2],
        users_requested: 4,
        requestdate: new Date(),
    },
    {
        id: 3,
        author: {
            id: 1,
            name: 'Sean Thompson'
        },
        creationdate: new Date(),
        message: `It's just one of those days...`,
        restaurant: {
            name: 'Asian Wok',
            img: 'https://menufyproduction.imgix.net/637006121736922925+114282.png?auto=compress,format&h=1080&w=1920&fit=max'
        },
        status: 'closed',
        users_pending: [],
        users_requested: 0,
        requestdate: new Date(),
    },
    {
        id: 4,
        author: {
            id: 1,
            name: 'Kyle Magdales'
        },
        creationdate: new Date(),
        message: `In the mood for early ice cream`,
        restaurant: {
            name: 'Crumble',
            img: 'https://queencreekmarketplace.com/wp-content/uploads/sites/3/2019/04/Crumbl-Cookies-logo.jpg'
        },
        status: 'closed',
        users_pending: [1,4,7,11],
        users_requested: 2,
        requestdate: new Date(),
    },
]

export default grubs