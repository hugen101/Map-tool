export class Init{
    load(){
        if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined){
            console.log('no markers found. creating....');

            var markers = [
                {
                    name: 'Company One',
                    lat: 51.678418,
                    lng: 7.809007,
                    draggable: true
                    },
                    {
                    name: 'Company Two',
                    lat: 51.688418,
                    lng: 7.909007,
                    draggable: true
                    },
                    {
                    name: 'Company Three',
                    lat: 51.698418,
                    lng: 7.609007,
                    draggable: false
                }
            ];

            localStorage.setItem('markers', JSON.stringify(markers));
        } else {
            console.log('Loading Markers');
        }
    }
}