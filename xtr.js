const src = (i, j)=>{

const {exec} = require("child_process")
const int = i;
const fin = j;
            //0   1   2  3
console.log('running')
let cache_IP = int + "." + fin;
try{
    const MOD = async (int, fin) => {
    const ping = async (e)=>{
        await exec(`ping ${e} -n 1`, (stderr, stdout) => {
            if(stderr){
                console.log(stderr);
                return "stderr//"
            }
            else {
                console.log('Average ping of '+ e +' is ', stdout.split(":")[5].split('=')[3].trim());
                
            }
        })
    } 

    int = int.split('.')
    fin = fin.split('.')

    int[0] = parseInt(int[0]);
        int[1] = parseInt(int[1]);
            int[2] = parseInt(int[2]);
                int[3] = parseInt(int[3]);

    fin[0] = parseInt(fin[0]);
        fin[1] = parseInt(fin[1]);
            fin[2] = parseInt(fin[2]);
                fin[3] = parseInt(fin[3]);

    for(let ips = 0; ips<cache_IP.split(".").length; ips++){
       if(cache_IP.split('.')[ips]>255){
           return "invalid ips[255]";
       }
    }

    //ips availability in position 2;
    let diffr_host_main = fin[2]-int[2];
    let diffr_host_sub = fin[3]-int[3];
    if(int[0] != fin[0] || int[1] != fin[1]){
        return "too many IP's to scan"
    }
    else if(int[2]>fin[2] || int[3] >> fin[3]){
        if(int[2]>=fin[2]){
            
            return "initial value is higher than final"
        }
    }

    else{

       
        
        let temp_ip = int;
        if(int[2] != fin[2]){
            diffr_host_sub = 255-int[3];
        }
        try{
            for(let main_counter = 0; main_counter <= diffr_host_main; main_counter++){
                temp_ip[3]--;
                for(let sub_counter = 0; sub_counter <= diffr_host_sub; sub_counter++){
                    let temp_sub_counter = temp_ip;
                        temp_sub_counter[3]++;
                    
                        ping(temp_sub_counter.join('.'))
                    
                }
                temp_ip[3] = 0;
                temp_ip[2]++;
                int[3] = 0;
                if(int[2]==fin[2]){
                    diffr_host_sub =  fin[3]-int[3];
                }
                else if(int[2] != fin[2]){
                    diffr_host_sub = 255;
                }
                
            }
        }
        catch(e){
            console.log("err caught", e)
        }
        
            
            
    }
    
    return "success";
}
console.log(MOD(int, fin))
    }
catch(e){
    console.log('main catch(MOD catch)', e)
    }
}
    module.exports = {
        src,
    }
