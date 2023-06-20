const BaseUrl = 'https://maharattvto.ir/ws/v3'

export const fetchData = (endPoint , method , body) => new Promise( (resolve , reject) => {
    fetch(`${BaseUrl}/${endPoint}` , {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json', 
            'AUTH-KEY': 'b0f065638c76557306642238bd665904', 
            'DEVICE-UNIQUE-ID':localStorage.getItem('UNID')
        }
    })
    .then(res => res.json())
    .then( res => resolve(res))
    .catch( error => reject(error) )
}
)