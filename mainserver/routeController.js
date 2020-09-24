const fs = require('fs')

const routeController = (request, getRoutes, postRoutes) =>{

    console.log('request',request);
    console.log('postRoutes',typeof(postRoutes));
    console.log('postRoutes',(postRoutes));
    console.log('postRoutes shaaaa',getRoutes[(Object.keys(getRoutes))] );

    let abc = postRoutes[(Object.keys(postRoutes))]
    abc();
    // console.log(Object.keys(getRoutes))

    // // console.log('getRoutes',getRoutes.);
    // console.log('postRoutes',postRoutes);



}

module.exports = routeController