import axios from 'axios';

const getData = (url_) => {
    return new Promise((resolve, reject) => {
        axios.get(url_)
        .then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}


export {
    getData
}