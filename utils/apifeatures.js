class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyboard ? {
            name:{
                $regrex: thid.queryStr.keyword,
                $options: "i",
            }
        }:{}

        this.query = this.query.find({ ...keyword});
        return this;
    }

    filter(){

        const queryCopy = {...this.queryStr};
        //removing some fields for category
        const removedFields = ["keyboard", "page", "limit"];
        removedFields.forEach((key) => delete queryCopy[key])
        
        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr  = queryStr.replace(/\b(gt|gte|lte)\b/g, (key)=>`$${key}`);
        this.query = this.query.find(queryCopy)   
        return this;

    }

    pagination(resultPerpage){

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerpage * (currentPage -1);
        this.query = this.query.limit(resultPerpage).skip(skip);
        return this;

    }
};

module.exports = ApiFeatures