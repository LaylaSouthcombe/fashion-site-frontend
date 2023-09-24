const generateQueryWordSplitter = (query) => {
    if(query.includes("-s-")){
        return "-s-"
    } else if(query.includes("-t-")){
        return "-t-"
    } else if(query.includes("-b-")){
        return "-b-"
    }
}

const generateQueryFieldName = (query) => {
    if(query.includes("-s-")){
        return "productSubType"
    } else if(query.includes("-t-")){
        return "productType"
    } else if(query.includes("-b-")){
        return "brand"
    }
}

const addFormattedQueryToProductQuery = (query, productQuery) => {
    let wordSplitter = generateQueryWordSplitter(query)
    let fieldName = generateQueryFieldName(query)
    let queryWord = query.split(wordSplitter)[1].replace(/-/g, ".*")
    productQuery[fieldName] = {$regex: queryWord, $options: "si"}
}

const addFormattedQueryToQueryConstraint = (query, queryConstraint) => {
    let wordSplitter = generateQueryWordSplitter(query)
    let fieldName = generateQueryFieldName(query)
    let queryWord = query.split(wordSplitter)[1].replace(/-/g, ".*")
    queryConstraint["path"] = fieldName
    queryConstraint["value"] = {$regex: queryWord, $options: "si"}
}

module.exports = {addFormattedQueryToProductQuery, addFormattedQueryToQueryConstraint}