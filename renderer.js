// call preload ping function to send 'ping' to main
const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}
  
func()