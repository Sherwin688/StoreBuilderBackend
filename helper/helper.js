const getToken = ()=>{
    return process.env.SHOPIFY_ACCESS_TOKEN
}

const getUrl = ()=>{
    return process.env.SHOPIFY_APP_URL
}

module.exports = {getToken}