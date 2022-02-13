const util = require('util');
const exec = util.promisify(require('child_process').exec);

const sourceTree = async (firstArgument, secondArgument) => {
    let list = [];
    let first_arr = firstArgument.split(".");
    let second_arr = secondArgument.split(".");
    let cof = first_arr;
    let cos = second_arr;

    try{
        if(first_arr.length < 4|| second_arr.length < 4){
            console.log("invalid ip addresses");
        };
    
        let ip1 = [];

        const newPromise = new Promise((resolve, reject) => {
            first_arr.forEach(async (i, low) => {
                if(i>255){
                    resolve("invalid ip format, please enter a valid ip address in initial IP address");
                }
                else{
                    ip1[low] = i;
                }        
            });
        });
        
        newPromise.then((e)=>{
            console.log(e)
        })
        
        let ip2 = [];

        const alsonewPromise = new Promise((resolve, reject) => {
            second_arr.forEach(async (i, low) => {
                if(i>255){
                    resolve("invalid ip format, please enter a valid ip address in final IP address");
                }
                else{
                    ip1[low] = i;
                }        
            });
        });
        
        alsonewPromise.then((e)=>{
            console.log(e)
        })
    

        let not_eligible = new Promise((resolve, reject) => {
    
            ip1.forEach((element, key) => {
                if(ip2[key] - ip1[key] < 0 && key != 3){    
                    resolve("initial ip is higher than final ip range, they will be considered as the opposite ranges in the code")

                }
            });
    
            if(cos[2] - cof[2] >= 3){
                resolve("so many ip's to scan");
            };
    
            if(cof[0] != cos[0]){
                resolve("so many ip's to scan");
            }

            if(cof[1] != cos[1]){
                
                resolve("so many ip's to scan");
            }
    
        });
    
        not_eligible.then(e => {
            console.log(e);
        });

        let temp_ip = cof;
        let diffr_host_sub = cos[3]-cof[3];

            if(cof[2] != cos[2]){
                diffr_host_sub = 255;
            }
            try{
                for(let main_counter = cof[2]; main_counter <= cos[2]; main_counter++){

                    temp_ip[3]--;

                    for(let sub_counter = cof[3]; sub_counter <= diffr_host_sub; sub_counter++){

                        let temp_sub_counter = temp_ip;
                            temp_sub_counter[3]++;
                            list[list.length] = temp_sub_counter.join('.');
                    }

                    temp_ip[3] = 0;
                    temp_ip[2]++;
                    cof[3] = 0;

                    if(cof[2]==cos[2]){
                        diffr_host_sub =  cos[3]-cof[3];
                    }
                    
                    else if(cof[2] != cof[2]){
                        diffr_host_sub = 255;

                    }

                }
            }
            
            catch(e){
                console.log("err caught", e)
            }
            console.log(list)
        for(let loop = 0; loop < list.length; loop++){

            async function lsExample() {
                try {
                  const { stderr, stdout } = await exec(`ping ${list[loop]} -c 1`);

                  if(stderr){
                      console.log("stderr: ", stdout);
                  }

                  console.log(`=====================================================`)
                  console.log(stdout);
                } catch (e) {
                  console.error(e); // should contain code (exit code) and signal (that caused the termination).
                }
              }
              await lsExample()

        }
    }
    catch(e){
        console.log("something went down while scanning ips", e);
    }
    

};

module.exports = sourceTree;
