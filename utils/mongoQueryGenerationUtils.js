const generateQueryWordSplitter = (query) => {
    if(query.includes("-s-")){
        return "-s-"
    } else if(query.includes("-t-")){
        return "-t-"
    }
}

const generateQueryFieldName = (query) => {
    if(query.includes("-s-")){
        return "productSubType"
    } else if(query.includes("-t-")){
        return "productType"
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
    queryConstraint["value"] = queryWord.replace(/-/g, " ")
}

module.exports = {addFormattedQueryToProductQuery, addFormattedQueryToQueryConstraint}