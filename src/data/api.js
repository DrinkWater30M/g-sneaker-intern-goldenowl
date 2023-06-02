import data from './shoes.json' assert { type: 'json' };

function getAllShoes(){
    return data.shoes;
}

const api = {
    getAllShoes
}

export default api;