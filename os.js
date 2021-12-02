const os=require("os");
console.log("The memory",os.freemem());
console.log("The total memory",os.totalmem());
console.log("The version",os.version());
console.log("The processor",os.cpus());