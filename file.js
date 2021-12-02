const fs=require('fs');
// const [,,name]=process.argv;
// fs.readFile("./msg.txt","utf-8",(err,data)=>{
//     if(err)
//     {
//      console.error(err);   
//     }
//     console.log(`${data} , ${name}`);
// });

// const data=name;

// fs.writeFile("names.txt",data,(err)=>{
// console.log("completed Writing !!");
// });

// fs.appendFile("all-names-txt",data + "\n",(err)=>{
//   console.log("completed appending")

// });


/*fs.readFile("./all-names-txt","utf-8",(err,data)=>{
        if(err)
        {
         console.error(err);   
        }
        console.log(data);
        const replaceData=data.replaceAll("subash","ram");
        console.log(replaceData);
        fs.writeFile("./all-names-txt",replaceData,(err)=>{
console.log("completed Writing !!");
});

    });*/

    
 //const quote="The road to success is always under Construction"

 const[ , ,length,quote]=process.argv;

for(let i=1;i<=length;i++)
{
  fs.writeFile(`./backups/test-${i}.html`,quote,(err)=>{
    console.log("completed Writing !!",i);
    }); 
    fs.writeFileSync(`./backups/test-${i}.html`,quote)
}

// fs.unlink("./temp.txt",function(err){
//   console.error("Removed successfully");
// });

// fs.readdir(".", function(err,files){
//     console.log(files);
// });
