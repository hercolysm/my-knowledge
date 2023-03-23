// Create a promise function
function MyPromise(param1) {
  return new Promise(function(myResolve, myReject) {
    setTimeout(function() {
      if (false) {
        myResolve(param1); // when successful
      } else {
        myReject("Ocorreu um erro");  // when error
      }
    }, 3000);
  })
}

// Wait for a promise return 
async function Execute() {
  let name = await MyPromise("Homer Simpson").then(
    function success (result) { // when successful
      console.log(result); 
    },
    function (error) {
      console.log(error); // when error
    }
  );
}
Execute();
