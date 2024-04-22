export function generateId(){
    const caracters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let pass = ""
    for(let i = 0; i< 5; i++){
        let randomNumber = Math.round(Math.random() * caracters.length)

        pass += caracters[randomNumber]
    }
    return pass;
}