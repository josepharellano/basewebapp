import  seedrandom from 'seedrandom';

export const createNoiseMap = () => {      
    let noiseMap:any = [];

    const rng = seedrandom('foobar');
    console.log(rng());
    const red = 0xffffffff;
    const black = 0x000000ff;
    for ( let y = 0 ; y < window.innerHeight; y++){
        for ( let x = 0 ; x < window.innerWidth; x++){
            let rng = seedrandom((y << 16 | x).toString())
            const isTile: boolean = rng()*256 < 32;
            noiseMap.push(isTile ? red: black);    
        }
       
    }
    console.log(noiseMap);
    return noiseMap;
}
