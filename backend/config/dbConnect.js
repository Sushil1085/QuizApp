const mongoose = require('mongoose');
const dbConnect =async()=>{
    
    await mongoose.connect(
        "mongodb+srv://sushil1010:Sunil1010@firstcluster.2bsda.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster"
    );
    
}

module.exports = {dbConnect};