document.getElementById("getBtn").addEventListener("click", function () {
  console.log("clicked");

  const mobile_number = "01797421860";
  const pin = "1234";

  const getMobileNumber = document.getElementById("number").value;
  const getPin = document.getElementById("pin").value;

  if (getMobileNumber === mobile_number && getPin === pin) {
    window.location.href='./main.html';
  } else {
    alert("invalid credentials")
  }
});
